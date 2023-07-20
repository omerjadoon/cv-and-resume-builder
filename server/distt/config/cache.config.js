"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('cache', () => ({
    pdfDeletionTime: parseInt(process.env.PDF_DELETION_TIME, 10) || 4 * 24 * 60 * 60 * 1000,
}));
//# sourceMappingURL=cache.config.js.map