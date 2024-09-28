import { IsEnum, IsNotEmpty, IsNumberString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  
  @ApiProperty({
    description: 'ID del usuario que crea la cuenta',
    type: Number,
  })
  @IsNotEmpty()
  user_id: number;

  @ApiProperty({
    description: 'Número de cuenta con longitud mínima de 20 caracteres',
    type: String,
  })
  @IsNumberString()
  @MinLength(20) // Longitud mínima para el número de cuenta
  account_number: string;

  @ApiProperty({
    description: 'Tipo de cuenta, puede ser "savings" o "checking"',
    enum: ['savings', 'checking'],
  })
  @IsEnum(['savings', 'checking']) // Tipo de cuenta
  account_type: 'savings' | 'checking';

  @ApiProperty({
    description: 'Saldo inicial de la cuenta',
    type: Number,
  })
  @IsNotEmpty()
  balance: number;
}
