import { Inject, Injectable } from '@nestjs/common/decorators';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common/interfaces';
import { Logger } from '@nestjs/common/services';
import { Channel } from 'amqplib';
import { RABBITMQ_MODULE_OPTIONS } from './rabbitmq.const';
import { ExchangeType, RabbitMQModuleConfig } from './rabbitmq.interface';
import { createPool, Pool, Options } from 'generic-pool';
import { RabbitMQChannelFactory } from './rabbitmq-channel.factory';

@Injectable()
export class RabbitMQPublisherService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RabbitMQPublisherService.name);
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
    this.logger.log('Starting RMQ publisher');
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

  public async createExchange(
    exchangeName: string,
    type: ExchangeType,
    durable?: boolean,
  ): Promise<void> {
    const channel = await this.getChannel();
    try {
      await channel.assertExchange(exchangeName, type.toString(), { durable });
      this.logger.log(`Exchange ${exchangeName} creation successfull`);
    } catch (ex) {
      this.logger.error(`Exchange ${exchangeName} creation failed`);
      this.logger.error(ex);
    } finally {
      await this.releaseChannel(channel);
    }
  }

  public async createQueueAndBindToExchange(
    queueName: string,
    exchangeName: string,
    routingKey: string,
    durable?: boolean,
  ) {
    const channel = await this.getChannel();
    try {
      await channel.assertQueue(queueName, { durable });
      await channel.bindQueue(queueName, exchangeName, routingKey);
    } catch (ex) {
      this.logger.error(
        `Queue ${queueName} creation and binding to ${exchangeName} with pattern ${routingKey} failed`,
      );
      this.logger.error(ex);
    } finally {
      await this.releaseChannel(channel);
    }
  }

  public async publishMessage(
    exchangeName: string,
    routingKey: string,
    pattern: string,
    message: any,
  ): Promise<void> {
    const channel = await this.getChannel();
    try {
      const payload = {
        pattern: pattern,
        data: message,
      };
      // Add a retry mechanism
      await channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(payload)),
      );
    } catch (ex) {
      this.logger.error(ex);
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
