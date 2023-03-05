import { Logger, NotFoundException } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  Types,
  UpdateQuery,
  SaveOptions,
  Connection,
} from 'mongoose';
import { IBaseRepository } from './interfaces/base.repository.interface';
import { BaseDocument } from '../schemas/base.schema';

export abstract class BaseRepository<IDocument extends BaseDocument>
  implements IBaseRepository<IDocument>
{
  protected abstract readonly logger: Logger;

  constructor(
    protected readonly model: Model<IDocument>,
    private readonly connection: Connection,
  ) {}

  async create(
    document: Omit<IDocument, '_id'>,
    options?: SaveOptions,
  ): Promise<IDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (
      await createdDocument.save(options)
    ).toJSON() as unknown as IDocument;
  }

  async findOne(filterQuery: FilterQuery<IDocument>): Promise<IDocument> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      this.logger.warn('Document not found with filterQuery', filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<IDocument>,
    update: UpdateQuery<IDocument>,
  ) {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

  async upsert(
    filterQuery: FilterQuery<IDocument>,
    document: Partial<IDocument>,
  ) {
    return this.model.findOneAndUpdate(filterQuery, document, {
      lean: true,
      upsert: true,
      new: true,
    });
  }

  async find(filterQuery: FilterQuery<IDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<IDocument>,
  ): Promise<IDocument> {
    return await this.model.findOneAndDelete(filterQuery);
  }

  async startTransaction() {
    const session = await this.connection.startSession();
    session.startTransaction();
    return session;
  }
}
