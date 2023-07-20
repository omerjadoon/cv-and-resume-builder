"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app_module_1 = require("./app.module");
const bootstrap = async () => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const appUrl = configService.get('app.url');
    app.enableCors({ origin: [appUrl], credentials: true });
    app.enableShutdownHooks();
    app.use((0, cookie_parser_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    const port = configService.get('app.port');
    await app.listen(port);
    common_1.Logger.log(`🚀 Server is up and running!`);
};
bootstrap();
//# sourceMappingURL=main.js.map