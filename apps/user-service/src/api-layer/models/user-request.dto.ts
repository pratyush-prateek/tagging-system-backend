import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  firstName: string;

  @AutoMap()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  @ApiProperty()
  lastName: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  emailId: string;

  @AutoMap()
  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty()
  password: string;
}
