import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ItemTaggerServiceModule } from './item-tagger-service.module';
import { ENV_VAR_NAMES } from './tag-request.const';

async function bootstrap() {
  const app = await NestFactory.create(ItemTaggerServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get(ENV_VAR_NAMES.PORT));
}
bootstrap();
