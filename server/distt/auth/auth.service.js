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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const schedule_1 = require("@nestjs/schedule");
const bcryptjs_1 = require("bcryptjs");
const google_auth_library_1 = require("google-auth-library");
const errorCodes_enum_1 = require("../database/errorCodes.enum");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(schedulerRegistry, configService, usersService, jwtService) {
        this.schedulerRegistry = schedulerRegistry;
        this.configService = configService;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const password = (0, bcryptjs_1.hashSync)(registerDto.password);
        try {
            const createdUser = await this.usersService.create(Object.assign(Object.assign({}, registerDto), { password, provider: 'email' }));
            return createdUser;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === errorCodes_enum_1.PostgresErrorCode.UniqueViolation) {
                throw new common_1.HttpException('A user with that username and/or email already exists.', common_1.HttpStatus.UNAUTHORIZED);
            }
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verifyPassword(password, hashedPassword) {
        const isPasswordMatching = (0, bcryptjs_1.compareSync)(password, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('The username/email and password combination provided was incorrect.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getUser(identifier, password) {
        try {
            const user = await this.usersService.findByIdentifier(identifier);
            await this.verifyPassword(password, user.password);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('The username/email and password combination provided was incorrect.', common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    updateProfile(id, newData) {
        return this.usersService.update(id, { name: newData.name });
    }
    forgotPassword(email) {
        return this.usersService.generateResetToken(email);
    }
    async resetPassword(resetPasswordDto) {
        const user = await this.usersService.findByResetToken(resetPasswordDto.resetToken);
        const password = (0, bcryptjs_1.hashSync)(resetPasswordDto.password);
        await this.usersService.update(user.id, {
            password,
            resetToken: null,
        });
        try {
            this.schedulerRegistry.deleteTimeout(`clear-resetToken-${user.id}`);
        }
        catch (_a) {
        }
    }
    removeUser(id) {
        return this.usersService.remove(id);
    }
    getAccessToken(id) {
        const expiresIn = this.configService.get('auth.jwtExpiryTime');
        return this.jwtService.sign({ id }, { expiresIn });
    }
    getUserFromAccessToken(accessToken) {
        const payload = this.jwtService.verify(accessToken, {
            secret: this.configService.get('auth.jwtSecret'),
        });
        return this.usersService.findById(payload.id);
    }
    async authenticateWithGoogle(credential) {
        const clientID = this.configService.get('google.clientID');
        const clientSecret = this.configService.get('google.clientSecret');
        const OAuthClient = new google_auth_library_1.OAuth2Client(clientID, clientSecret);
        const client = await OAuthClient.verifyIdToken({ idToken: credential });
        const userPayload = client.getPayload();
        try {
            const user = await this.usersService.findByEmail(userPayload.email);
            return user;
        }
        catch (error) {
            if (error.status !== common_1.HttpStatus.NOT_FOUND) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_GATEWAY);
            }
            const username = userPayload.email.split('@')[0];
            const createUserDto = {
                name: `${userPayload.given_name} ${userPayload.family_name}`,
                username,
                email: userPayload.email,
                provider: 'google',
            };
            return this.usersService.create(createUserDto);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [schedule_1.SchedulerRegistry,
        config_1.ConfigService,
        users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map