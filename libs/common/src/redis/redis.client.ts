import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

/**
 * Wrapper around redis client to implement usual methods
 */
@Injectable()
export class RedisClientWrapper implements OnModuleInit {
  private readonly logger = new Logger(RedisClientWrapper.name);
  private readonly redisClient: any;
  private readonly cacheManager: Cache;
  private onExpiryCallback: (...args: any) => Promise<void>;
  constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.cacheManager = cacheManager;
    this.redisClient = this.cacheManager.store.getClient();
    this.onExpiryCallback = (key: string) => {
      this.logger.log(`Key expired ${key}`);
      return Promise.resolve();
    };
  }

  async onModuleInit() {
    // Setting up a separate channel to listen to TTL expiration events
    this.redisClient.config('SET', 'notify-keyspace-events', 'Ex');
    const expiredChannel = `__keyevent@0__:expired`;
    const expiredChannelSubscriber = this.redisClient.duplicate();
    expiredChannelSubscriber.subscribe(expiredChannel, (err, name) => {
      if (err) throw err;
      else {
        this.logger.log(`Subscribed to channel ${name}`);
      }
    });
    expiredChannelSubscriber.on('message', (channel, key) => {
      this.redisClient.smembers(key, (err, results) => {
        if (err) {
          this.logger.error(`Failed to get members of the set ${key}`);
        } else {
          // TODO: have a retry mechanism of this action
          this.onExpiryCallback(key, results).catch((err) => {
            this.logger.error(
              `Expiration event failed to execute on expiry of key ${key}`,
            );
          });
        }
      });
    });
  }

  public setOnExpiryCallback(
    expirationCallback: (...args: any) => Promise<void>,
  ): void {
    this.onExpiryCallback = expirationCallback;
  }

  public async addObjectToSetAsyncWithTTL(
    setName: string,
    value: string,
    ttl = 20,
  ): Promise<void> {
    // TODO: retry mechanism
    return new Promise((resolve, reject) => {
      this.redisClient
        .multi()
        .sadd(setName, value)
        .expire(setName, ttl)
        .exec((err, results) => {
          if (err) reject(err);
          else resolve(results);
        });
    });
  }

  public async removeObjectFromSetAsync(
    setName: string,
    value: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.redisClient.srem(setName, value, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}
