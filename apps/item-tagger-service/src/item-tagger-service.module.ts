import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/common';
import {
  TagRequest,
  TagRequestSchema,
} from './service-layer/schemas/tag-request.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TagRequestController } from './api-layer/controllers/tag-request.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TagRequestProfile } from './api-layer/model-mappers/tag-request.profile';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: TagRequest.name,
        schema: TagRequestSchema,
      },
    ]),
  ],
  controllers: [TagRequestController],
  providers: [TagRequestProfile],
})
export class ItemTaggerServiceModule {}
