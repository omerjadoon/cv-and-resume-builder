import { User } from '@/users/entities/user.entity';
export declare class Scrap {
    id: number;
    title: string;
    website: string;
    job_date: string;
    company: string;
    job_location: string;
    url: string;
    user_id: string;
    user: User;
    constructor(partial: Partial<Scrap>);
}
