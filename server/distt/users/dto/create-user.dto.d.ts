export declare class CreateUserDto {
    name: string;
    username: string;
    email: string;
    password: string;
    provider: 'email';
    resetToken?: string;
}
