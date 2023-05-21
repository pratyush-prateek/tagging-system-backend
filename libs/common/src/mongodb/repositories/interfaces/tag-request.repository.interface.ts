import { TagRequest } from '../../schemas/tag-request.schema';
import { IBaseRepository } from './base.repository.interface';

export interface ITagRequestRepository extends IBaseRepository<TagRequest> {}
export const ITagRequestRepository = Symbol('ITagRequestRepository');
