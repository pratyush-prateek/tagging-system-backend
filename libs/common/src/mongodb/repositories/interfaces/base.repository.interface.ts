import { SaveOptions, FilterQuery, UpdateQuery, ClientSession } from 'mongoose';
import { BaseDocument } from '../../schemas/base.schema';

export interface IBaseRepository<IDocument extends BaseDocument> {
  create: (
    document: Omit<IDocument, '_id'>,
    options?: SaveOptions,
  ) => Promise<IDocument>;
  findOne: (filterQuery: FilterQuery<IDocument>) => Promise<IDocument>;
  findOneAndUpdate: (
    filterQuery: FilterQuery<IDocument>,
    updateQuery: UpdateQuery<IDocument>,
  ) => Promise<IDocument>;
  upsert: (
    filterQuery: FilterQuery<IDocument>,
    document: Partial<IDocument>,
  ) => Promise<IDocument>;
  startTransaction: () => Promise<ClientSession>;
  findOneAndDelete: (filterQuery: FilterQuery<IDocument>) => Promise<IDocument>;
}
