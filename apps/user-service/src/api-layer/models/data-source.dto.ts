import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'Data source name',
  })
  name: string;

  @AutoMap()
  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({
    description: 'Data source URL host',
  })
  host: string;

  @AutoMap()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ApiProperty({
    description: 'Path array to the resource',
  })
  resourcePath: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ApiProperty({
    description: 'Query parameters array',
  })
  queryParameters: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ApiProperty({
    description: 'Values for the query parameters',
  })
  queryValues: string[];

  @AutoMap()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Access token for the API',
  })
  accessToken: string;

  @AutoMap()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ApiProperty({
    description: 'Resource path for access token refresh',
  })
  refreshTokenResourcePath: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ApiProperty({
    description: 'Query parameters for refresh token API',
  })
  refreshTokenQueryParameters: string[];

  @AutoMap()
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @ApiProperty({
    description: 'Values for refresh token query parameters',
  })
  refreshTokenQueryValues: string[];
}
