"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const promises_1 = require("fs/promises");
const multer_1 = require("multer");
const path_1 = require("path");
const resume_module_1 = require("../resume/resume.module");
const integrations_controller_1 = require("./integrations.controller");
const integrations_service_1 = require("./integrations.service");
let IntegrationsModule = class IntegrationsModule {
};
IntegrationsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            resume_module_1.ResumeModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: async (req, _, cb) => {
                        const userId = req.user.id;
                        const destination = (0, path_1.join)(__dirname, `assets/integrations/${userId}`);
                        await (0, promises_1.mkdir)(destination, { recursive: true });
                        cb(null, destination);
                    },
                    filename: (_, file, cb) => {
                        const filename = new Date().getTime() + (0, path_1.extname)(file.originalname);
                        cb(null, filename);
                    },
                }),
            }),
        ],
        controllers: [integrations_controller_1.IntegrationsController],
        providers: [integrations_service_1.IntegrationsService],
    })
], IntegrationsModule);
exports.IntegrationsModule = IntegrationsModule;
//# sourceMappingURL=integrations.module.js.map