import { NestFactory } from '@nestjs/core';
import { ItemRetrievalServiceModule } from './item-retrieval-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemRetrievalServiceModule);
  await app.listen(3000);
}
bootstrap();
