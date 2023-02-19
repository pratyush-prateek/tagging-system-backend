import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule, RedisModule } from '@app/common';
import { TagRequest, TagRequestSchema } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagRequestController } from './api-layer/controllers/tag-request.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TagRequestProfile } from './api-layer/model-mappers/tag-request.profile';
import { TagRequestService } from './service-layer/tag-request.service';
import { ITagRequestService } from './service-layer/interfaces/ITagRequestService';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        REDIS_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/item-tagger-service/.env',
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    RedisModule,
    MongooseModule.forFeature([
      {
        name: TagRequest.name,
        schema: TagRequestSchema,
      },
    ]),
  ],
  controllers: [TagRequestController],
  providers: [
    TagRequestProfile,
    {
      provide: ITagRequestService,
      useClass: TagRequestService,
    },
  ],
})
export class ItemTaggerServiceModule {}
