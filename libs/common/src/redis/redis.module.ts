import { CacheModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientWrapper } from './redis.client';

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get<string>('REDIS_URI'),
        max: 10000,
      }),
    }),
  ],
  providers: [RedisClientWrapper],
  exports: [RedisClientWrapper],
})
export class RedisModule {}
