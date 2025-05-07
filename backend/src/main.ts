import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS (Cross-Origin Resource Sharing) - ajuste conforme necessário para produção
  app.enableCors({
    origin: 'http://localhost:3001', // Ou a porta que seu frontend estiver usando
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  }) ;

  // Adicionar um prefixo global para todas as rotas da API (opcional, mas comum)
  app.setGlobalPrefix('api/v1');

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('SysAlok API')
    .setDescription('Documentação da API do Sistema de Alocação SysAlok')
    .setVersion('1.0')
    .addBearerAuth() // Se você for usar autenticação JWT Bearer
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // A documentação estará em /api/docs

  // Adicionar ValidationPipe globalmente para usar class-validator nos DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades que não estão no DTO
    forbidNonWhitelisted: true, // Lança erro se propriedades não whitelisted forem enviadas
    transform: true, // Transforma o payload para o tipo do DTO (ex: string para number)
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}/api/v1`);
  console.log(`Swagger documentation is available on: http://localhost:${port}/api/docs`);
}
bootstrap();

