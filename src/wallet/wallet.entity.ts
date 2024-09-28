import { UserEntity } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('accounts') // Nombre de la tabla en la base de datos
export class WalletEntity {
    @ApiProperty({ description: 'ID único de la cuenta.', example: 1 })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: 'ID del usuario propietario de la cuenta.', example: 1 })
    @Column() // Este campo es opcional si tienes la relación
    userId: number; // Cambiado a camelCase para consistencia

    @ApiProperty({ description: 'Número de cuenta único.', example: '12345678901234567890' })
    @Column({ unique: true })
    account_number: string;

    @ApiProperty({ description: 'Tipo de cuenta (ahorros o corriente).', enum: ['savings', 'checking'], example: 'savings' })
    @Column({
        type: 'enum',
        enum: ['savings', 'checking'],
    })
    account_type: 'savings' | 'checking';

    @ApiProperty({ description: 'Saldo de la cuenta.', example: 1500.50 })
    @Column('decimal', { precision: 15, scale: 2, default: 0 })
    balance: number;

    @ApiProperty({ description: 'Fecha y hora de creación de la cuenta.', example: '2023-01-01T12:00:00Z' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ApiProperty({ description: 'Fecha y hora de la última actualización de la cuenta.', example: '2023-01-02T12:00:00Z' })
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    // Relación con la entidad UserEntity
    @ManyToOne(() => UserEntity, (user) => user.wallets)
    @JoinColumn({ name: 'userId' }) // Cambiado a userId para que coincida con el nombre de la propiedad
    user: UserEntity;
}
