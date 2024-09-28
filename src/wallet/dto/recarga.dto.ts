import { IsNotEmpty, IsPositive, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecargaDto {
  
  @ApiProperty({
    description: 'ID del usuario que realiza la recarga',
    type: Number,
  })
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    description: 'Número de cuenta desde la que se realiza la recarga, debe tener una longitud mínima de 20 caracteres',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(20) // Asegurando que el número de cuenta tenga una longitud mínima
  account_number: string;

  @ApiProperty({
    description: 'Monto de la recarga, debe ser un número positivo',
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive()
  amount: number;
}
