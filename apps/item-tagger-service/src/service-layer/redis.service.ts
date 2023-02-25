import { Injectable, Logger } from '@nestjs/common';
import { TagRequest } from '@app/common';
import { RedisClientWrapper } from '@app/common';
import { ENV_VAR_NAMES } from '../tag-request.const';
import { ConfigService } from '@nestjs/config';

/**
 * This implementation of redis stores keys and list of objects in the cache store.
 */
@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private readonly TAG_PREFIX = 'tag';
  private readonly ITEM_PREFIX = 'item';
  private readonly TAGS_CACHE_TTL: number;
  private readonly redisClient: RedisClientWrapper;
  constructor(redisClient: RedisClientWrapper, configService: ConfigService) {
    this.redisClient = redisClient;
    this.TAGS_CACHE_TTL = configService.get(
      ENV_VAR_NAMES.DEFAULT_TAGS_CACHE_KEYS_TTL_SECONDS,
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
      await this.redisClient.addObjectToSetAsyncWithTTL(
        tagsSetName,
        data,
        this.TAGS_CACHE_TTL,
      );
      await this.redisClient.addObjectToSetAsyncWithTTL(
        itemsSetName,
        tag,
        this.TAGS_CACHE_TTL,
      );
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
