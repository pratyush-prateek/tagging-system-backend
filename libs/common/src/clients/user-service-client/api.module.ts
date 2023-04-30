import { DynamicModule, Module, Global } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Configuration } from './configuration';

import { DataSourceService } from './api/data-source.service';
import { UserService } from './api/user.service';

@Global()
@Module({
  imports: [HttpModule],
  exports: [DataSourceService, UserService],
  providers: [DataSourceService, UserService],
})
export class ApiModule {
  public static forRoot(
    configurationFactory: () => Configuration,
  ): DynamicModule {
    return {
      module: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(httpService: HttpService) {}
}
