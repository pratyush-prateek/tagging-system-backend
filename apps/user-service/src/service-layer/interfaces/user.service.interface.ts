import { UserResponse } from '../models/user-response.model';
import { UserSchema } from '../models/user.schema';
import { PaginatedResponse } from '@app/common';

export interface IUserService {
  createOrUpdateUserAsync: (userRequest: UserSchema) => Promise<UserResponse>;
  updateUserAsync: (userRequest: UserSchema) => Promise<UserResponse>;
  getAllUsersAsync: () => Promise<PaginatedResponse<UserResponse>>;
  getUserAsync: (userId: string) => Promise<UserResponse>;
  deleteUserAsync: (userId: string) => Promise<UserResponse>;
}

export const IUserService = Symbol('IUserService');
