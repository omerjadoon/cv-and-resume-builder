/// <reference types="multer" />
import { IntegrationsService } from './integrations.service';
export declare class IntegrationsController {
    private integrationsService;
    constructor(integrationsService: IntegrationsService);
    linkedIn(userId: number, file: Express.Multer.File): Promise<import("../resume/entities/resume.entity").Resume>;
    jsonResume(userId: number, file: Express.Multer.File): Promise<import("../resume/entities/resume.entity").Resume>;
    reactiveResume(userId: number, file: Express.Multer.File): Promise<import("../resume/entities/resume.entity").Resume>;
    reactiveResumeV2(userId: number, file: Express.Multer.File): Promise<import("../resume/entities/resume.entity").Resume>;
}
