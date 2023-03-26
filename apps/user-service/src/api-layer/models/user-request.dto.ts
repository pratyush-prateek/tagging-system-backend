import { AutoMap } from '@automapper/classes';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserRequestDto {
  @AutoMap()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @AutoMap()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  emailId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}
