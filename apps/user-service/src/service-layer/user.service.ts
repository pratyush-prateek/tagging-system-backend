import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { IUserService } from './interfaces/user.service.interface';
import { User } from './models/user.schema';
import { UserResponse } from './models/user-response.model';
import { PaginatedResponse } from '@app/common';
import { IUserRepository } from '../data-access/interfaces/user.repository.interface';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

export class UserService implements IUserService {
  protected readonly logger: Logger;
  private readonly userRepository: IUserRepository;
  private readonly mapper: Mapper;
  constructor(
    @Inject(IUserRepository) userRepository: IUserRepository,
    @InjectMapper() mapper: Mapper,
  ) {
    this.logger = new Logger(UserService.name);
    this.userRepository = userRepository;
    this.mapper = mapper;
  }

  public async createOrUpdateUserAsync(
    userRequest: User,
  ): Promise<UserResponse> {
    let existingUser: User;
    try {
      existingUser = await this.userRepository.findOne({
        userId: userRequest._id,
      });
    } catch (ex) {
      if (ex instanceof NotFoundException) {
        const newUser = await this.userRepository.create({
          firstName: userRequest.firstName,
          lastName: userRequest.lastName,
          emailId: userRequest.emailId,
          password: userRequest.password,
          created: new Date(),
          modified: new Date(),
          verified: false,
        });
        return this.mapper.map(newUser, User, UserResponse);
      } else {
        this.logger.error(ex);
        throw ex;
      }
    }

    try {
      const updatedUser = await this.userRepository.findOneAndUpdate(
        { _id: userRequest._id },
        {
          firstName: userRequest.firstName,
          lastName: userRequest.lastName,
          emailId: userRequest.emailId,
          password: userRequest.password,
          modified: new Date(),
          verified: existingUser.emailId !== userRequest.emailId,
        },
      );

      return this.mapper.map(updatedUser, User, UserResponse);
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  public async updateUserAsync(
    userRequest: User,
    userId: string,
  ): Promise<UserResponse> {
    try {
      const existingUser = await this.userRepository.findOne({
        _id: userId,
      });
      const updatedUser = await this.userRepository.findOneAndUpdate(
        { _id: userRequest._id },
        {
          firstName: userRequest.firstName,
          lastName: userRequest.lastName,
          emailId: userRequest.emailId,
          password: userRequest.password,
          modified: new Date(),
          verified: existingUser.emailId !== userRequest.emailId,
        },
      );
      return this.mapper.map(updatedUser, User, UserResponse);
    } catch (ex) {
      this.logger.log(ex);
      throw ex;
    }
  }

  public async getAllUsersAsync(): Promise<PaginatedResponse<UserResponse>> {
    return null;
  }

  public async getUserAsync(userId: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOne({ _id: userId });
      return this.mapper.map(user, User, UserResponse);
    } catch (ex) {
      this.logger.log(ex);
      throw ex;
    }
  }

  public async deleteUserAsync(userId: string): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOneAndDelete({ _id: userId });
      return this.mapper.map(user, User, UserResponse);
    } catch (ex) {
      this.logger.log(ex);
      throw ex;
    }
  }
}
