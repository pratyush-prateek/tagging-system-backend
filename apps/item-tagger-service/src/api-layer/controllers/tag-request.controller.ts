import { TagRequest } from '@app/common';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Post, Inject } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ITagRequestService } from '../../service-layer/interfaces/ITagRequestService';
import { TAG_REQUEST_ROUTE } from '../../tag-request.const';
import { TagRequestDto } from '../models/tag-request.dto';

@Controller(TAG_REQUEST_ROUTE)
export class TagRequestController {
  private readonly logger: Logger;
  private readonly mapper: Mapper;
  private readonly tagRequestService: ITagRequestService;
  constructor(
    @InjectMapper() mapper: Mapper,
    @Inject(ITagRequestService) tagRequestService: ITagRequestService,
  ) {
    this.logger = new Logger(TagRequestController.name);
    this.mapper = mapper;
    this.tagRequestService = tagRequestService;
  }

  @Post()
  async addTagToItem(@Body() tagRequestDto: TagRequestDto): Promise<string> {
    const serviceObj = this.mapper.map(
      tagRequestDto,
      TagRequestDto,
      TagRequest,
    );
    await this.tagRequestService.addTagToItem(serviceObj);
    return 'Added tag';
  }

  @Post()
  async removeTagFromItem(
    @Body() tagRequestDto: TagRequestDto,
  ): Promise<string> {
    return 'Added';
  }
}
