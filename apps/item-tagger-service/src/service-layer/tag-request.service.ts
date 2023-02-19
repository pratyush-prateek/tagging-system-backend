import { ITagRequestService } from './interfaces/ITagRequestService';
import { Logger, Injectable } from '@nestjs/common';
import { TagRequest } from '@app/common';
import { RedisService } from './redis.service';

@Injectable()
export class TagRequestService implements ITagRequestService {
  protected readonly logger = new Logger(TagRequestService.name);
  private readonly redisService: RedisService;
  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }
  async addTagToItem(tagRequest: TagRequest): Promise<void> {
    await this.redisService.addObjectToTag(tagRequest.itemTag, tagRequest);
  }

  async removeTagFromItem(tagRequest: TagRequest): Promise<void> {
    await this.redisService.removeObjectFromTag(tagRequest.itemTag, tagRequest);
  }
}
