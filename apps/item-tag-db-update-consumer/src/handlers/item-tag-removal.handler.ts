import {
  RabbitMQSubscriberCallback,
  RabbitMQSubscriberService,
  RABBITMQ_CLIENT,
  TagsActionMessage,
} from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VAR_NAMES } from '../../item-tag-db-consumer.const';

@Injectable()
export class ItemTagRemovalHandler {
  private readonly logger = new Logger(ItemTagRemovalHandler.name);
  private readonly rabbitMqSubscriberService: RabbitMQSubscriberService;
  private readonly configService: ConfigService;
  constructor(
    @Inject(RABBITMQ_CLIENT)
    rabbitMqSubscriberService: RabbitMQSubscriberService,
    configService: ConfigService,
  ) {
    this.rabbitMqSubscriberService = rabbitMqSubscriberService;
    this.configService = configService;
  }

  async onModuleInit() {
    const subsriberCallback = new RabbitMQSubscriberCallback<TagsActionMessage>(
      this.onReceiveMessage.bind(this),
    );
    const tagsAdditionQueueName = this.configService.get(
      ENV_VAR_NAMES.TAG_ADDITION_QUEUE_NAME,
    );
    this.logger.log(`Subscribing to ${tagsAdditionQueueName}`);
    try {
      await this.rabbitMqSubscriberService.subscribeToQueue<TagsActionMessage>(
        tagsAdditionQueueName,
        subsriberCallback,
      );
    } catch (ex) {
      this.logger.error(`Failed to subscribe to ${tagsAdditionQueueName}`);
      this.logger.error(ex);
    }
  }

  async onReceiveMessage(message: TagsActionMessage): Promise<void> {
    this.logger.log(message);
  }
}
