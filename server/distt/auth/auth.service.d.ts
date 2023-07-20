import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SchedulerRegistry } from '@nestjs/schedule';
import { User } from '@/users/entities/user.entity';
import { UsersService } from '@/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthService {
    private schedulerRegistry;
    private configService;
    private usersService;
    private jwtService;
    constructor(schedulerRegistry: SchedulerRegistry, configService: ConfigService, usersService: UsersService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<User>;
    verifyPassword(password: string, hashedPassword: string): Promise<void>;
    getUser(identifier: string, password: string): Promise<User>;
    updateProfile(id: number, newData: UpdateProfileDto): Promise<{
        name: string;
        username: string;
        email: string;
        password?: string;
        provider: "email" | "google";
        resetToken?: string;
        id: number;
        resumes: import("../resume/entities/resume.entity").Resume[];
        scraplist: import("../scrap/entities/scrap.entity").Scrap[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    removeUser(id: number): Promise<void>;
    getAccessToken(id: number): string;
    getUserFromAccessToken(accessToken: string): Promise<User>;
    authenticateWithGoogle(credential: string): Promise<User>;
}
