import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SchedulerRegistry } from '@nestjs/schedule';
export declare class PrinterService implements OnModuleInit, OnModuleDestroy {
    private readonly schedulerRegistry;
    private readonly configService;
    private browser;
    constructor(schedulerRegistry: SchedulerRegistry, configService: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    printAsPdf(username: string, slug: string, lastUpdated: string): Promise<string>;
}
