import { BaseApplicationConfig } from '@app/common';

/**
 * Configuration for Api gateway.
 * This is built at startup time.
 * TODO - see if some properties are common across all application configs and separate them to a base class.
 */
export class ApiGatewayConfig extends BaseApplicationConfig {
  userServiceUri: string;
}
