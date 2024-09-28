import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WalletEntity } from './wallet.entity';
import { DataSource } from 'typeorm'; 
import { CreateAccountDto } from './dto/create-wallet.dto';

@Injectable()
export class WalletRepository extends Repository<WalletEntity> {
  constructor(private dataSource: DataSource) {
     super(WalletEntity, dataSource.createEntityManager());
  }

  async findByUserId(userId: number): Promise<WalletEntity | undefined> {
    return this.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
  
async findByAllUserId(userId: number): Promise<WalletEntity[]> {
  return this.find({
    where: { user: { id: userId } }, 
    relations: ['user'], 
  });
}

async findByUserIdAndAccountNumber(user_id: number, account_number: string): Promise<WalletEntity | undefined> {
    return this.createQueryBuilder('wallet')
      .where('wallet.userid = :user_id', { user_id }) 
      .andWhere('wallet.account_number = :account_number', { account_number }) 
      .getOne(); 
  }
  
async updateBalance(wallet: WalletEntity): Promise<WalletEntity> {
    return this.save(wallet);
  }

  async createWallet(createAccountDto: CreateAccountDto): Promise<WalletEntity> {
    const wallet = this.create({
      user: { id: createAccountDto.user_id },
      account_number: this.generarNumeroCuenta(),
      account_type: createAccountDto.account_type,
      balance: 0,
    });

    return this.save(wallet);
  }

  private generarNumeroCuenta(): string {
    return Math.random().toString().slice(2, 12);
  }
}
