import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, MappingProfile, createMap, forMember } from '@automapper/core';
import { TagRequestDto } from '../models/tag-request.dto';
import { TagRequest } from '../../service-layer/schemas/tag-request.schema';

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
