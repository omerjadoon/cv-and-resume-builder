"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('mail', () => ({
    from: {
        name: process.env.MAIL_FROM_NAME,
        email: process.env.MAIL_FROM_EMAIL,
    },
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
}));
//# sourceMappingURL=mail.config.js.map