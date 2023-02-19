import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { TagRequest } from '../schemas';

/**
 * This implementation of redis stores keys and list of objects in the cache store.
 */
@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private readonly TAG_PREFIX = 'tag';
  private readonly ITEM_PREFIX = 'item';
  private readonly redisClient: any;
  constructor(@Inject(CACHE_MANAGER) cacheManager: Cache) {
    this.redisClient = cacheManager.store.getClient();
  }
  async addObjectToTag(tag: string, object: TagRequest): Promise<void> {
    const data = JSON.stringify({
      type: object.itemType,
      url: object.itemUrl,
    });

    const tagsSetName = `${this.TAG_PREFIX}:${tag}`;
    const itemsSetName = `${this.ITEM_PREFIX}:${object.itemType}:${object.itemUrl}`;

    try {
      await this.addObjectToRedisSetAsync(tagsSetName, data);
      await this.addObjectToRedisSetAsync(itemsSetName, tag);
    } catch (ex) {
      throw ex;
    }
  }

  async removeObjectFromTag(tag: string, object: TagRequest): Promise<void> {
    const data = JSON.stringify({
      type: object.itemType,
      url: object.itemUrl,
    });

    const tagsSetName = `${this.TAG_PREFIX}:${tag}`;
    const itemsSetName = `${this.ITEM_PREFIX}:${object.itemType}:${object.itemUrl}`;

    try {
      await this.removeObjectFromRedisSetAsync(tagsSetName, data);
      await this.removeObjectFromRedisSetAsync(itemsSetName, tag);
    } catch (ex) {
      throw ex;
    }
  }

  private async addObjectToRedisSetAsync(
    setName: string,
    value: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.redisClient.sadd(setName, value, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  private async removeObjectFromRedisSetAsync(
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
