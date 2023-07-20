"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('google', () => ({
    apiKey: process.env.GOOGLE_API_KEY,
    clientId: process.env.PUBLIC_GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}));
//# sourceMappingURL=google.config.js.map