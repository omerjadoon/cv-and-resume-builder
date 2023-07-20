import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Font } from '@reactive-resume/schema';
export declare class FontsService {
    private configService;
    private httpService;
    constructor(configService: ConfigService, httpService: HttpService);
    getAll(): Promise<Font[]>;
}
