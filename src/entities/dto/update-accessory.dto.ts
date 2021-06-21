import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';
import { States } from '../enum/state-accessory.enum';

export class UpdateAccessoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<nombre>> no puede estar vacío!' })
  name?: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  category_id?: number;

  @ApiProperty()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  lost_date?: Date;

  @ApiProperty()
  @IsOptional()
  lost_place?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  reward?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<estados>> no puede estar vacío!' })
  state?: States;
}
