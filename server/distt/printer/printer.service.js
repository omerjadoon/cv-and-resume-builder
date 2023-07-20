"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrinterService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const promises_1 = require("fs/promises");
const path_1 = require("path");
const pdf_lib_1 = require("pdf-lib");
const playwright_chromium_1 = require("playwright-chromium");
let PrinterService = class PrinterService {
    constructor(schedulerRegistry, configService) {
        this.schedulerRegistry = schedulerRegistry;
        this.configService = configService;
    }
    async onModuleInit() {
        this.browser = await playwright_chromium_1.chromium.launch({
            args: ['--disable-dev-shm-usage'],
        });
    }
    async onModuleDestroy() {
        await this.browser.close();
    }
    async printAsPdf(username, slug, lastUpdated) {
        const serverUrl = this.configService.get('app.serverUrl');
        const directory = (0, path_1.join)(__dirname, '..', 'assets/exports');
        const filename = `Resume_${username}_${slug}_${lastUpdated}.pdf`;
        const publicUrl = `${serverUrl}/assets/exports/${filename}`;
        try {
            await (0, promises_1.access)((0, path_1.join)(directory, filename));
        }
        catch (_a) {
            const activeSchedulerTimeouts = this.schedulerRegistry.getTimeouts();
            await (0, promises_1.readdir)(directory).then(async (files) => {
                await Promise.all(files.map(async (file) => {
                    if (file.startsWith(`Resume_${username}_${slug}`)) {
                        await (0, promises_1.unlink)((0, path_1.join)(directory, file));
                        if (activeSchedulerTimeouts[`delete-${file}`]) {
                            this.schedulerRegistry.deleteTimeout(`delete-${file}`);
                        }
                    }
                }));
            });
            const url = this.configService.get('app.url');
            const secretKey = this.configService.get('app.secretKey');
            const pdfDeletionTime = this.configService.get('cache.pdfDeletionTime');
            const page = await this.browser.newPage();
            await page.goto(`${url}/${username}/${slug}/printer?secretKey=${secretKey}`);
            await page.waitForLoadState('networkidle');
            await page.waitForSelector('html.wf-active');
            const pageFormat = await page.$$eval('[data-page]', (pages) => pages[0].getAttribute('data-format'));
            const resumePages = await page.$$eval('[data-page]', (pages) => pages.map((page, index) => ({
                pageNumber: index + 1,
                innerHTML: page.innerHTML,
                height: page.clientHeight,
            })));
            const pdf = await pdf_lib_1.PDFDocument.create();
            for (let index = 0; index < resumePages.length; index++) {
                await page.evaluate((page) => (document.body.innerHTML = page.innerHTML), resumePages[index]);
                const buffer = await page.pdf({
                    printBackground: true,
                    height: resumePages[index].height,
                    width: pageFormat === 'A4' ? '210mm' : '216mm',
                });
                const pageDoc = await pdf_lib_1.PDFDocument.load(buffer);
                const copiedPages = await pdf.copyPages(pageDoc, [0]);
                copiedPages.forEach((copiedPage) => pdf.addPage(copiedPage));
            }
            await page.close();
            const pdfBytes = await pdf.save();
            await (0, promises_1.mkdir)(directory, { recursive: true });
            await (0, promises_1.writeFile)((0, path_1.join)(directory, filename), pdfBytes);
            const timeout = setTimeout(async () => {
                try {
                    await (0, promises_1.unlink)((0, path_1.join)(directory, filename));
                    this.schedulerRegistry.deleteTimeout(`delete-${filename}`);
                }
                catch (_a) {
                }
            }, pdfDeletionTime);
            this.schedulerRegistry.addTimeout(`delete-${filename}`, timeout);
        }
        return publicUrl;
    }
};
PrinterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry, config_1.ConfigService])
], PrinterService);
exports.PrinterService = PrinterService;
//# sourceMappingURL=printer.service.js.map