import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { WalletEntity } from './wallet.entity';
import { CreateAccountDto } from './dto/create-wallet.dto';
import { RecargaDto } from './dto/recarga.dto';
import { ConsultarSaldoDto } from './dto/consultar-saldo.dto';
import { TransactionEntity } from './transaction.entity';
import { PagarDto } from './dto/pagar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfirmPaymentDto } from './dto/confirmPayment.dto';
import { SessionService } from 'src/session/session.service';

@Injectable()
export class WalletService {
  constructor(
    private readonly walletRepository: WalletRepository,  // Acceso a la base de datos solo a través del repositorio
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    private readonly sessionService: SessionService,  
  ) {}

  async crearCuenta(createAccountDto: CreateAccountDto): Promise<WalletEntity> {
    const nuevaWallet = this.walletRepository.createWallet(createAccountDto);
    return nuevaWallet;
  }

  async recargar(recargaDto: RecargaDto): Promise<WalletEntity> {
    const { user_id, account_number, amount } = recargaDto;
    const wallet = await this.walletRepository.findByUserIdAndAccountNumber(
      user_id,
      account_number,
    );

    if (!wallet) {
      throw new NotFoundException('La cuenta no existe.');
    }

    if (typeof wallet.balance !== 'number') {
      wallet.balance = parseFloat(wallet.balance as unknown as string);
      if (isNaN(wallet.balance)) {
        throw new Error('El saldo de la cuenta no se pudo convertir a un número');
      }
    }

    if (typeof amount !== 'number' || isNaN(amount)) {
      throw new Error('El monto proporcionado no es válido');
    }

    wallet.balance += Number(amount);

    return this.walletRepository.updateBalance(wallet);
  }

  private async recordTransaction(
    sourceAccountId: number,
    destinationAccountNumber: string,
    amount: number,
  ): Promise<string> {
    const transaction = new TransactionEntity();

    transaction.sourceAccountId = sourceAccountId;
    transaction.destinationAccount = destinationAccountNumber;
    transaction.amount = Number(amount);
    transaction.date = new Date();

    try {
      await this.transactionRepository.save(transaction);  // Uso del repositorio para almacenar la transacción
      return 'Transacción registrada con éxito.';
    } catch (error) {
         throw new BadRequestException('Error al registrar la transacción.');
    }
  }

  async confirmarPago(confirmPaymentDto: ConfirmPaymentDto): Promise<{ message: string }> {
    const { sessionId, token, userId, accountNumber, amount } = confirmPaymentDto;

    // Validar sesión
    const isValidSession = await this.sessionService.validateSession(sessionId);
    if (!isValidSession) {
        throw new BadRequestException('ID de sesión no válido.');
    }

    // Validar token
    const isValidToken = await this.sessionService.validateToken(token);
    if (!isValidToken) {
        throw new BadRequestException('Token no válido.');
    }

    // Buscar billetera
    const wallet = await this.walletRepository.findByUserIdAndAccountNumber(userId, accountNumber);
    if (!wallet) {
        throw new NotFoundException('La billetera no existe.');
    }

    // Verificar saldo
    if (wallet.balance < Number(amount)) {
        throw new BadRequestException('Saldo insuficiente.');
    }

    // Actualizar saldo
    wallet.balance -= Number(amount);
    await this.walletRepository.updateBalance(wallet);

    // Registrar transacción
    await this.recordTransaction(wallet.id, accountNumber, amount);

    // Eliminar la sesión después de que el pago sea exitoso
    await this.sessionService.removeSession(sessionId);

    return { message: 'Pago confirmado con éxito.' };
  }

  async consultarSaldo(consultarSaldoDto: ConsultarSaldoDto): Promise<SaldoResponse> {
    const { user_id, account_number } = consultarSaldoDto;
    const wallet = await this.walletRepository.findByUserIdAndAccountNumber(
      user_id,
      account_number,
    );

    if (!wallet) {
      throw new NotFoundException('La cuenta no existe.');
    }

    return {
      userId: wallet.userId,
      account_number: wallet.account_number,
      balance: wallet.balance,
    };
  }

  async consultarSaldos(consultarSaldoDto: ConsultarSaldoDto): Promise<string[]> {
    const { user_id } = consultarSaldoDto;
    
    // Obtener las wallets por el user_id
    const wallets = await this.walletRepository.findByAllUserId(user_id);
  
    // Si no se encuentran wallets, lanzar una excepción
    if (!wallets || wallets.length === 0) {
      throw new NotFoundException('No se encontraron cuentas para este usuario.');
    }
  
    // Retornar solo los account_number en un arreglo
    return wallets.map(wallet => wallet.account_number);
  }
  
    
  async iniciarPago( pagarDto: PagarDto): Promise<{ sessionId: string }> {
    const { userId, sourceAccountNumber, amount } = pagarDto;
    const wallet = await this.walletRepository.findByUserIdAndAccountNumber(userId, sourceAccountNumber);
    if (!wallet) {
        throw new BadRequestException('La billetera no existe.');
    }

    if (wallet.balance < Number(amount)) {
        throw new BadRequestException('Saldo insuficiente.');
    }

    if (wallet.account_number !== sourceAccountNumber) {
        throw new BadRequestException('El número de cuenta no pertenece al usuario.');
    }

    const sessionId = await this.sessionService.createSession(userId);

    return { sessionId }; 
  }
}
