import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletService } from './wallet.service';
import { WalletRepository } from './wallet.repository';
import { WalletController } from './wallet.controller'; 
import { TransactionEntity } from './transaction.entity';
import { SessionModule } from 'src/session/sessionservice.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionEntity]), SessionModule],
  
  providers: [WalletService, WalletRepository],
  controllers: [WalletController], 
  exports: [WalletService],
})
export class WalletModule {}
