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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeService = exports.SHORT_ID_LENGTH = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const promises_1 = __importDefault(require("fs/promises"));
const lodash_1 = require("lodash");
const nanoid_1 = require("nanoid");
const path_1 = require("path");
const typeorm_2 = require("typeorm");
const errorCodes_enum_1 = require("../database/errorCodes.enum");
const users_service_1 = require("../users/users.service");
const covers_1 = require("./data/covers");
const defaultState_1 = __importDefault(require("./data/defaultState"));
const sampleData_1 = __importDefault(require("./data/sampleData"));
const resume_entity_1 = require("./entities/resume.entity");
exports.SHORT_ID_LENGTH = 8;
let ResumeService = class ResumeService {
    constructor(resumeRepository, configService, usersService) {
        this.resumeRepository = resumeRepository;
        this.configService = configService;
        this.usersService = usersService;
        this.s3Enabled = !(0, lodash_1.isEmpty)(configService.get('storage.bucket'));
        if (this.s3Enabled) {
            this.s3Client = new client_s3_1.S3({
                endpoint: configService.get('storage.endpoint'),
                region: configService.get('storage.region'),
                credentials: {
                    accessKeyId: configService.get('storage.accessKey'),
                    secretAccessKey: configService.get('storage.secretKey'),
                },
            });
        }
    }
    async create(createResumeDto, userId) {
        try {
            const user = await this.usersService.findById(userId);
            const shortId = (0, nanoid_1.nanoid)(exports.SHORT_ID_LENGTH);
            const image = `/images/covers/${(0, lodash_1.sample)(covers_1.covers)}`;
            const resume = this.resumeRepository.create(Object.assign(Object.assign(Object.assign({}, defaultState_1.default), createResumeDto), { shortId,
                image,
                user, basics: Object.assign(Object.assign({}, defaultState_1.default.basics), { name: user.name }) }));
            return await this.resumeRepository.save(resume);
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === errorCodes_enum_1.PostgresErrorCode.UniqueViolation) {
                throw new common_1.HttpException('A resume with the same slug already exists, please enter a unique slug and try again.', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async import(importResumeDto, userId) {
        try {
            const user = await this.usersService.findById(userId);
            const shortId = (0, nanoid_1.nanoid)(exports.SHORT_ID_LENGTH);
            const image = `/images/covers/${(0, lodash_1.sample)(covers_1.covers)}`;
            const resume = this.resumeRepository.create(Object.assign(Object.assign(Object.assign({}, defaultState_1.default), importResumeDto), { shortId,
                image,
                user }));
            return this.resumeRepository.save(resume);
        }
        catch (_a) {
            throw new common_1.HttpException('Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    findAll() {
        return this.resumeRepository.find();
    }
    findAllByUser(userId) {
        return this.resumeRepository.find({ where: { user: { id: userId } } });
    }
    async findOne(id, userId) {
        const resume = await this.resumeRepository.findOne({ where: { id } });
        if (!resume) {
            throw new common_1.HttpException('The resume you are looking does not exist, or maybe never did?', common_1.HttpStatus.NOT_FOUND);
        }
        const isPrivate = !resume.public;
        const isNotOwner = resume.user.id !== userId;
        if (isPrivate && isNotOwner) {
            throw new common_1.HttpException('The resume you are looking does not exist, or maybe never did?', common_1.HttpStatus.NOT_FOUND);
        }
        return resume;
    }
    async findOneByShortId(shortId, userId, secretKey) {
        const resume = await this.resumeRepository.findOne({ where: { shortId } });
        if (!resume) {
            throw new common_1.HttpException('The resume you are looking does not exist, or maybe never did?', common_1.HttpStatus.NOT_FOUND);
        }
        const isPrivate = !resume.public;
        const isOwner = resume.user.id === userId;
        const isInternal = secretKey === this.configService.get('app.secretKey');
        if (!isInternal && isPrivate && !isOwner) {
            throw new common_1.HttpException('The resume you are looking does not exist, or maybe never did?', common_1.HttpStatus.NOT_FOUND);
        }
        return resume;
    }
    async findOneByIdentifier(username, slug, userId, secretKey) {
        const resume = await this.resumeRepository.findOne({ where: { user: { username }, slug } });
        if (!resume) {
            throw new common_1.HttpException('The resume you are looking does not exist, or maybe never did?', common_1.HttpStatus.NOT_FOUND);
        }
        const isPrivate = !resume.public;
        const isOwner = resume.user.id === userId;
        const isInternal = secretKey === this.configService.get('app.secretKey');
        if (!isInternal && isPrivate && !isOwner) {
            throw new common_1.HttpException('The resume you are looking does not exist, or maybe never did?', common_1.HttpStatus.NOT_FOUND);
        }
        return resume;
    }
    async update(id, updateResumeDto, userId) {
        const resume = await this.findOne(id, userId);
        const updatedResume = Object.assign(Object.assign({}, resume), updateResumeDto);
        return this.resumeRepository.save(updatedResume);
    }
    remove(id, userId) {
        return this.resumeRepository.delete({ id, user: { id: userId } });
    }
    removeAllByUser(userId) {
        return this.resumeRepository.delete({ user: { id: userId } });
    }
    async duplicate(id, userId) {
        try {
            const originalResume = await this.findOne(id, userId);
            const shortId = (0, nanoid_1.nanoid)(exports.SHORT_ID_LENGTH);
            const image = `/images/covers/${(0, lodash_1.sample)(covers_1.covers)}`;
            const duplicatedResume = Object.assign(Object.assign({}, (0, lodash_1.pick)(originalResume, ['name', 'slug', 'basics', 'metadata', 'sections', 'public'])), { name: `${originalResume.name} Copy`, slug: `${originalResume.slug}-copy`, shortId,
                image });
            const resume = this.resumeRepository.create(Object.assign(Object.assign({}, duplicatedResume), { user: { id: userId } }));
            return this.resumeRepository.save(resume);
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === errorCodes_enum_1.PostgresErrorCode.UniqueViolation) {
                throw new common_1.HttpException('A resume with the same slug already exists, please enter a unique slug and try again.', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async sample(id, userId) {
        const resume = await this.findOne(id, userId);
        const sampleResume = Object.assign(Object.assign({}, resume), sampleData_1.default);
        return this.resumeRepository.save(sampleResume);
    }
    async reset(id, userId) {
        const resume = await this.findOne(id, userId);
        const prevResume = (0, lodash_1.pick)(resume, ['id', 'shortId', 'name', 'slug', 'image', 'user', 'createdAt']);
        const nextResume = Object.assign(Object.assign({}, prevResume), defaultState_1.default);
        return this.resumeRepository.update(id, nextResume);
    }
    async uploadPhoto(id, userId, file) {
        const resume = await this.findOne(id, userId);
        const filename = new Date().getTime() + (0, path_1.extname)(file.originalname);
        let updatedResume = null;
        if (this.s3Enabled) {
            const urlPrefix = this.configService.get('storage.urlPrefix');
            const key = `uploads/${userId}/${id}/${filename}`;
            const publicUrl = urlPrefix + key;
            await this.s3Client.send(new client_s3_1.PutObjectCommand({
                Bucket: this.configService.get('storage.bucket'),
                Key: key,
                Body: file.buffer,
                ACL: 'public-read',
            }));
            updatedResume = (0, lodash_1.set)(resume, 'basics.photo.url', publicUrl);
        }
        else {
            const path = `${__dirname}/../assets/uploads/${userId}/${id}/`;
            const serverUrl = this.configService.get('app.serverUrl');
            try {
                await promises_1.default.mkdir(path, { recursive: true });
                await promises_1.default.writeFile(path + filename, file.buffer);
                updatedResume = (0, lodash_1.set)(resume, 'basics.photo.url', `${serverUrl}/assets/uploads/${userId}/${id}/` + filename);
            }
            catch (error) {
                throw new common_1.HttpException('Something went wrong. Please try again later, or raise an issue on GitHub if the problem persists.', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return this.resumeRepository.save(updatedResume);
    }
    async deletePhoto(id, userId) {
        const resume = await this.findOne(id, userId);
        const publicUrl = resume.basics.photo.url;
        if (this.s3Enabled) {
            const urlPrefix = this.configService.get('storage.urlPrefix');
            const key = publicUrl.replace(urlPrefix, '');
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand({
                Bucket: this.configService.get('storage.bucket'),
                Key: key,
            }));
        }
        else {
            const serverUrl = this.configService.get('app.serverUrl');
            const filePath = __dirname + '/..' + resume.basics.photo.url.replace(serverUrl, '');
            const isValidFile = (await promises_1.default.stat(filePath)).isFile();
            if (isValidFile) {
                await promises_1.default.unlink(filePath);
            }
        }
        const updatedResume = (0, lodash_1.set)(resume, 'basics.photo.url', '');
        return this.resumeRepository.save(updatedResume);
    }
};
ResumeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(resume_entity_1.Resume)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        config_1.ConfigService,
        users_service_1.UsersService])
], ResumeService);
exports.ResumeService = ResumeService;
//# sourceMappingURL=resume.service.js.map