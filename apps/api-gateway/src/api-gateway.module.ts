import { Module } from '@nestjs/common';
import {
  Configuration as UserServiceClientConfig,
  ApiModule as UserServiceApiModule,
  ConfigurationParameters as UserServiceClientConfigParams,
} from '@app/common/clients/user-service-client';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import configurationBuilder from './config/config.builder';

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
      const applicationConfig = configurationBuilder.getApplicationConfig();
      const params: UserServiceClientConfigParams = {
        basePath: applicationConfig.userServiceUri,
      };
      return new UserServiceClientConfig(params);
    }),
  ],
})
export class ApiGatewayModule {}
