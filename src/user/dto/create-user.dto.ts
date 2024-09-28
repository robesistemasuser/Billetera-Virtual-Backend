import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  
    @ApiProperty({ description: 'ID del usuario, generado automáticamente.', example: 1 })
    id: number;

    @ApiProperty({ description: 'Número de documento del usuario.', example: '12345678' })
    @IsNotEmpty()
    documento: string;

    @ApiProperty({ description: 'Nombres del usuario.', example: 'Juan Perez' })
    @IsNotEmpty()
    nombres: string;

    @ApiProperty({ description: 'Correo electrónico del usuario.', example: 'juan.perez@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Número de celular del usuario.', example: '3001234567' })
    @IsNotEmpty()
    celular: string;

    @ApiProperty({ description: 'Contraseña del usuario.', example: 'secretPassword' })
    @IsNotEmpty()
    password: string;
}
