import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { ItemType } from './item-type.enum';

export class TagRequestDto {
  @AutoMap()
  @IsNotEmpty()
  itemUrl: string;

  @AutoMap()
  @IsNotEmpty()
  itemTag: string;

  @AutoMap()
  @IsNotEmpty()
  @IsEnum(ItemType)
  itemType: string;
}
