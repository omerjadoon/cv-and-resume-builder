"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapModule = void 0;
const common_1 = require("@nestjs/common");
const scrap_service_1 = require("./scrap.service");
const scrap_controller_1 = require("./scrap.controller");
const scrap_entity_1 = require("./entities/scrap.entity");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const typeorm_1 = require("@nestjs/typeorm");
const multer_1 = require("multer");
const auth_module_1 = require("../auth/auth.module");
const users_module_1 = require("../users/users.module");
let ScrapModule = class ScrapModule {
};
ScrapModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([scrap_entity_1.Scrap]),
            platform_express_1.MulterModule.register({ storage: (0, multer_1.memoryStorage)() }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
        ],
        controllers: [scrap_controller_1.ScrapController],
        providers: [scrap_service_1.ScrapService],
        exports: [scrap_service_1.ScrapService],
    })
], ScrapModule);
exports.ScrapModule = ScrapModule;
//# sourceMappingURL=scrap.module.js.map