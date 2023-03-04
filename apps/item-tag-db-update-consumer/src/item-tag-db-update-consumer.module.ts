import { ClientType, RabbitMQModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ENV_VAR_NAMES } from '../item-tag-db-consumer.const';
import { ItemTagAdditionHanlder } from './handlers/item-tag-addition.handler';
import { ItemTagRemovalHandler } from './handlers/item-tag-removal.handler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
        TAG_REMOVAL_QUEUE_NAME: Joi.string().required(),
        TAG_ADDITION_QUEUE_NAME: Joi.string().required(),
      }),
    }),
    RabbitMQModule.forRootAsync(
      {
        useFactory: async (configService: ConfigService) => {
          return {
            url: configService.get(ENV_VAR_NAMES.RABBITMQ_URI),
            minChannels: 1,
            maxChannels: 5,
          };
        },
        inject: [ConfigService],
      },
      ClientType.SUBSCRIBER,
    ),
  ],
  controllers: [],
  providers: [ItemTagAdditionHanlder, ItemTagRemovalHandler],
})
export class ItemTagDbUpdateConsumerModule {}
