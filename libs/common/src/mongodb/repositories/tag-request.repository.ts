import { BaseRepository } from './base.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { TagRequest } from '../schemas';
import { ITagRequestRepository } from './interfaces/tag-request.repository.interface';

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
