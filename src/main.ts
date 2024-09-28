import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors(); // Permitir CORS para todas las rutas

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Wallet API')
    .setDescription('API para gestionar billeteras')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Cambiado para escuchar en todas las interfaces de red
  await app.listen(3005, '0.0.0.0'); // Escuchar en todas las interfaces
}

bootstrap();
