import { Module } from '@nestjs/common';
import {
  Configuration as UserServiceClientConfig,
  ApiModule as UserServiceApiModule,
  ConfigurationParameters as UserServiceClientConfigParams,
} from '@app/common/clients/user-service-client';
import { ConfigModule } from '@nestjs/config';
import { configurationBuilder } from './config/config.builder';
import configFactory from './config/config.builder';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configFactory],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    UserServiceApiModule.forRoot((): UserServiceClientConfig => {
      const applicationConfig = configurationBuilder.getApplicationConfig();
      const params: UserServiceClientConfigParams = {
        // basePath: applicationConfig.userServiceUri,
      };
      return new UserServiceClientConfig(params);
    }),
  ],
})
export class ApiGatewayModule {}
