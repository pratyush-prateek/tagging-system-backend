import { NestFactory } from '@nestjs/core';
import { ItemTagDbUpdateConsumerModule } from './item-tag-db-update-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemTagDbUpdateConsumerModule);
  await app.listen(3000);
}
bootstrap();
