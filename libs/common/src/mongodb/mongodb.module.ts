import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ITagRequestRepository, TagRequestRepository } from './repositories';
import { TagRequest, TagRequestSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    // Common schemas and repositories can be initialised
    MongooseModule.forFeature([
      {
        name: TagRequest.name,
        schema: TagRequestSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: ITagRequestRepository,
      useClass: TagRequestRepository,
    },
  ],
  exports: [
    {
      provide: ITagRequestRepository,
      useClass: TagRequestRepository,
    },
  ],
})
export class DatabaseModule {}
