import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConsultarSaldoDto {
    
    @ApiProperty({
        description: 'ID del usuario para consultar el saldo',
        type: Number,
    })
    @IsNotEmpty()
    user_id: number;

    @ApiProperty({
        description: 'Número de cuenta para consultar el saldo',
        type: String,
    })
    @IsNotEmpty()
    account_number: string;
}
