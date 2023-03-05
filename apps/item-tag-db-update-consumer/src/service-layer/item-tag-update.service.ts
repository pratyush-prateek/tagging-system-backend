import { ITagRequestRepository, TagRequest } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { IItemTagUpdateService } from './interfaces/item-tag-update.interface';

@Injectable()
export class ItemTagUpdateService implements IItemTagUpdateService {
  private readonly logger = new Logger(ItemTagUpdateService.name);
  private readonly itemTagRequestRepository: ITagRequestRepository;
  constructor(
    @Inject(ITagRequestRepository)
    itemTagRequestRepository: ITagRequestRepository,
  ) {
    this.itemTagRequestRepository = itemTagRequestRepository;
  }
  async addTagToItemAsync(tagRequest: TagRequest): Promise<void> {
    // add new item to the DB
    try {
      await this.itemTagRequestRepository.create(tagRequest);
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }
  async removeTagFromItemAsync(tagRequest: TagRequest): Promise<void> {
    try {
      await this.itemTagRequestRepository.findOneAndDelete(tagRequest);
    } catch (ex) {
      this.logger.log(ex);
      throw ex;
    }
  }
}
