import { NestFactory } from '@nestjs/core';
import { UserServiceModule } from './user-service.module';
import { generateOpenApiSpecsAndClient } from '../../../libs/common/src';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function clientGen() {
  const appName = process.argv[2];
  const generateClient = process.argv[3];

  if (generateClient !== 'true') {
    console.log('Skipping client generation');
    return;
  }

  try {
    // Deleting old client
    console.log('Deleting old client files ...');
    await execAsync(`rimraf ./libs/common/src/clients/${appName}-client`);

    // Generate latest client
    console.log('Generating latest client ...');
    const app = await NestFactory.create(UserServiceModule);
    await generateOpenApiSpecsAndClient(app, appName);

    // Lint the client files
    console.log('Linting the client files ...');
    await execAsync(
      `eslint "./libs/common/src/clients/${appName}-client/**/*.ts" --fix`,
    );

    // Remove unnecessary files
    console.log('Removing unnecessary files ...');
    await execAsync(
      `rimraf ./libs/common/src/clients/${appName}-client/.openapi-generator && rimraf ./libs/common/src/clients/${appName}-client/.gitignore && rimraf ./libs/common/src/clients/${appName}-client/.openapi-generator-ignore && rimraf ./libs/common/src/clients/${appName}-client/git_push.sh`,
    );
  } catch (e) {
    console.log('Failed to generate client');
    console.log(e);
  }
}

clientGen();
