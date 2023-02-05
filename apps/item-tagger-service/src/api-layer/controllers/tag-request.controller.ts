import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { TagRequest } from '../../service-layer/schemas/tag-request.schema';
import { TAG_REQUEST_ROUTE } from '../../tag-request.const';
import { TagRequestDto } from '../models/tag-request.dto';

@Controller(TAG_REQUEST_ROUTE)
export class TagRequestController {
  private readonly logger: Logger;
  private readonly mapper: Mapper;
  constructor(@InjectMapper() mapper: Mapper) {
    this.logger = new Logger(TagRequestController.name);
    this.mapper = mapper;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async addTagToItem(@Body() tagRequest: TagRequestDto): Promise<string> {
    return 'Added tag';
  }

  @Get()
  async testGet(): Promise<string> {
    return 'Added';
  }
}
