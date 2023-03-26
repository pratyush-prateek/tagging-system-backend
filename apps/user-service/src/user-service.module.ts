import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DataSourceController } from './api-layer/controllers/data-source.controller';
import { UserController } from './api-layer/controllers/user.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/user-service/.env',
    }),
  ],
  controllers: [UserController, DataSourceController],
  providers: [],
})
export class UserServiceModule {}
