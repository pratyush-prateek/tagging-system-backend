import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ENV_CONSTANTS } from '../constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(ENV_CONSTANTS.DEFAULT_DB_URI_ENV_VAR),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
