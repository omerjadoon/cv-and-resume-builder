"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer_1 = require("nodemailer");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = (0, nodemailer_1.createTransport)({
            host: this.configService.get('mail.host'),
            port: this.configService.get('mail.port'),
            pool: true,
            secure: false,
            tls: { ciphers: 'SSLv3' },
            auth: {
                user: this.configService.get('mail.username'),
                pass: this.configService.get('mail.password'),
            },
        });
    }
    async sendEmail(sendMailDto) {
        this.transporter.sendMail({
            from: `${sendMailDto.from.name} <${sendMailDto.from.email}>`,
            to: `${sendMailDto.to.name} <${sendMailDto.to.email}>`,
            subject: sendMailDto.subject,
            text: sendMailDto.message,
            html: sendMailDto.message,
        });
    }
    async sendForgotPasswordEmail(user, resetToken) {
        const appUrl = this.configService.get('app.url');
        const url = `${appUrl}?modal=auth.reset&resetToken=${resetToken}`;
        const sendMailDto = {
            from: {
                name: this.configService.get('mail.from.name'),
                email: this.configService.get('mail.from.email'),
            },
            to: {
                name: user.name,
                email: user.email,
            },
            subject: 'Reset your Reactive Resume password',
            message: `<p>Hey ${user.name}!</p> <p>You can reset your password by visiting this link: <a href="${url}">${url}</a>.</p> <p>But hurry, because it will expire in 30 minutes.</p>`,
        };
        await this.sendEmail(sendMailDto);
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map