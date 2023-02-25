export enum TagAction {
  ADD = 'Add',
  REMOVE = 'Remove',
}

export interface TagsActionMessage {
  action: TagAction;
  itemUrl: string;
  itemType: string;
  itemTag: string;
}
