import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateCategoryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<categoría>> no puede estar vacío!' })
  category?: string;
}
