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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrinterController = void 0;
const common_1 = require("@nestjs/common");
const printer_service_1 = require("./printer.service");
let PrinterController = class PrinterController {
    constructor(printerService) {
        this.printerService = printerService;
    }
    printAsPdf(username, slug, lastUpdated) {
        return this.printerService.printAsPdf(username, slug, lastUpdated);
    }
};
__decorate([
    (0, common_1.Get)('/:username/:slug'),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Param)('slug')),
    __param(2, (0, common_1.Query)('lastUpdated')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PrinterController.prototype, "printAsPdf", null);
PrinterController = __decorate([
    (0, common_1.Controller)('printer'),
    __metadata("design:paramtypes", [printer_service_1.PrinterService])
], PrinterController);
exports.PrinterController = PrinterController;
//# sourceMappingURL=printer.controller.js.map