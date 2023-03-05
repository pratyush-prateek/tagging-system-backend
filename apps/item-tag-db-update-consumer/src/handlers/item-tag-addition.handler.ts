import { TagsActionMessage } from '@app/common';
import { RabbitMQSubscriberService } from '@app/common';
import { RABBITMQ_CLIENT } from '@app/common';
import { RabbitMQSubscriberCallback } from '@app/common';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VAR_NAMES } from '../../item-tag-db-consumer.const';
import { IItemTagUpdateService } from '../service-layer/interfaces/item-tag-update.interface';

@Injectable()
export class ItemTagAdditionHanlder implements OnModuleInit {
  private readonly logger = new Logger(ItemTagAdditionHanlder.name);
  private readonly rabbitMqSubscriberService: RabbitMQSubscriberService;
  private readonly configService: ConfigService;
  private readonly itemTagUpdateService: IItemTagUpdateService;
  constructor(
    @Inject(RABBITMQ_CLIENT)
    rabbitMqSubscriberService: RabbitMQSubscriberService,
    @Inject(IItemTagUpdateService) itemTagUpdateService: IItemTagUpdateService,
    configService: ConfigService,
  ) {
    this.rabbitMqSubscriberService = rabbitMqSubscriberService;
    this.configService = configService;
    this.itemTagUpdateService = itemTagUpdateService;
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

    this.logger.log(`Successfully subscribed to ${tagsAdditionQueueName}`);
  }

  async onReceiveMessage(message: TagsActionMessage): Promise<void> {
    this.logger.log(
      `Received message for tag addition ${JSON.stringify(message)}`,
    );
    this.logger.log('Starting consumer action - Tag addition');
    try {
      await this.itemTagUpdateService.addTagToItemAsync(message.payload);
    } catch (ex) {
      this.logger.error(
        `Failed to perform consumer action - Tag addition ${JSON.stringify(
          message,
        )}`,
      );
      this.logger.log(ex);
    }
    this.logger.log('Consumer action successful - Tag addition');
  }
}
