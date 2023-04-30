import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Equals,
} from 'class-validator';
import { STRINGS } from '../../user-service.const';

export class UserRequestDto {
  private static passwordPropertyName = 'password';
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

  @AutoMap()
  @IsNotEmpty()
  @Equals(UserRequestDto.passwordPropertyName, {
    message: STRINGS.PASSWORDS_DO_NOT_MATCH,
  })
  @ApiProperty()
  confirmPassword: string;
}
