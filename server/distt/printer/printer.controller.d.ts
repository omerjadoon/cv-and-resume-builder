import { PrinterService } from './printer.service';
export declare class PrinterController {
    private readonly printerService;
    constructor(printerService: PrinterService);
    printAsPdf(username: string, slug: string, lastUpdated: string): Promise<string>;
}
