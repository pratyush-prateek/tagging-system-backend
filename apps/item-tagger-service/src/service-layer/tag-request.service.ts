import { ITagRequestService } from './interfaces/ITagRequestService';
import { Logger, Injectable } from '@nestjs/common';
import { TagRequest, TagsActionMessage, TagAction } from '@app/common';
import { RedisService } from './redis.service';
import { MessageQueueService } from './message-queue.service';

@Injectable()
export class TagRequestService implements ITagRequestService {
  protected readonly logger = new Logger(TagRequestService.name);
  private readonly redisService: RedisService;
  private readonly messageQueueService: MessageQueueService;
  constructor(
    redisService: RedisService,
    messageQueueService: MessageQueueService,
  ) {
    this.redisService = redisService;
    this.messageQueueService = messageQueueService;
  }

  async addTagToItem(tagRequest: TagRequest): Promise<void> {
    const queueMessage: TagsActionMessage = {
      action: TagAction.ADD,
      itemUrl: tagRequest.itemUrl,
      itemType: tagRequest.itemType,
      itemTag: tagRequest.itemTag,
    };
    try {
      // Update the cache
      await this.redisService.addObjectToTag(tagRequest.itemTag, tagRequest);
      // Enqueue update request to tag adder queue, which will picked up by DB operations consumer
      await this.messageQueueService.pushToTagAdderQueue(queueMessage);
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  async removeTagFromItem(tagRequest: TagRequest): Promise<void> {
    const queueMessage: TagsActionMessage = {
      action: TagAction.REMOVE,
      itemUrl: tagRequest.itemUrl,
      itemType: tagRequest.itemType,
      itemTag: tagRequest.itemTag,
    };
    try {
      // Update the cache
      await this.redisService.removeObjectFromTag(
        tagRequest.itemTag,
        tagRequest,
      );
      // Enqueue update request to tag adder queue, which will picked up by DB operations consumer
      await this.messageQueueService.pushToTagRemovalQueue(queueMessage);
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }
}
