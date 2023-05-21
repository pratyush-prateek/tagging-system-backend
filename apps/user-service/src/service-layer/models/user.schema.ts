import { BaseDocument } from '@app/common';
import { AutoMap } from '@automapper/classes';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class UserSchema extends BaseDocument {
  @AutoMap()
  @Prop({ name: 'firstName' })
  firstName: string;

  @AutoMap()
  @Prop({ name: 'lastName' })
  lastName: string;

  @AutoMap()
  @Prop({ name: 'emailId' })
  emailId: string;

  @AutoMap()
  @Prop({ name: 'password' })
  password: string;
}
