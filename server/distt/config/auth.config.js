"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('auth', () => ({
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiryTime: parseInt(process.env.JWT_EXPIRY_TIME, 10),
}));
//# sourceMappingURL=auth.config.js.map