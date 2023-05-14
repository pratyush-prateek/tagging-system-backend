import { ENV_CONSTANTS } from '../constants';
import { readFileAsync } from '../scripts';

export abstract class ApplicationConfigurationBuilder<T extends object> {
  protected applicationConfiguration: T;
  public async buildApplicationConfig(): Promise<void> {
    const env = process.env.NODE_ENV;

    // In prod environments, the configfile will be mounted from kubernetes volumes
    // Hence, path will be as needed
    try {
      const filePath =
        env === 'dev'
          ? `./apps/${
              process.env[ENV_CONSTANTS.DEV_ENV_APP]
            }/src/config/config.dev.json`
          : '/config/configmaps/config.json';
      const jsonData = await readFileAsync(filePath, {
        encoding: 'utf8',
      });
      this.convertPlainToClass(jsonData);
    } catch (error) {
      throw error;
    }
  }
  public getApplicationConfig(): T {
    return this.applicationConfiguration;
  }

  public abstract convertPlainToClass(configJson: string): void;
}
