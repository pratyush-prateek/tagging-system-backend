import { NestFactory } from '@nestjs/core';
import { ItemTaggerServiceModule } from './item-tagger-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ItemTaggerServiceModule);
  await app.listen(3000);
}
bootstrap();
