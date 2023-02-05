import { BaseDocument } from '@app/common';
import { AutoMap } from '@automapper/classes';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class TagRequest extends BaseDocument {
  @AutoMap()
  @Prop({ name: 'itemUrl' })
  itemUrl: string;

  @AutoMap()
  @Prop({ name: 'itemTag' })
  itemTag: string;

  @AutoMap()
  @Prop({ name: 'itemType' })
  itemType: string;
}

export const TagRequestSchema = SchemaFactory.createForClass(TagRequest);
