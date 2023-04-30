import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserLogin {
  @AutoMap()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  emailId: string;

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty()
  password: string;
}
