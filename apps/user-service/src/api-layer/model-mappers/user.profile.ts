import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { UserLogin } from '../models/user-login.dto';
import { UserLogin as ServiceLayerUserLogin } from '../../service-layer/models/user-login.model';
import { UserRequestDto } from '../models/user-request.dto';
import { User as UserResponseDto } from '../models/user-response.dto';
import { User } from '../../service-layer/models/user.schema';
import { UserResponse } from '../../service-layer/models/user-response.model';
import { Types } from 'mongoose';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper) => {
      createMap(mapper, UserLogin, ServiceLayerUserLogin);
      createMap(
        mapper,
        UserRequestDto,
        User,
        forMember((dest) => dest.created, ignore()),
        forMember((dest) => dest.modified, ignore()),
        forMember((dest) => dest.verified, ignore()),
        forMember(
          (dest) => dest._id,
          mapFrom((src) => new Types.ObjectId(src.userId)),
        ),
      );
      createMap(
        mapper,
        User,
        UserResponse,
        forMember(
          (dest) => dest.userId,
          mapFrom((src) => src._id.toString()),
        ),
      );
      createMap(mapper, UserResponse, UserResponseDto);
    };
  }
}
