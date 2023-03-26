import { ITagRequestService } from './interfaces/ITagRequestService';
import { Logger, Injectable } from '@nestjs/common';
import { TagRequest, TagsActionMessage, TagAction } from '@app/common';
import { MessageQueueService } from './message-queue.service';

@Injectable()
export class TagRequestService implements ITagRequestService {
  protected readonly logger = new Logger(TagRequestService.name);
  private readonly messageQueueService: MessageQueueService;
  constructor(messageQueueService: MessageQueueService) {
    this.messageQueueService = messageQueueService;
  }

  // Write around cache, write requests go asynchronously to DB, read requests are served from cache
  async addTagToItem(tagRequest: TagRequest): Promise<void> {
    const queueMessage: TagsActionMessage = {
      action: TagAction.ADD,
      payload: tagRequest,
    };
    try {
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
      payload: tagRequest,
    };
    try {
      // Enqueue update request to tag adder queue, which will picked up by DB operations consumer
      await this.messageQueueService.pushToTagRemovalQueue(queueMessage);
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }
}
