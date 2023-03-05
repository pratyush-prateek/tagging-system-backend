import {
  RabbitMQSubscriberCallback,
  RabbitMQSubscriberService,
  RABBITMQ_CLIENT,
  TagsActionMessage,
} from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VAR_NAMES } from '../../item-tag-db-consumer.const';
import { IItemTagUpdateService } from '../service-layer/interfaces/item-tag-update.interface';

@Injectable()
export class ItemTagRemovalHandler {
  private readonly logger = new Logger(ItemTagRemovalHandler.name);
  private readonly rabbitMqSubscriberService: RabbitMQSubscriberService;
  private readonly configService: ConfigService;
  private readonly itemTagUpdateService: IItemTagUpdateService;
  constructor(
    @Inject(RABBITMQ_CLIENT)
    rabbitMqSubscriberService: RabbitMQSubscriberService,
    configService: ConfigService,
    @Inject(IItemTagUpdateService) itemTagUpdateService: IItemTagUpdateService,
  ) {
    this.rabbitMqSubscriberService = rabbitMqSubscriberService;
    this.configService = configService;
    this.itemTagUpdateService = itemTagUpdateService;
  }

  async onModuleInit() {
    const subsriberCallback = new RabbitMQSubscriberCallback<TagsActionMessage>(
      this.onReceiveMessage.bind(this),
    );
    const tagsRemovalQueueName = this.configService.get(
      ENV_VAR_NAMES.TAG_REMOVAL_QUEUE_NAME,
    );
    this.logger.log(`Subscribing to ${tagsRemovalQueueName}`);
    try {
      await this.rabbitMqSubscriberService.subscribeToQueue<TagsActionMessage>(
        tagsRemovalQueueName,
        subsriberCallback,
      );
    } catch (ex) {
      this.logger.error(`Failed to subscribe to ${tagsRemovalQueueName}`);
      this.logger.error(ex);
    }

    this.logger.log(`Successfully subscribed to ${tagsRemovalQueueName}`);
  }

  async onReceiveMessage(message: TagsActionMessage): Promise<void> {
    this.logger.log(
      `Received message for tag removal ${JSON.stringify(message)}`,
    );
    this.logger.log('Starting consumer action - Tag removal');
    try {
      await this.itemTagUpdateService.removeTagFromItemAsync(message.payload);
    } catch (ex) {
      this.logger.error(
        `Failed to perform consumer action - Tag removal ${JSON.stringify(
          message,
        )}`,
      );
      this.logger.log(ex);
    }

    this.logger.log('Consumer action successful - Tag removal');
  }
}
