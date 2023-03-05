import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ENV_VAR_NAMES } from '../item-tag-db-consumer.const';
import { ItemTagDbUpdateConsumerModule } from './item-tag-db-update-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemTagDbUpdateConsumerModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get(ENV_VAR_NAMES.PORT));
}
bootstrap();
