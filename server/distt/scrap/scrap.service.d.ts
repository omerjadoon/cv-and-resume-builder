import { CreateScrapDto } from './dto/create-scrap.dto';
import { UpdateScrapDto } from './dto/update-scrap.dto';
import { LinkedinScrapDto } from './dto/linkedin-scrap.dto';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { UsersService } from '@/users/users.service';
import { Scrap } from './entities/scrap.entity';
export declare class ScrapService {
    private scrapRepository;
    private configService;
    private usersService;
    private s3Client;
    private s3Enabled;
    constructor(scrapRepository: Repository<Scrap>, configService: ConfigService, usersService: UsersService);
    create(createScrapDto: CreateScrapDto): string;
    findAll(): string;
    findAllByUser(userId: number): Promise<Scrap[]>;
    linkedin(linkedinScrapDto: LinkedinScrapDto): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateScrapDto: UpdateScrapDto): string;
    remove(id: number): string;
}
