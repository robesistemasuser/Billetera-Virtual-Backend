import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger'; // Asegúrate de importar estos decoradores
import { ApiResponse as SwaggerApiResponse } from '../common/interfaces/api-response.interface'; // Importar la interfaz de respuesta
import { UserEntity } from './user.entity'; // Asegúrate de que esta entidad esté bien definida

@ApiTags('users') // Etiqueta para agrupar en Swagger
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    @HttpCode(201)
    @ApiOperation({ summary: 'Registrar un nuevo usuario' }) // Descripción del endpoint
    @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.', type: UserEntity }) // Respuesta esperada
    async register(@Body() createUserDto: CreateUserDto): Promise<SwaggerApiResponse<UserEntity>> {
        return await this.userService.register(createUserDto);
    }

    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Iniciar sesión de usuario' }) // Descripción del endpoint
    @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.' }) // Respuesta esperada sin tipo
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' }) // Ejemplo de error
    async login(@Body() loginUserDto: LoginUserDto): Promise<SwaggerApiResponse<UserEntity>> {
        return await this.userService.login(loginUserDto);
    }
    
}
