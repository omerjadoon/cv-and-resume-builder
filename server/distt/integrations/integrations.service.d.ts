import { Resume as ResumeEntity } from '@/resume/entities/resume.entity';
import { ResumeService } from '@/resume/resume.service';
export declare class IntegrationsService {
    private resumeService;
    constructor(resumeService: ResumeService);
    linkedIn(userId: number, path: string): Promise<ResumeEntity>;
    jsonResume(userId: number, path: string): Promise<ResumeEntity>;
    reactiveResume(userId: number, path: string): Promise<ResumeEntity>;
    reactiveResumeV2(userId: number, path: string): Promise<ResumeEntity>;
    private parseDate;
}
