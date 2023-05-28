import { ENV_CONSTANTS } from '../constants';
import { readFileAsync } from '../scripts';
import * as Joi from 'joi';

export abstract class ApplicationConfigurationBuilder<T extends object> {
  protected applicationConfiguration: T;
  public async buildApplicationConfig(): Promise<void> {
    const env = process.env.NODE_ENV;

    // In prod environments, the configfile will be mounted from kubernetes volumes
    // Hence, path will be as needed
    try {
      const jsonData = await this.getJsonData(env);
      this.convertPlainToClass(jsonData);
      await this.getConfigValidationSchema().validateAsync(
        this.applicationConfiguration,
        {
          abortEarly: true,
        },
      );
    } catch (error) {
      throw error;
    }
  }
  public getApplicationConfig(): T {
    return this.applicationConfiguration;
  }

  public async getJsonData(env): Promise<any> {
    const filePaths =
      env === 'dev'
        ? [
            `./apps/${
              process.env[ENV_CONSTANTS.DEV_ENV_APP]
            }/src/config/config.dev.json`,
          ]
        : ['/config/configmaps/config.json', '/config/secrets/secrets.json'];

    const jsonData = await Promise.all(
      filePaths.map(
        async (path) =>
          await readFileAsync(path, {
            encoding: 'utf-8',
          }),
      ),
    );
    return jsonData.reduce((merged, obj) => {
      return { ...merged, ...JSON.parse(obj) };
    }, {});
  }

  public abstract convertPlainToClass(configJson: string): void;
  public abstract getConfigValidationSchema(): Joi.AnySchema<T>;
}

export class BaseApplicationConfig {
  port: number;
}
