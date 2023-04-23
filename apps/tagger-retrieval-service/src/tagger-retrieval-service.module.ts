import { Module } from '@nestjs/common';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientType, RabbitMQModule } from '@app/common';
import { TagRequestController } from './api-layer/controllers/tag-request.controller';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { TagRequestProfile } from './api-layer/model-mappers/tag-request.profile';
import { TagRequestService } from './service-layer/tag-request.service';
import { ITagRequestService } from './service-layer/interfaces/ITagRequestService';
import { MessageQueueService } from './service-layer/message-queue.service';
import { ENV_VAR_NAMES } from './tag-request.const';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
        DB_UPDATE_EXCHANGE_NAME: Joi.string().required(),
        TAG_ADDITION_QUEUE_NAME: Joi.string().required(),
        TAG_REMOVAL_QUEUE_NAME: Joi.string().required(),
        TAG_ADDITION_QUEUE_ROUTING_KEY: Joi.string().required(),
        TAG_REMOVAL_QUEUE_ROUTING_KEY: Joi.string().required(),
      }),
      envFilePath: './apps/tagger-retrieval-service/.env',
      ignoreEnvFile: process.env.NODE_ENV !== 'dev',
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
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
      ClientType.PUBLISHER,
    ),
  ],
  controllers: [TagRequestController],
  providers: [
    TagRequestProfile,
    {
      provide: ITagRequestService,
      useClass: TagRequestService,
    },
    MessageQueueService,
  ],
})
export class TaggerRetrievalService {}
