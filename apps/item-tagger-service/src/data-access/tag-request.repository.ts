import { BaseRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TagRequest } from '../../../../libs/common/src/schemas/tag-request.schema';
import { ITagRequestRepository } from '../../../item-tagger-service/src/data-access/interfaces/ITagRequestRepository';

@Injectable()
export class TagRequestRepository
  extends BaseRepository<TagRequest>
  implements ITagRequestRepository
{
  protected readonly logger = new Logger(TagRequestRepository.name);

  constructor(
    @InjectModel(TagRequest.name) tagRequestModel: Model<TagRequest>,
    @InjectConnection() connection: Connection,
  ) {
    super(tagRequestModel, connection);
  }
}
