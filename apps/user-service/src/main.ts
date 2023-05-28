import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ENV_VAR_NAMES } from './user-service.const';
import { UserServiceModule } from './user-service.module';
import { configurationBuilder } from './config/config.builder';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ENV_CONSTANTS, writeFileAsync } from '@app/common';

async function bootstrap() {
  await configurationBuilder.buildApplicationConfig();
  const appName = process.env[ENV_CONSTANTS.DEV_ENV_APP];
  const env = process.env[ENV_CONSTANTS.NODE_ENV];
  const app = await NestFactory.create(UserServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder().setTitle(appName).build();
  const swaggerDoc = SwaggerModule.createDocument(app, config);

  if (env === 'dev') {
    // Setup swagger & generate swagger doc if running in dev environment
    const swaggerFileLocation = `${process.cwd()}/apps/${appName}/swagger.json`;
    await writeFileAsync(swaggerFileLocation, JSON.stringify(swaggerDoc), {
      encoding: 'utf-8',
    });
  }

  SwaggerModule.setup('api', app, swaggerDoc);
  await app.listen(configService.get(ENV_VAR_NAMES.PORT));
}
bootstrap();
