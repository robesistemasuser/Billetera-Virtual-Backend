import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmPaymentDto {
  @ApiProperty({
    description: 'Identificador de la sesión de pago',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @ApiProperty({
    description: 'Token de autorización para la confirmación del pago',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  token: string;

  @ApiProperty({
    description: 'ID del usuario que realiza el pago',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'Número de cuenta desde la cual se realiza el pago',
    type: String,
  })
  @IsNotEmpty()
  accountNumber: string;

  @ApiProperty({
    description: 'Número de cuenta destino a la cual se realizará el pago',
    type: String,
  })
  @IsNotEmpty()
  destinationAccount: string;

  @ApiProperty({
    description: 'Monto a pagar',
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
