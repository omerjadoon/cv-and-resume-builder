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
exports.FontsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const fonts_service_1 = require("./fonts.service");
let FontsController = class FontsController {
    constructor(fontsService) {
        this.fontsService = fontsService;
    }
    getAll() {
        return this.fontsService.getAll();
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FontsController.prototype, "getAll", null);
FontsController = __decorate([
    (0, common_1.Controller)('fonts'),
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    __metadata("design:paramtypes", [fonts_service_1.FontsService])
], FontsController);
exports.FontsController = FontsController;
//# sourceMappingURL=fonts.controller.js.map