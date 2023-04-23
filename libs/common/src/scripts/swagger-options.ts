import { INestApplication } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { OpenApiNestFactory } from 'nest-openapi-tools';
import { camelCase } from 'lodash';

export function generateOpenApiSpecsAndClient(
  app: INestApplication,
  appName: string,
) {
  const documentBuilder = new DocumentBuilder().setTitle(appName);
  const camelCaseName = camelCase(appName);
  const apiModuleName =
    camelCaseName.charAt(0).toUpperCase() + camelCaseName.slice(1);
  return OpenApiNestFactory.configure(app, documentBuilder, {
    fileGeneratorOptions: {
      enabled: true,
      outputFilePath: `./apps/${appName}/swagger.json`,
    },
    clientGeneratorOptions: {
      enabled: true,
      type: 'typescript-nestjs',
      outputFolderPath: `./libs/common/src/clients/${appName}-client`,
      additionalProperties: [
        `apiModulePrefix=${apiModuleName}`,
        'fileNaming=kebab-case',
        'enumNameSuffix=""',
        'stringEnums=true',
      ].join(','),
      openApiFilePath: `./apps/${appName}/swagger.json`,
    },
  });
}
