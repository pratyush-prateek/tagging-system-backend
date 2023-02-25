import { RABBITMQ_MODULE_OPTIONS } from './rabbitmq.const';
import { RabbitMQModuleOptions } from './rabbitmq.interface';

export const createRMQClientOptionsAsync = (
  options: RabbitMQModuleOptions,
) => ({
  provide: RABBITMQ_MODULE_OPTIONS,
  useFactory: options.useFactory,
  inject: options.inject,
});
