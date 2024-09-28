import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/user.entity';
import { WalletEntity } from '../wallet/wallet.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        TypeOrmModule.forFeature([UserEntity, WalletEntity]),
    ],
})
export class DatabaseModule {}
