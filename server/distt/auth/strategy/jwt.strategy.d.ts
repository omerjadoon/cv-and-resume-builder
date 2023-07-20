import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate({ id }: User): Promise<User>;
}
export {};
