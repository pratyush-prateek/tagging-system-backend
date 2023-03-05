import { ClientType, DatabaseModule, RabbitMQModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ENV_VAR_NAMES } from '../item-tag-db-consumer.const';
import { ItemTagAdditionHanlder } from './handlers/item-tag-addition.handler';
import { ItemTagRemovalHandler } from './handlers/item-tag-removal.handler';
import { IItemTagUpdateService } from './service-layer/interfaces/item-tag-update.interface';
import { ItemTagUpdateService } from './service-layer/item-tag-update.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        RABBITMQ_URI: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        TAG_REMOVAL_QUEUE_NAME: Joi.string().required(),
        TAG_ADDITION_QUEUE_NAME: Joi.string().required(),
      }),
      envFilePath: './apps/item-tag-db-update-consumer/.env',
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
    DatabaseModule,
  ],
  controllers: [],
  providers: [
    ItemTagAdditionHanlder,
    ItemTagRemovalHandler,
    {
      provide: IItemTagUpdateService,
      useClass: ItemTagUpdateService,
    },
  ],
})
export class ItemTagDbUpdateConsumerModule {}
