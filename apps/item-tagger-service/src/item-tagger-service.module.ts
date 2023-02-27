import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  ClientType,
  DatabaseModule,
  RabbitMQModule,
  RedisModule,
} from '@app/common';
import { TagRequest, TagRequestSchema } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagRequestController } from './api-layer/controllers/tag-request.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TagRequestProfile } from './api-layer/model-mappers/tag-request.profile';
import { TagRequestService } from './service-layer/tag-request.service';
import { ITagRequestService } from './service-layer/interfaces/ITagRequestService';
import { RedisService } from './service-layer/redis.service';
import { MessageQueueService } from './service-layer/message-queue.service';
import { ENV_VAR_NAMES } from './tag-request.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        REDIS_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
        DB_UPDATE_EXCHANGE_NAME: Joi.string().required(),
        TAG_ADDITION_QUEUE_NAME: Joi.string().required(),
        TAG_REMOVAL_QUEUE_NAME: Joi.string().required(),
        TAG_ADDITION_QUEUE_ROUTING_KEY: Joi.string().required(),
        TAG_REMOVAL_QUEUE_ROUTING_KEY: Joi.string().required(),
        DEFAULT_TAGS_CACHE_KEYS_TTL_SECONDS: Joi.number().required(),
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
    RabbitMQModule.forRootAsync(
      {
        useFactory: async (configService: ConfigService) => {
          return {
            url: configService.get(ENV_VAR_NAMES.RABBITMQ_URI),
            minChannels: 1,
            maxChannels: 3,
          };
        },
        inject: [ConfigService],
      },
      ClientType.SUBSCRIBER,
    ),
  ],
  controllers: [TagRequestController],
  providers: [
    TagRequestProfile,
    {
      provide: ITagRequestService,
      useClass: TagRequestService,
    },
    RedisService,
    MessageQueueService,
  ],
})
export class ItemTaggerServiceModule {}
