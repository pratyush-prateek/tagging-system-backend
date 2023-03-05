import { TagRequest } from '../mongodb';

export enum TagAction {
  ADD = 'Add',
  REMOVE = 'Remove',
}

export interface TagsActionMessage {
  action: TagAction;
  payload: TagRequest;
}
