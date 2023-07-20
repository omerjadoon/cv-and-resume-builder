"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const auth_module_1 = require("./auth/auth.module");
const config_module_1 = require("./config/config.module");
const database_module_1 = require("./database/database.module");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const fonts_module_1 = require("./fonts/fonts.module");
const health_module_1 = require("./health/health.module");
const integrations_module_1 = require("./integrations/integrations.module");
const mail_module_1 = require("./mail/mail.module");
const printer_module_1 = require("./printer/printer.module");
const resume_module_1 = require("./resume/resume.module");
const users_module_1 = require("./users/users.module");
const scrap_module_1 = require("./scrap/scrap.module");
let AppModule = AppModule_1 = class AppModule {
};
AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: '/assets',
                rootPath: (0, path_1.join)(__dirname, 'assets'),
            }),
            config_module_1.ConfigModule,
            database_module_1.DatabaseModule,
            schedule_1.ScheduleModule.forRoot(),
            AppModule_1,
            auth_module_1.AuthModule,
            mail_module_1.MailModule.register(),
            users_module_1.UsersModule,
            resume_module_1.ResumeModule,
            fonts_module_1.FontsModule,
            integrations_module_1.IntegrationsModule,
            printer_module_1.PrinterModule,
            health_module_1.HealthModule,
            scrap_module_1.ScrapModule,
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map