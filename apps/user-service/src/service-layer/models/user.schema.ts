import { BaseDocument } from '@app/common';
import { AutoMap } from '@automapper/classes';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class User extends BaseDocument {
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

  @AutoMap()
  @Prop({ name: 'created' })
  created: Date;

  @AutoMap()
  @Prop({ name: 'modified' })
  modified: Date;

  @AutoMap()
  @Prop({ name: 'verified' })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
