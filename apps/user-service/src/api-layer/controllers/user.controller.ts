import {
  Body,
  Controller,
  Logger,
  Patch,
  Param,
  Post,
  Get,
  Delete,
  Inject,
} from '@nestjs/common';
import { API_TAGS, USERS_ROUTE } from '../../user-service.const';
import { UserRequestDto } from '../models/user-request.dto';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../models/user-response.dto';
import { User as UserModel } from '../../service-layer/models/user.schema';
import { Mapper } from '@automapper/core';
import { IUserService } from '../../service-layer/interfaces/user.service.interface';
import { InjectMapper } from '@automapper/nestjs';

@ApiTags(API_TAGS.USER)
@Controller(USERS_ROUTE)
export class UserController {
  private readonly logger: Logger;
  private readonly mapper: Mapper;
  private readonly userService: IUserService;
  constructor(
    @InjectMapper() mapper: Mapper,
    @Inject(IUserService) userService: IUserService,
  ) {
    this.logger = new Logger(UserController.name);
    this.mapper = mapper;
    this.userService = userService;
  }

  @Patch()
  @ApiOkResponse({ type: User })
  async createOrUpdateUserAsync(
    @Body() userRequest: UserRequestDto,
  ): Promise<User> {
    return await this.userService.createOrUpdateUserAsync(
      this.mapper.map(userRequest, UserRequestDto, UserModel),
    );
  }

  @Post(':userId')
  @ApiOkResponse({ type: User })
  async updateUserAsync(
    @Param('userId') userId: string,
    @Body() userRequst: UserRequestDto,
  ): Promise<User> {
    return await this.userService.updateUserAsync(
      this.mapper.map(userRequst, UserRequestDto, UserModel),
      userId,
    );
  }

  @Get()
  async getAllUsersAsync(): Promise<void> {
    return;
  }

  @Get(':userId')
  @ApiOkResponse({ type: User })
  async getUserAsync(@Param('userId') userId: string): Promise<User> {
    return await this.userService.getUserAsync(userId);
  }

  @Delete(':userId')
  @ApiNoContentResponse()
  async deleteUserAsync(@Param('userId') userId: string): Promise<void> {
    await this.userService.deleteUserAsync(userId);
  }
}
