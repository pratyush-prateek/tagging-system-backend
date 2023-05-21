import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ENV_VAR_NAMES } from './user-service.const';
import { UserServiceModule } from './user-service.module';
import { configurationBuilder } from './config/config.builder';

async function bootstrap() {
  await configurationBuilder.buildApplicationConfig();
  const app = await NestFactory.create(UserServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  await app.listen(configService.get(ENV_VAR_NAMES.PORT));
}
bootstrap();
