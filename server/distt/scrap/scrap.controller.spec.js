"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const scrap_controller_1 = require("./scrap.controller");
const scrap_service_1 = require("./scrap.service");
describe('ScrapController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [scrap_controller_1.ScrapController],
            providers: [scrap_service_1.ScrapService],
        }).compile();
        controller = module.get(scrap_controller_1.ScrapController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=scrap.controller.spec.js.map