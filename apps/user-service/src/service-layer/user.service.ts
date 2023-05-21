import { Logger } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { User } from './models/user.schema';
import { UserResponse } from './models/user-response.model';
import { PaginatedResponse } from '@app/common';

export class UserService implements IUserService {
  protected readonly logger: Logger;
  constructor() {
    this.logger = new Logger(UserService.name);
  }

  public async createOrUpdateUserAsync(
    userRequest: User,
  ): Promise<UserResponse> {
    return null;
  }

  public async updateUserAsync(userRequest: User): Promise<UserResponse> {
    return null;
  }

  public async getAllUsersAsync(): Promise<PaginatedResponse<UserResponse>> {
    return null;
  }

  public async getUserAsync(userId: string): Promise<UserResponse> {
    return null;
  }

  public async deleteUserAsync(userId: string): Promise<UserResponse> {
    return null;
  }
}
