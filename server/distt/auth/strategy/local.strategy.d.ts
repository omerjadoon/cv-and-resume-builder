import { Strategy } from 'passport-local';
import { User } from '@/users/entities/user.entity';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(identifier: string, password: string): Promise<User>;
}
export {};
