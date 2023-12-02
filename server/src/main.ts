import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import fs from 'fs';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const environment = configService.get<string>('NODE_ENV') || 'development';

  // Middleware
  app.enableShutdownHooks();
  app.use(cookieParser());

  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Server Port
  const port = process.env.PORT || 3100;
  await app.listen(port);

  Logger.log(`🚀 Server is up and running on port ${port} in ${environment} environment!`);

  if (environment === 'production') {
    // Use Let's Encrypt encryption in production
    const httpsOptions = {
      key: fs.readFileSync('/etc/letsencrypt/live/hiresafarijobs.com/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/hiresafarijobs.com/fullchain.pem'),
    };
    app.enableCors({ origin: '*', credentials: true });
    await app.listen(port, () => {
      Logger.log(`🔒 HTTPS server is up and running on port ${port} in production environment!`);
    });
  }
};

bootstrap();
