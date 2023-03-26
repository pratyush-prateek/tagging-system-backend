import { TagRequest } from '@app/common';

export interface ITagRequestService {
  addTagToItem: (tagRequest: TagRequest) => Promise<void>;
  removeTagFromItem: (tagRequest: TagRequest) => Promise<void>;
}

export const ITagRequestService = Symbol('ITagRequestService');
