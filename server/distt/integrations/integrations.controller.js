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
exports.IntegrationsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const user_decorator_1 = require("../decorators/user.decorator");
const integrations_service_1 = require("./integrations.service");
let IntegrationsController = class IntegrationsController {
    constructor(integrationsService) {
        this.integrationsService = integrationsService;
    }
    linkedIn(userId, file) {
        if (!file) {
            throw new common_1.HttpException('You must upload a valid zip archive downloaded from LinkedIn.', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.integrationsService.linkedIn(userId, file.path);
    }
    jsonResume(userId, file) {
        if (!file) {
            throw new common_1.HttpException('You must upload a valid JSON file.', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.integrationsService.jsonResume(userId, file.path);
    }
    reactiveResume(userId, file) {
        if (!file) {
            throw new common_1.HttpException('You must upload a valid JSON file.', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.integrationsService.reactiveResume(userId, file.path);
    }
    reactiveResumeV2(userId, file) {
        if (!file) {
            throw new common_1.HttpException('You must upload a valid JSON file.', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.integrationsService.reactiveResumeV2(userId, file.path);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('linkedin'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], IntegrationsController.prototype, "linkedIn", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('json-resume'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], IntegrationsController.prototype, "jsonResume", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('reactive-resume'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], IntegrationsController.prototype, "reactiveResume", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.Post)('reactive-resume-v2'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, user_decorator_1.User)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], IntegrationsController.prototype, "reactiveResumeV2", null);
IntegrationsController = __decorate([
    (0, common_1.Controller)('integrations'),
    __metadata("design:paramtypes", [integrations_service_1.IntegrationsService])
], IntegrationsController);
exports.IntegrationsController = IntegrationsController;
//# sourceMappingURL=integrations.controller.js.map