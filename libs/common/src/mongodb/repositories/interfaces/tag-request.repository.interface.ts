import { TagRequest } from '../../schemas/tag-request.schema';
import { IBaseRepository } from './base.repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITagRequestRepository extends IBaseRepository<TagRequest> {}
export const ITagRequestRepository = Symbol('ITagRequestRepository');
