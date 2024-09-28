import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity'; // Importa tu entidad de usuario
import { UserRepository } from './user.repository'; // Si tienes un repositorio específico

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])], // Registra la entidad
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Exporta el servicio si es necesario
})
export class UserModule {}
