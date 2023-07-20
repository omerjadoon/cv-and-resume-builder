export declare class MailRecipient {
    name: string;
    email: string;
}
export declare class SendMailDto {
    from: MailRecipient;
    to: MailRecipient;
    subject: string;
    message: string;
}
