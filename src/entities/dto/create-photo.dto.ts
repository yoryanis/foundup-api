import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';
export class CreatePhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<url>> no puede estar vacío!' })
  url?: string;

  @ApiProperty()
  @IsNotEmpty()
  default?: boolean;
}
