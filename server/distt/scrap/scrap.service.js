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
exports.ScrapService = void 0;
const { linkedinScrape } = require('./linkedinScraper');
const fs = require('fs');
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const lodash_1 = require("lodash");
const typeorm_2 = require("typeorm");
const users_service_1 = require("../users/users.service");
const scrap_entity_1 = require("./entities/scrap.entity");
let ScrapService = class ScrapService {
    constructor(scrapRepository, configService, usersService) {
        this.scrapRepository = scrapRepository;
        this.configService = configService;
        this.usersService = usersService;
        this.s3Enabled = !(0, lodash_1.isEmpty)(configService.get('storage.bucket'));
        if (this.s3Enabled) {
            this.s3Client = new client_s3_1.S3({
                endpoint: configService.get('storage.endpoint'),
                region: configService.get('storage.region'),
                credentials: {
                    accessKeyId: configService.get('storage.accessKey'),
                    secretAccessKey: configService.get('storage.secretKey'),
                },
            });
        }
    }
    create(createScrapDto) {
        return 'This action adds a new scrap';
    }
    findAll() {
        return `This action returns all scrap`;
    }
    findAllByUser(userId) {
        return this.scrapRepository.find({ where: { user: { id: userId } } });
    }
    async linkedin(linkedinScrapDto) {
        console.log(linkedinScrapDto);
        const { title, location } = linkedinScrapDto;
        let result = await linkedinScrape(title, location);
        let rawdata = fs.readFileSync('linkedin_scraped_data.json');
        let dataObj = JSON.parse(rawdata);
        return dataObj;
    }
    findOne(id) {
        return `This action returns a #${id} scrap`;
    }
    update(id, updateScrapDto) {
        return `This action updates a #${id} scrap`;
    }
    remove(id) {
        return `This action removes a #${id} scrap`;
    }
};
ScrapService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(scrap_entity_1.Scrap)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        users_service_1.UsersService])
], ScrapService);
exports.ScrapService = ScrapService;
//# sourceMappingURL=scrap.service.js.map