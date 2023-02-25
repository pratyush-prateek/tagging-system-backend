import { DynamicModule, Module } from '@nestjs/common';
import { RabbitMQChannelFactory } from './rabbitmq-channel.factory';
import { createRMQClientOptionsAsync } from './rabbitmq-client.provider';
import { RabbitMQModuleOptions } from './rabbitmq.interface';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class RabbitMQModule {
  static forRootAsync(config: RabbitMQModuleOptions): DynamicModule {
    return {
      module: RabbitMQModule,
      providers: [createRMQClientOptionsAsync(config), RabbitMQChannelFactory],
      exports: [RabbitMQService],
    };
  }
}
