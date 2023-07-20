/// <reference types="multer" />
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { ResumeService } from './resume.service';
export declare class ResumeController {
    private readonly resumeService;
    constructor(resumeService: ResumeService);
    create(createResumeDto: CreateResumeDto, userId: number): Promise<import("./entities/resume.entity").Resume>;
    findAllByUser(userId: number): Promise<import("./entities/resume.entity").Resume[]>;
    findOneByShortId(shortId: string, userId?: number, secretKey?: string): Promise<import("./entities/resume.entity").Resume>;
    findOneByIdentifier(username: string, slug: string, userId?: number, secretKey?: string): Promise<import("./entities/resume.entity").Resume>;
    findOne(id: string, userId?: number): Promise<import("./entities/resume.entity").Resume>;
    update(id: string, userId: number, updateResumeDto: UpdateResumeDto): Promise<import("./entities/resume.entity").Resume>;
    removeAllByUser(userId: number): Promise<import("typeorm").DeleteResult>;
    remove(id: string, userId: number): Promise<import("typeorm").DeleteResult>;
    duplicate(id: string, userId: number): Promise<import("./entities/resume.entity").Resume>;
    sample(id: string, userId: number): Promise<import("./entities/resume.entity").Resume>;
    reset(id: string, userId: number): Promise<import("typeorm").UpdateResult>;
    uploadPhoto(id: string, userId: number, file: Express.Multer.File): Promise<import("./entities/resume.entity").Resume[]>;
    deletePhoto(id: string, userId: number): Promise<import("./entities/resume.entity").Resume>;
}
