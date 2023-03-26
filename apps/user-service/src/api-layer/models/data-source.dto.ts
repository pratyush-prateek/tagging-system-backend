import { SameLengthAs } from '@app/common';
import { AutoMap } from '@automapper/classes';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class DataSource {
  private static queryParametersPropName = 'queryParameters';
  private static refreshTokenQueryParametersPropName =
    'refreshTokenQueryParameters';

  @AutoMap()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(25)
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @IsUrl()
  host: string;

  @AutoMap()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  resourcePath: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  queryParameters: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @SameLengthAs(DataSource.queryParametersPropName)
  queryValues: string[];

  @AutoMap()
  @IsNotEmpty()
  accessToken: string;

  @AutoMap()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  refreshTokenResourcePath: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  refreshTokenQueryParameters: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @SameLengthAs(DataSource.refreshTokenQueryParametersPropName)
  refreshTokenQueryValues: string[];
}
