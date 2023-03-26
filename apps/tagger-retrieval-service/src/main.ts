import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { TaggerRetrievalService } from './tagger-retrieval-service.module';
import { ENV_VAR_NAMES } from './tag-request.const';

async function bootstrap() {
  const app = await NestFactory.create(TaggerRetrievalService);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get(ENV_VAR_NAMES.PORT));
}
bootstrap();
