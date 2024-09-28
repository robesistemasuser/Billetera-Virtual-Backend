import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ description: 'Correo electrónico del usuario.', example: 'usuario@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ description: 'Contraseña del usuario.', example: 'miContraseñaSegura' })
    @IsNotEmpty()
    password: string;
}
