import { AutoMap } from '@automapper/classes';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLogin {
  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @AutoMap()
  @IsNotEmpty()
  password: string;
}
