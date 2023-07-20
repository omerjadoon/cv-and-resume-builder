"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', () => ({
    timezone: process.env.TZ,
    version: process.env.VERSION,
    environment: process.env.NODE_ENV,
    secretKey: process.env.SECRET_KEY,
    port: parseInt(process.env.PORT, 10) || 3100,
    url: process.env.PUBLIC_URL || 'http://localhost:3000',
    serverUrl: process.env.PUBLIC_SERVER_URL || 'http://localhost:3100',
}));
//# sourceMappingURL=app.config.js.map