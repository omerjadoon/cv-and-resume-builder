/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { Resume as ResumeSchema } from '@reactive-resume/schema';
import { Repository } from 'typeorm';
import { UsersService } from '@/users/users.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Resume } from './entities/resume.entity';
export declare const SHORT_ID_LENGTH = 8;
export declare class ResumeService {
    private resumeRepository;
    private configService;
    private usersService;
    private s3Client;
    private s3Enabled;
    constructor(resumeRepository: Repository<Resume>, configService: ConfigService, usersService: UsersService);
    create(createResumeDto: CreateResumeDto, userId: number): Promise<Resume>;
    import(importResumeDto: Partial<ResumeSchema>, userId: number): Promise<Resume>;
    findAll(): Promise<Resume[]>;
    findAllByUser(userId: number): Promise<Resume[]>;
    findOne(id: number, userId?: number): Promise<Resume>;
    findOneByShortId(shortId: string, userId?: number, secretKey?: string): Promise<Resume>;
    findOneByIdentifier(username: string, slug: string, userId?: number, secretKey?: string): Promise<Resume>;
    update(id: number, updateResumeDto: UpdateResumeDto, userId: number): Promise<Resume>;
    remove(id: number, userId: number): Promise<import("typeorm").DeleteResult>;
    removeAllByUser(userId: number): Promise<import("typeorm").DeleteResult>;
    duplicate(id: number, userId: number): Promise<Resume>;
    sample(id: number, userId: number): Promise<Resume>;
    reset(id: number, userId: number): Promise<import("typeorm").UpdateResult>;
    uploadPhoto(id: number, userId: number, file: Express.Multer.File): Promise<Resume[]>;
    deletePhoto(id: number, userId: number): Promise<Resume>;
}
