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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FontsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const lodash_1 = require("lodash");
const rxjs_1 = require("rxjs");
const cachedResponse_json_1 = __importDefault(require("./assets/cachedResponse.json"));
let FontsService = class FontsService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
    }
    async getAll() {
        const apiKey = this.configService.get('google.apiKey');
        const url = 'https://www.googleapis.com/webfonts/v1/webfonts?key=' + apiKey;
        let data = [];
        if (apiKey) {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url));
            data = (0, lodash_1.get)(response.data, 'items', []);
        }
        else {
            data = cachedResponse_json_1.default;
        }
        return data;
    }
};
FontsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService, axios_1.HttpService])
], FontsService);
exports.FontsService = FontsService;
//# sourceMappingURL=fonts.service.js.map