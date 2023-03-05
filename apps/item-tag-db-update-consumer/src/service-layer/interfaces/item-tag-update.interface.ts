import { TagRequest } from '@app/common';

export interface IItemTagUpdateService {
  addTagToItemAsync: (tagRequest: TagRequest) => Promise<void>;
  removeTagFromItemAsync: (tagRequest: TagRequest) => Promise<void>;
}

export const IItemTagUpdateService = Symbol('IItemTagUpdateService');
