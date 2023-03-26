import {
  ExchangeType,
  RabbitMQPublisherService,
  TagsActionMessage,
} from '@app/common';
import { RABBITMQ_CLIENT } from '@app/common/rabbitmq/rabbitmq.const';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VAR_NAMES } from '../tag-request.const';

@Injectable()
export class MessageQueueService implements OnModuleInit {
  private readonly logger = new Logger(MessageQueueService.name);
  private readonly rabbitMqService: RabbitMQPublisherService;
  private readonly EXCHANGE_NAME: string;
  private readonly TAG_ADDITION_QUEUE_NAME: string;
  private readonly TAG_REMOVAL_QUEUE_NAME: string;
  private readonly TAG_ADDITION_QUEUE_ROUTING_KEY: string;
  private readonly TAG_REMOVAL_QUEUE_ROUTING_KEY: string;
  constructor(
    @Inject(RABBITMQ_CLIENT) rabbitMqService: RabbitMQPublisherService,
    configService: ConfigService,
  ) {
    this.rabbitMqService = rabbitMqService;
    this.EXCHANGE_NAME = configService.get(
      ENV_VAR_NAMES.DB_UPDATE_EXCHANGE_NAME,
    );
    this.TAG_ADDITION_QUEUE_NAME = configService.get(
      ENV_VAR_NAMES.TAG_ADDITION_QUEUE_NAME,
    );
    this.TAG_REMOVAL_QUEUE_NAME = configService.get(
      ENV_VAR_NAMES.TAG_REMOVAL_QUEUE_NAME,
    );
    this.TAG_ADDITION_QUEUE_ROUTING_KEY = configService.get(
      ENV_VAR_NAMES.TAG_ADDITION_QUEUE_ROUTING_KEY,
    );
    this.TAG_REMOVAL_QUEUE_ROUTING_KEY = configService.get(
      ENV_VAR_NAMES.TAG_REMOVAL_QUEUE_ROUTING_KEY,
    );
  }

  async onModuleInit() {
    try {
      await this.rabbitMqService.createExchange(
        this.EXCHANGE_NAME,
        ExchangeType.DIRECT,
        true,
      );
      await this.rabbitMqService.createQueueAndBindToExchange(
        this.TAG_ADDITION_QUEUE_NAME,
        this.EXCHANGE_NAME,
        this.TAG_ADDITION_QUEUE_ROUTING_KEY,
        true,
      );
      await this.rabbitMqService.createQueueAndBindToExchange(
        this.TAG_REMOVAL_QUEUE_NAME,
        this.EXCHANGE_NAME,
        this.TAG_REMOVAL_QUEUE_ROUTING_KEY,
        true,
      );
    } catch (ex) {
      this.logger.error(ex);
    }
  }

  public async pushToTagAdderQueue(message: TagsActionMessage): Promise<void> {
    try {
      await this.rabbitMqService.publishMessage(
        this.EXCHANGE_NAME,
        this.TAG_ADDITION_QUEUE_ROUTING_KEY,
        message,
      );
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }

  public async pushToTagRemovalQueue(
    message: TagsActionMessage,
  ): Promise<void> {
    try {
      await this.rabbitMqService.publishMessage(
        this.EXCHANGE_NAME,
        this.TAG_REMOVAL_QUEUE_ROUTING_KEY,
        message,
      );
    } catch (ex) {
      this.logger.error(ex);
      throw ex;
    }
  }
}
