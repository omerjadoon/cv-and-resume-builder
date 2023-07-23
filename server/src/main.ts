import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { spawn } from 'child_process';

// Replace 'ls' with the command you want to execute in the subprocess.
const command = 'npx playwright install';


// Spawn a child process with the given command and arguments.
const childProcess = spawn(command);

// Listen for the 'data' event to capture the output of the subprocess.
childProcess.stdout.on('data', (data) => {
  console.log(`Subprocess output: ${data}`);
});
const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const appUrl = configService.get<string>('app.url');

  // Middleware
  app.enableCors({ origin: [appUrl], credentials: true });
  app.enableShutdownHooks();
  app.use(cookieParser());


  // Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Server Port
  const port = configService.get<number>('app.port');
  await app.listen(port);

  Logger.log(`🚀 Server is up and running!`);
};

bootstrap();
