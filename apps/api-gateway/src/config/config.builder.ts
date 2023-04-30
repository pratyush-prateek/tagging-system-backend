import { ApplicationConfigurationBuilder } from '@app/common';
import { ApiGatewayConfig } from './api-gateway.config';
import { plainToInstance } from 'class-transformer';

class ApiGatewayConfigurationBuilder extends ApplicationConfigurationBuilder<ApiGatewayConfig> {
  public convertPlainToClass(configJson: string): void {
    this.applicationConfiguration = plainToInstance(
      ApiGatewayConfig,
      configJson,
    );
  }
}

const configurationBuilder = new ApiGatewayConfigurationBuilder();
export default configurationBuilder;
