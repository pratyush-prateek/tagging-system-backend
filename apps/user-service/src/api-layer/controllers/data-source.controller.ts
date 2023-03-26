import {
  Controller,
  Logger,
  Patch,
  Post,
  Get,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DATA_SOURCES_ROUTE } from '../../user-service.const';
import { DataSource } from '../models/data-source.dto';

@Controller(DATA_SOURCES_ROUTE)
export class DataSourceController {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger(DataSourceController.name);
  }

  @Patch(':dataSourceId')
  async createOrUpdateDataSourceUnderUser(
    @Body() dataSource: DataSource,
    @Param('userId') userId: string,
    @Param('dataSourceId') dataSourceId: string,
  ): Promise<void> {
    this.logger.log(JSON.stringify(dataSource));
    this.logger.log(userId);
    this.logger.log(dataSourceId);
  }

  @Post(':dataSourceId')
  async updateDataSourceUnderUserAsync(
    @Body() dataSource: DataSource,
    @Param('userId') userId: string,
    @Param('dataSourceId') dataSourceId: string,
  ): Promise<void> {
    // TBD
  }

  @Get()
  async getDataSourcesUnderUserAsync(
    @Param('userId') userId: string,
  ): Promise<void> {
    // TBD
  }

  @Get(':dataSourceId')
  async getDataSourceUnderUserAsync(
    @Param('userId') userId: string,
    @Param('dataSourceId') dataSourceId: string,
  ): Promise<void> {
    // TBD
  }

  @Delete(':dataSourceId')
  async deleteDataSourceUnderUserAsync(
    @Param('userId') userId: string,
    @Param('dataSourceId') dataSourceId: string,
  ): Promise<void> {
    // TBD
  }
}
