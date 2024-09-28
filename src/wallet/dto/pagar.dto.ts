import { IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PagarDto {
  
  @ApiProperty({
    description: 'ID del usuario que realiza el pago',
    type: Number,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: 'Número de cuenta fuente desde la que se realiza el pago',
    type: String,
  })
  @IsNotEmpty()
  sourceAccountNumber: string;

  @ApiProperty({
    description: 'Número de cuenta destino a la que se realiza el pago',
    type: String,
  })
  @IsNotEmpty()
  destinationAccountNumber: string;

  @ApiProperty({
    description: 'Monto a pagar, debe ser un número positivo',
    type: Number,
  })
  @IsNotEmpty()
  @IsPositive() // Asegúrate de que el monto sea positivo
  amount: number;

  @ApiProperty({
    description: 'ID de sesión del pago, debe ser una cadena',
    type: String,
  })
  @IsNotEmpty()
  @IsString() // Verifica que el sessionId sea una cadena
  sessionId: string;

  @ApiProperty({
    description: 'Token de autorización del pago, debe ser una cadena',
    type: String,
  })
  @IsNotEmpty()
  @IsString() // Verifica que el token sea una cadena
  token: string;
}
