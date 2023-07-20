"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const scrap_service_1 = require("./scrap.service");
describe('ScrapService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [scrap_service_1.ScrapService],
        }).compile();
        service = module.get(scrap_service_1.ScrapService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=scrap.service.spec.js.map