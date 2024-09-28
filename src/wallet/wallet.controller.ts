import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateAccountDto } from './dto/create-wallet.dto';
import { RecargaDto } from './dto/recarga.dto';
import { ConsultarSaldoDto } from './dto/consultar-saldo.dto';
import { ConfirmPaymentDto } from './dto/confirmPayment.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { PagarDto } from './dto/pagar.dto';

@ApiTags('wallet')  // Para agrupar los endpoints
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('crear-cuenta')
  @HttpCode(HttpStatus.CREATED) // Define el código de estado HTTP
  @ApiResponse({ status: 201, description: 'Cuenta creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error en la creación de la cuenta.' })
  async crearCuenta(@Body() createAccountDto: CreateAccountDto) {
    return this.walletService.crearCuenta(createAccountDto);
  }

  @Post('recargar')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Recarga exitosa.' })
  async recargar(@Body() recargaDto: RecargaDto) {
    return this.walletService.recargar(recargaDto);
  }

  @Post('consultar-saldo')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Saldo consultado exitosamente.' })
  async consultarSaldo(@Body() consultarSaldoDto: ConsultarSaldoDto) {
    return this.walletService.consultarSaldo(consultarSaldoDto);
  }

  @Post('consultar-saldos')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Saldo consultado exitosamente.' })
  async consultarSaldos(@Body() consultarSaldoDto: ConsultarSaldoDto) {
    return this.walletService.consultarSaldos(consultarSaldoDto);
  }

  @Post('pago/iniciar')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Pago iniciado exitosamente.' })
  async iniciarPago(
    @Body()  pagarDto: PagarDto){
    return this.walletService.iniciarPago(pagarDto);
  }

  @Post('pago/confirmar')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Pago confirmado exitosamente.' })
  async confirmarPago(@Body() confirmPaymentDto: ConfirmPaymentDto) {
    return this.walletService.confirmarPago(confirmPaymentDto);
  }
}
