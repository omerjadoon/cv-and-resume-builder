import { Basics, Metadata, Section } from '@reactive-resume/schema';
import { User } from '@/users/entities/user.entity';
export declare class Resume {
    id: number;
    shortId: string;
    name: string;
    slug: string;
    image?: string;
    user: User;
    basics: Basics;
    sections: Partial<Record<string, Section>>;
    metadata: Metadata;
    public: boolean;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<Resume>);
}
