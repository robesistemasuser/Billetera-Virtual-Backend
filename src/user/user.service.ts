// src/user/user.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse } from '../common/interfaces/api-response.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) // Inyectar el repositorio de UserEntity
        private readonly userRepository: Repository<UserEntity>, // Usar el repositorio de TypeORM
    ) {}

    async register(createUserDto: CreateUserDto): Promise<ApiResponse<UserEntity>> {
        const existingUser = await this.userRepository.findOne({ where: { documento: createUserDto.documento } });
        if (existingUser) {
            throw new ConflictException('User already exists');
        }

        const user = this.userRepository.create(createUserDto); // Crear una nueva instancia de UserEntity
        await this.userRepository.save(user); // Guardar el nuevo usuario

        return {
            statusCode: 201,
            message: 'User registered successfully',
            data: user,
        };
    }

    async login(loginUserDto: LoginUserDto): Promise<ApiResponse<UserEntity>> {
        const user = await this.userRepository.findOne({ where: { email: loginUserDto.email, password: loginUserDto.password } }); // Asume que tienes campos de usuario y contraseña
        if (!user) {
            throw new ConflictException('Invalid credentials');
        }

        return {
            statusCode: 200,
            message: 'Login successful',
            data: user,
        };
    }
}
