import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { generateOpenApiSpecsAndClient } from '../../../libs/common/src';

async function clientGen() {
  const app = await NestFactory.create(UserServiceModule);
  const appName = process.argv[2];
  await generateOpenApiSpecsAndClient(app, appName);
}

clientGen();
