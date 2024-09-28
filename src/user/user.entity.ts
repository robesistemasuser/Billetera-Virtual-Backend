import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { WalletEntity } from 'src/wallet/wallet.entity';

@Entity('users')
export class UserEntity {
    @ApiProperty({ description: 'ID único del usuario.', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'Número de documento del usuario (debe ser único).', example: '12345678' })
    @Column({ unique: true })
    @IsNotEmpty()
    documento: string;

    @ApiProperty({ description: 'Nombres del usuario.', example: 'Juan Pérez' })
    @Column()
    @IsNotEmpty()
    nombres: string;

    @ApiProperty({ description: 'Correo electrónico del usuario (debe ser único y en formato válido).', example: 'juan.perez@example.com' })
    @Column({ unique: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Número de celular del usuario.', example: '+123456789' })
    @Column()
    @IsNotEmpty()
    celular: string;

    @ApiProperty({ description: 'Contraseña del usuario.', example: 'password123' })
    @Column()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ 
        description: 'Lista de cuentas asociadas al usuario.', 
        type: () => WalletEntity, 
        isArray: true // Indica que es un arreglo de WalletEntity
    })
    @OneToMany(() => WalletEntity, (wallet) => wallet.user)
    wallets: WalletEntity[];
}
