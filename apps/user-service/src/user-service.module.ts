import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSourceController } from './api-layer/controllers/data-source.controller';
import { UserController } from './api-layer/controllers/user.controller';
import configFactory from './config/config.builder';
import { DatabaseModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './service-layer/models/user.schema';
import { UserRepository } from './data-access/user.repository';
import { UserService } from './service-layer/user.service';
import { IUserRepository } from './data-access/interfaces/user.repository.interface';
import { IUserService } from './service-layer/interfaces/user.service.interface';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { UserProfile } from './api-layer/model-mappers/user.profile';

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
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  controllers: [UserController, DataSourceController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    {
      provide: IUserService,
      useClass: UserService,
    },
    UserProfile,
  ],
})
export class UserServiceModule {}
