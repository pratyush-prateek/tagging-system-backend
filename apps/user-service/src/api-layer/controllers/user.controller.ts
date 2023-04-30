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
  ): Promise<void> {
    this.logger.log(JSON.stringify(userRequest));
  }

  @Post(':userId')
  async updateUserAsync(
    @Param('userId') userId: string,
    @Body() userRequst: UserRequestDto,
  ): Promise<void> {
    this.logger.log(userId);
    this.logger.log(JSON.stringify(userRequst));
  }

  @Get()
  async getAllUsersAsync(): Promise<void> {
    // This route is accessible by admin only
  }

  @Get(':userId')
  async getUserAsync(@Param('userId') userId: string): Promise<void> {
    // This route is accessible by admin only
  }

  @Delete('userId')
  async deleteUserAsync(@Param('userId') userId: string): Promise<void> {
    // TBD
  }
}
