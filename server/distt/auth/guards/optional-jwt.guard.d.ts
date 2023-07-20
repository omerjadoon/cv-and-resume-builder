import { User } from '@/users/entities/user.entity';
declare const OptionalJwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class OptionalJwtAuthGuard extends OptionalJwtAuthGuard_base {
    handleRequest<TUser = User>(err: Error, user: TUser): TUser;
}
export {};
