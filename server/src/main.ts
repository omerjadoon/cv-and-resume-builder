import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

import fs from 'fs';

const bootstrap = async () => {

const httpsOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/hiresafarijobs.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/hiresafarijobs.com/fullchain.pem'),
};
const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  httpsOptions,
});
  const configService = app.get(ConfigService);

  const appUrl = configService.get<string>('app.url');

  // Middleware
  app.enableCors({ origin: '*', credentials: true });
  app.enableShutdownHooks();
  app.use(cookieParser());


  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Server Port
  // const port = configService.get<number>('app.port');
  const port = process.env.PORT || 3100;
  await app.listen(port);

  Logger.log(`🚀 Server is up and running!`);
};

bootstrap();
