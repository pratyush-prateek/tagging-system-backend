import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common/interfaces';
import { Channel, ConsumeMessage } from 'amqplib';
import { createPool, Options, Pool } from 'generic-pool';
import { RabbitMQChannelFactory } from './rabbitmq-channel.factory';
import { RABBITMQ_MODULE_OPTIONS } from './rabbitmq.const';
import { RabbitMQModuleConfig } from './rabbitmq.interface';
import { RabbitMQSubscriberCallback } from './rabbitmq.subscriber-callback';

@Injectable()
export class RabbitMQSubscriberService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(RabbitMQSubscriberService.name);
  private channelPool: Pool<Channel>;
  private readonly rabbitMqConfig: RabbitMQModuleConfig;
  private readonly rabbitMqChannelFactory: RabbitMQChannelFactory;
  constructor(
    @Inject(RABBITMQ_MODULE_OPTIONS) rabbitMqConfig: RabbitMQModuleConfig,
    rabbitMqChannelFactory: RabbitMQChannelFactory,
  ) {
    this.rabbitMqConfig = rabbitMqConfig;
    this.rabbitMqChannelFactory = rabbitMqChannelFactory;
  }

  async onModuleInit() {
    this.logger.log('Starting RMQ subscriber');
    this.logger.log('Creating RMQ connection pool');
    const channelOptions: Options = {
      min: this.rabbitMqConfig.minChannels ?? 1,
      max: this.rabbitMqConfig.maxChannels ?? 3,
    };
    this.channelPool = createPool(this.rabbitMqChannelFactory, channelOptions);
  }

  async onModuleDestroy() {
    // attempt to close the connections and channels
    try {
      await this.channelPool.drain();
      await this.channelPool.clear();
    } catch (ex) {
      this.logger.error(ex);
      this.logger.error('Error closing RMQ channels');
    }
  }

  // subscribes to queue which contains message of type T
  async subscribeToQueue<T>(
    queueName: string,
    rmqCallback: RabbitMQSubscriberCallback<T>,
  ) {
    const channel = await this.getChannel();
    try {
      await channel.consume(queueName, async (message: ConsumeMessage) => {
        channel.ack(message);
        await rmqCallback.onReceiveMessage(message.content.toString());
      });
    } catch (ex) {
      this.logger.log(ex);
      throw ex;
    } finally {
      await this.releaseChannel(channel);
    }
  }

  private async getChannel(): Promise<Channel> {
    return await this.channelPool.acquire();
  }

  private async releaseChannel(channel: Channel): Promise<void> {
    await this.channelPool.release(channel);
  }
}
