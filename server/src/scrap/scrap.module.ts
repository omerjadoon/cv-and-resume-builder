import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { memoryStorage } from 'multer';

import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from '@/users/users.module';

import { Scrap } from './entities/scrap.entity';
import { ScrapController } from './scrap.controller';
import { ScrapService } from './scrap.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Scrap]),
    MulterModule.register({ storage: memoryStorage() }),
    AuthModule,
    UsersModule,
  ],
  controllers: [ScrapController],
  providers: [ScrapService],
  exports: [ScrapService],
})
export class ScrapModule {}
