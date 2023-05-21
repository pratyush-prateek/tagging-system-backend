import { AutoMap } from '@automapper/classes';

export class UserResponse {
  @AutoMap()
  id: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  emailId: string;

  @AutoMap()
  created: Date;

  @AutoMap()
  modified: Date;

  @AutoMap()
  verified: Date;
}
