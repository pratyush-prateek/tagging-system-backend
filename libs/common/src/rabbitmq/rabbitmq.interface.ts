import { ModuleMetadata } from '@nestjs/common';

export interface RabbitMQModuleConfig {
  url: string;
  minChannels?: number;
  maxChannels?: number;
}

export interface RabbitMQModuleOptions extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => RabbitMQModuleConfig | Promise<RabbitMQModuleConfig>;
  inject?: any[];
}

export enum ExchangeType {
  DIRECT = 'direct',
  TOPIC = 'topic',
  FANOUT = 'fanout',
}

export enum ClientType {
  PUBLISHER = 'publisher',
  SUBSCRIBER = 'subsriber',
}
