import { Module } from '@nestjs/common';
import {
  Configuration as UserServiceClientConfig,
  ApiModule as UserServiceApiModule,
  ConfigurationParameters as UserServiceClientConfigParams,
} from '@app/common/clients/user-service-client';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
      envFilePath: './apps/api-gateway/.env',
      ignoreEnvFile: process.env.NODE_ENV !== 'dev',
    }),
    UserServiceApiModule.forRoot((): UserServiceClientConfig => {
      const params: UserServiceClientConfigParams = {};
      return new UserServiceClientConfig(params);
    }),
  ],
})
export class ApiGatewayModule {}
