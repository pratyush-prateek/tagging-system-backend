import { AutoMap } from '@automapper/classes';

export class UserLogin {
  @AutoMap()
  emailId: string;

  @AutoMap()
  password: string;
}
