"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const joi_1 = __importDefault(require("joi"));
const app_config_1 = __importDefault(require("./app.config"));
const auth_config_1 = __importDefault(require("./auth.config"));
const cache_config_1 = __importDefault(require("./cache.config"));
const database_config_1 = __importDefault(require("./database.config"));
const google_config_1 = __importDefault(require("./google.config"));
const mail_config_1 = __importDefault(require("./mail.config"));
const storage_config_1 = __importDefault(require("./storage.config"));
const validationSchema = joi_1.default.object({
    TZ: joi_1.default.string().default('UTC'),
    PORT: joi_1.default.number().default(3100),
    VERSION: joi_1.default.string().required(),
    SECRET_KEY: joi_1.default.string().required(),
    NODE_ENV: joi_1.default.string().valid('development', 'production').default('development'),
    PUBLIC_URL: joi_1.default.string().default('http://localhost:3000'),
    PUBLIC_SERVER_URL: joi_1.default.string().default('http://localhost:3100'),
    POSTGRES_HOST: joi_1.default.string().required(),
    POSTGRES_PORT: joi_1.default.number().default(5432),
    POSTGRES_DB: joi_1.default.string().required(),
    POSTGRES_USER: joi_1.default.string().required(),
    POSTGRES_PASSWORD: joi_1.default.string().required(),
    POSTGRES_SSL_CERT: joi_1.default.string().allow(''),
    JWT_SECRET: joi_1.default.string().required(),
    JWT_EXPIRY_TIME: joi_1.default.number().required(),
    GOOGLE_API_KEY: joi_1.default.string().allow(''),
    GOOGLE_CLIENT_SECRET: joi_1.default.string().allow(''),
    PUBLIC_GOOGLE_CLIENT_ID: joi_1.default.string().allow(''),
    MAIL_FROM_NAME: joi_1.default.string().allow(''),
    MAIL_FROM_EMAIL: joi_1.default.string().allow(''),
    MAIL_HOST: joi_1.default.string().allow(''),
    MAIL_PORT: joi_1.default.string().allow(''),
    MAIL_USERNAME: joi_1.default.string().allow(''),
    MAIL_PASSWORD: joi_1.default.string().allow(''),
    STORAGE_BUCKET: joi_1.default.string().allow(''),
    STORAGE_REGION: joi_1.default.string().allow(''),
    STORAGE_ENDPOINT: joi_1.default.string().allow(''),
    STORAGE_URL_PREFIX: joi_1.default.string().allow(''),
    STORAGE_ACCESS_KEY: joi_1.default.string().allow(''),
    STORAGE_SECRET_KEY: joi_1.default.string().allow(''),
    PDF_DELETION_TIME: joi_1.default.number()
        .default(4 * 24 * 60 * 60 * 1000)
        .allow(''),
});
let ConfigModule = class ConfigModule {
};
ConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [app_config_1.default, auth_config_1.default, cache_config_1.default, database_config_1.default, google_config_1.default, mail_config_1.default, storage_config_1.default],
                validationSchema: validationSchema,
            }),
        ],
    })
], ConfigModule);
exports.ConfigModule = ConfigModule;
//# sourceMappingURL=config.module.js.map