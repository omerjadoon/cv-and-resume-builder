import { User as UserEntity } from '@/users/entities/user.entity';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { RegisterDto } from './dto/register.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    authenticate(user: UserEntity): UserEntity;
    loginWithGoogle(credential: string): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
    register(registerDto: RegisterDto): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
    login(user: UserEntity): Promise<{
        user: UserEntity;
        accessToken: string;
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<{
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
    remove(id: number): Promise<void>;
}
