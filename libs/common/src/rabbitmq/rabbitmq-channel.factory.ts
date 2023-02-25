import { Inject, Injectable, Logger } from '@nestjs/common';
import { Channel, connect } from 'amqplib';
import { Factory } from 'generic-pool';
import { RABBITMQ_MODULE_OPTIONS } from './rabbitmq.const';
import { RabbitMQModuleConfig } from './rabbitmq.interface';

@Injectable()
export class RabbitMQChannelFactory implements Factory<Channel> {
  private readonly logger = new Logger(RabbitMQChannelFactory.name);
  private readonly rabbitMqConfig: RabbitMQModuleConfig;
  constructor(
    @Inject(RABBITMQ_MODULE_OPTIONS) rabbitMqConfig: RabbitMQModuleConfig,
  ) {
    this.rabbitMqConfig = rabbitMqConfig;
  }

  async create(): Promise<Channel> {
    try {
      this.logger.log('Attempting to create channels');
      const rmqConnection = await connect(this.rabbitMqConfig.url);
      const channel = await rmqConnection.createChannel();
      return channel;
    } catch (ex) {
      this.logger.error('Creation of channel failed');
      this.logger.error(ex);
    }
  }

  public async destroy(client: Channel): Promise<void> {
    try {
      this.logger.log(`Attempting to close channel`);
      await client.close();
    } catch (ex) {
      this.logger.error('Closing of channel failed');
      this.logger.error(ex);
    }
  }
}
