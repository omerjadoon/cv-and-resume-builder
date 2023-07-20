import { ConfigService } from '@nestjs/config';
import { Transporter } from 'nodemailer';
import { User } from '@/users/entities/user.entity';
import { SendMailDto } from './dto/send-mail.dto';
export declare class MailService {
    private configService;
    transporter: Transporter;
    constructor(configService: ConfigService);
    sendEmail(sendMailDto: SendMailDto): Promise<void>;
    sendForgotPasswordEmail(user: User, resetToken: string): Promise<void>;
}
