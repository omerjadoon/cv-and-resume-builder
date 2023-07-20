import { FontsService } from './fonts.service';
export declare class FontsController {
    private fontsService;
    constructor(fontsService: FontsService);
    getAll(): Promise<import("@reactive-resume/schema").Font[]>;
}
