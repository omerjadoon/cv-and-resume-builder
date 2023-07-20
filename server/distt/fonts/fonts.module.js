"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontsModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fonts_controller_1 = require("./fonts.controller");
const fonts_service_1 = require("./fonts.service");
const cacheTTL = 60 * 60 * 24 * 7;
let FontsModule = class FontsModule {
};
FontsModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, axios_1.HttpModule, common_1.CacheModule.register({ ttl: cacheTTL })],
        controllers: [fonts_controller_1.FontsController],
        providers: [fonts_service_1.FontsService],
    })
], FontsModule);
exports.FontsModule = FontsModule;
//# sourceMappingURL=fonts.module.js.map