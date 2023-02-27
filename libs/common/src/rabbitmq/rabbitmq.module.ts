import { DynamicModule, Module } from '@nestjs/common';
import { RabbitMQChannelFactory } from './rabbitmq-channel.factory';
import { createRMQClientOptionsAsync } from './rabbitmq-client.provider';
import { RabbitMQModuleOptions, ClientType } from './rabbitmq.interface';
import { RabbitMQPublisherService } from './rabbitmq-publisher.service';
import { RABBITMQ_CLIENT } from './rabbitmq.const';
import { RabbitMQSubscriberService } from './rabbitmq-subscriber.service';

@Module({})
export class RabbitMQModule {
  static forRootAsync(
    config: RabbitMQModuleOptions,
    clientType: ClientType,
  ): DynamicModule {
    return {
      module: RabbitMQModule,
      providers: [
        createRMQClientOptionsAsync(config),
        RabbitMQChannelFactory,
        {
          provide: RABBITMQ_CLIENT,
          useClass:
            clientType === ClientType.PUBLISHER
              ? RabbitMQPublisherService
              : RabbitMQSubscriberService,
        },
      ],
      exports: [RABBITMQ_CLIENT],
    };
  }
}
