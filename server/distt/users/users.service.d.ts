import { SchedulerRegistry } from '@nestjs/schedule';
import { DataSource, Repository } from 'typeorm';
import { MailService } from '@/mail/mail.service';
import { CreateGoogleUserDto } from './dto/create-google-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
export declare const DELETION_TIME: number;
export declare class UsersService {
    private userRepository;
    private schedulerRegistry;
    private mailService;
    private dataSource;
    constructor(userRepository: Repository<User>, schedulerRegistry: SchedulerRegistry, mailService: MailService, dataSource: DataSource);
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findByIdentifier(identifier: string): Promise<User>;
    findByResetToken(resetToken: string): Promise<User>;
    create(createUserDto: CreateUserDto | CreateGoogleUserDto): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        username: string;
        email: string;
        password?: string;
        provider: "email" | "google";
        resetToken?: string;
        id: number;
        resumes: import("../resume/entities/resume.entity").Resume[];
        scraplist: import("../scrap/entities/scrap.entity").Scrap[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<void>;
    generateResetToken(email: string): Promise<void>;
}
