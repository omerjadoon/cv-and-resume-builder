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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = exports.DELETION_TIME = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const crypto_1 = require("crypto");
const typeorm_2 = require("typeorm");
const mail_service_1 = require("../mail/mail.service");
const user_entity_1 = require("./entities/user.entity");
exports.DELETION_TIME = 30 * 60 * 1000;
let UsersService = class UsersService {
    constructor(userRepository, schedulerRegistry, mailService, dataSource) {
        this.userRepository = userRepository;
        this.schedulerRegistry = schedulerRegistry;
        this.mailService = mailService;
        this.dataSource = dataSource;
    }
    async findById(id) {
        const user = await this.userRepository.findOne({ where: { id } });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('A user with this username/email does not exist.', common_1.HttpStatus.NOT_FOUND);
    }
    async findByEmail(email) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('A user with this email does not exist.', common_1.HttpStatus.NOT_FOUND);
    }
    async findByIdentifier(identifier) {
        const user = await this.userRepository.findOne({
            where: [{ username: identifier }, { email: identifier }],
        });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('A user with this username/email does not exist.', common_1.HttpStatus.NOT_FOUND);
    }
    async findByResetToken(resetToken) {
        const user = await this.userRepository.findOne({ where: { resetToken } });
        if (user) {
            return user;
        }
        throw new common_1.HttpException('The reset token provided may be invalid or expired.', common_1.HttpStatus.NOT_FOUND);
    }
    async create(createUserDto) {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findById(id);
        const updatedUser = Object.assign(Object.assign({}, user), updateUserDto);
        await this.userRepository.save(updatedUser);
        return updatedUser;
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
    async generateResetToken(email) {
        try {
            const user = await this.findByEmail(email);
            const resetToken = (0, crypto_1.randomBytes)(32).toString('hex');
            const queryRunner = this.dataSource.createQueryRunner();
            const timeout = setTimeout(async () => {
                await this.userRepository.update(user.id, { resetToken: null });
            }, exports.DELETION_TIME);
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                await queryRunner.manager.update(user_entity_1.User, user.id, { resetToken });
                this.schedulerRegistry.addTimeout(`clear-resetToken-${user.id}`, timeout);
                await this.mailService.sendForgotPasswordEmail(user, resetToken);
                await queryRunner.commitTransaction();
            }
            catch (_a) {
                await queryRunner.rollbackTransaction();
                throw new common_1.HttpException('Please wait at least 30 minutes before resetting your password again.', common_1.HttpStatus.TOO_MANY_REQUESTS);
            }
            finally {
                await queryRunner.release();
            }
        }
        catch (_b) {
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        schedule_1.SchedulerRegistry,
        mail_service_1.MailService,
        typeorm_2.DataSource])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map