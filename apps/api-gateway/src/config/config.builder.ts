import { ApplicationConfigurationBuilder } from '@app/common';
import { ApiGatewayConfig } from './api-gateway.config';
import { plainToInstance } from 'class-transformer';
import * as Joi from 'joi';

class ApiGatewayConfigurationBuilder extends ApplicationConfigurationBuilder<ApiGatewayConfig> {
  public convertPlainToClass(configJson: string): void {
    this.applicationConfiguration = plainToInstance(
      ApiGatewayConfig,
      configJson,
    );
  }

  public getConfigValidationSchema(): Joi.ObjectSchema<ApiGatewayConfig> {
    return Joi.object({
      port: Joi.number().integer().positive().required(),
      userServiceUri: Joi.string().uri().required(),
    });
  }
}

export const configurationBuilder = new ApiGatewayConfigurationBuilder();
export default () => {
  return configurationBuilder.getApplicationConfig();
};
