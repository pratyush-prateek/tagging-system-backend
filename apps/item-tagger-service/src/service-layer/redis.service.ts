import { Injectable, Logger } from '@nestjs/common';
import { TagRequest } from '@app/common';
import { RedisClientWrapper } from '@app/common';

/**
 * This implementation of redis stores keys and list of objects in the cache store.
 */
@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private readonly TAG_PREFIX = 'tag';
  private readonly ITEM_PREFIX = 'item';
  private readonly redisClient: RedisClientWrapper;
  constructor(redisClient: RedisClientWrapper) {
    this.redisClient = redisClient;
    this.redisClient.setOnExpiryCallback(
      async (key: string, values: string[]) => {
        this.logger.log(key);
        this.logger.log(values);
        return Promise.resolve();
      },
    );
  }
  async addObjectToTag(tag: string, object: TagRequest): Promise<void> {
    const data = JSON.stringify({
      type: object.itemType,
      url: object.itemUrl,
    });

    const tagsSetName = `${this.TAG_PREFIX}:${tag}`;
    const itemsSetName = `${this.ITEM_PREFIX}:${object.itemType}:${object.itemUrl}`;

    try {
      await this.redisClient.addObjectToSetAsyncWithTTL(tagsSetName, data);
      await this.redisClient.addObjectToSetAsyncWithTTL(itemsSetName, tag);
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
      await this.redisClient.removeObjectFromSetAsync(tagsSetName, data);
      await this.redisClient.removeObjectFromSetAsync(itemsSetName, tag);
    } catch (ex) {
      throw ex;
    }
  }
}
