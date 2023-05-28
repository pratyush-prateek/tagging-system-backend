import { UserResponse } from '../models/user-response.model';
import { User } from '../models/user.schema';
import { PaginatedResponse } from '@app/common';

export interface IUserService {
  createOrUpdateUserAsync: (userRequest: User) => Promise<UserResponse>;
  updateUserAsync: (userRequest: User, userId: string) => Promise<UserResponse>;
  getAllUsersAsync: () => Promise<PaginatedResponse<UserResponse>>;
  getUserAsync: (userId: string) => Promise<UserResponse>;
  deleteUserAsync: (userId: string) => Promise<UserResponse>;
}

export const IUserService = Symbol('IUserService');
