import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @AutoMap()
  @ApiProperty()
  userId: string;

  @AutoMap()
  @ApiProperty()
  firstName: string;

  @AutoMap()
  @ApiProperty()
  lastName: string;

  @AutoMap()
  @ApiProperty()
  emailId: string;

  @AutoMap()
  @ApiProperty()
  created: Date;

  @AutoMap()
  @ApiProperty()
  modified: Date;

  @AutoMap()
  @ApiProperty()
  verified: boolean;
}
