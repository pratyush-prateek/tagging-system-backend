import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceController } from './api-layer/controllers/data-source.controller';
import { UserController } from './api-layer/controllers/user.controller';
import configFactory from './config/config.builder';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './service-layer/models/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configFactory],
      isGlobal: true,
      ignoreEnvFile: true,
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController, DataSourceController],
  providers: [],
})
export class UserServiceModule {}
