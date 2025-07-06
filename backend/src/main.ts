import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',     // Nuxt default port
      'http://localhost:3001',     // Alternative Nuxt port
      'http://127.0.0.1:3000',     // Localhost alternative
      'http://127.0.0.1:3001',     // Localhost alternative
      'http://localhost:5173',     // Vite default port
      'http://127.0.0.1:5173',     // Vite alternative
      process.env.FRONTEND_URL,    // Environment variable for production
    ].filter(Boolean), // Remove undefined values
    credentials: true,             // Allow cookies/credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control',
    ],
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
