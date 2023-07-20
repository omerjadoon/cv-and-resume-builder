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
exports.ScrapController = void 0;
const common_1 = require("@nestjs/common");
const scrap_service_1 = require("./scrap.service");
const create_scrap_dto_1 = require("./dto/create-scrap.dto");
const update_scrap_dto_1 = require("./dto/update-scrap.dto");
const linkedin_scrap_dto_1 = require("./dto/linkedin-scrap.dto");
const user_decorator_1 = require("../decorators/user.decorator");
let ScrapController = class ScrapController {
    constructor(scrapService) {
        this.scrapService = scrapService;
    }
    create(createScrapDto) {
        console.log(createScrapDto);
        return this.scrapService.create(createScrapDto);
    }
    findAll() {
        return this.scrapService.findAll();
    }
    async findAllByUser(userId) {
        return this.scrapService.findAllByUser(userId);
    }
    linkedin(linkedinScrapDto) {
        console.log("linkedin");
        return this.scrapService.linkedin(linkedinScrapDto);
    }
    findOne(id) {
        return this.scrapService.findOne(+id);
    }
    update(id, updateScrapDto) {
        return this.scrapService.update(+id, updateScrapDto);
    }
    remove(id) {
        return this.scrapService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_scrap_dto_1.CreateScrapDto]),
    __metadata("design:returntype", void 0)
], ScrapController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ScrapController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ScrapController.prototype, "findAllByUser", null);
__decorate([
    (0, common_1.Post)('linkedin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [linkedin_scrap_dto_1.LinkedinScrapDto]),
    __metadata("design:returntype", void 0)
], ScrapController.prototype, "linkedin", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScrapController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_scrap_dto_1.UpdateScrapDto]),
    __metadata("design:returntype", void 0)
], ScrapController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ScrapController.prototype, "remove", null);
ScrapController = __decorate([
    (0, common_1.Controller)('scrap'),
    __metadata("design:paramtypes", [scrap_service_1.ScrapService])
], ScrapController);
exports.ScrapController = ScrapController;
//# sourceMappingURL=scrap.controller.js.map