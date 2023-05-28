import { ApplicationConfigurationBuilder } from '@app/common';
import { UserServiceConfig } from './user-service.config';
import { plainToInstance } from 'class-transformer';
import * as Joi from 'joi';

class UserServiceConfigurationBuilder extends ApplicationConfigurationBuilder<UserServiceConfig> {
  public convertPlainToClass(configJson: string): void {
    this.applicationConfiguration = plainToInstance(
      UserServiceConfig,
      configJson,
    );
  }

  public getConfigValidationSchema(): Joi.AnySchema<UserServiceConfig> {
    return Joi.object({
      port: Joi.number().integer().positive().required(),
      dbConnectionUri: Joi.string().uri().required(),
    });
  }
}

export const configurationBuilder = new UserServiceConfigurationBuilder();
export default () => {
  return configurationBuilder.getApplicationConfig();
};
