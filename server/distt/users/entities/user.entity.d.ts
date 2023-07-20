import { Scrap } from 'src/scrap/entities/scrap.entity';
import { Resume } from '@/resume/entities/resume.entity';
export declare class User {
    id: number;
    name: string;
    username: string;
    email: string;
    password?: string;
    resetToken?: string;
    resumes: Resume[];
    scraplist: Scrap[];
    provider: 'email' | 'google';
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<User>);
}
