import {
  Body,
  Controller,
  Logger,
  Patch,
  Param,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import { API_TAGS, USERS_ROUTE } from '../../user-service.const';
import { UserRequestDto } from '../models/user-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../models/user-response.dto';

@ApiTags(API_TAGS.USER)
@Controller(USERS_ROUTE)
export class UserController {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(UserController.name);
  }

  @Patch(':userId')
  async createOrUpdateUserAsync(
    @Body() userRequest: UserRequestDto,
    @Param('userId') userId: string,
  ): Promise<User> {
    this.logger.log(JSON.stringify(userRequest));
    return null;
  }

  @Post(':userId')
  async updateUserAsync(
    @Param('userId') userId: string,
    @Body() userRequst: UserRequestDto,
  ): Promise<User> {
    this.logger.log(userId);
    this.logger.log(JSON.stringify(userRequst));
    return null;
  }

  @Get()
  async getAllUsersAsync(): Promise<void> {
    // This route is accessible by admin only
  }

  @Get(':userId')
  async getUserAsync(@Param('userId') userId: string): Promise<User> {
    // This route is accessible by admin only
    return null;
  }

  @Delete('userId')
  async deleteUserAsync(@Param('userId') userId: string): Promise<void> {
    // TBD
  }
}
