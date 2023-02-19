import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { TagRequestDto } from '../models/tag-request.dto';
import { TagRequest } from '@app/common';

@Injectable()
export class TagRequestProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, TagRequestDto, TagRequest);
      createMap(mapper, TagRequest, TagRequestDto);
    };
  }
}
