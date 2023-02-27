import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

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
      envFilePath: './apps/item-tag-db-update-consumer/.env',
    }),
  ],
  controllers: [],
  providers: [],
})
export class ItemTagDbUpdateConsumerModule {}
