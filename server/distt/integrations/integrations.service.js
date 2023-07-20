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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationsService = void 0;
const common_1 = require("@nestjs/common");
const csvtojson_1 = __importDefault(require("csvtojson"));
const dayjs_1 = __importDefault(require("dayjs"));
const promises_1 = require("fs/promises");
const lodash_1 = require("lodash");
const node_stream_zip_1 = __importDefault(require("node-stream-zip"));
const uuid_1 = require("uuid");
const index_1 = require("../constants/index");
const defaultState_1 = __importDefault(require("../resume/data/defaultState"));
const resume_service_1 = require("../resume/resume.service");
let IntegrationsService = class IntegrationsService {
    constructor(resumeService) {
        this.resumeService = resumeService;
        this.parseDate = (date) => {
            return (0, lodash_1.isEmpty)(date) ? '' : (0, dayjs_1.default)(date).toISOString();
        };
    }
    async linkedIn(userId, path) {
        let archive;
        let isArchiveValid = false;
        try {
            archive = new node_stream_zip_1.default.async({ file: path });
            const resume = (0, lodash_1.cloneDeep)(defaultState_1.default);
            const timestamp = (0, dayjs_1.default)().format(index_1.FILENAME_TIMESTAMP);
            (0, lodash_1.merge)(resume, {
                name: `Imported from LinkedIn (${timestamp})`,
                slug: `imported-from-linkedin-${timestamp}`,
            });
            isArchiveValid = await archive.entries().then((entries) => Object.keys(entries).length > 0);
            try {
                const profileCSV = (await archive.entryData('Profile.csv')).toString();
                const profile = (await (0, csvtojson_1.default)().fromString(profileCSV))[0];
                (0, lodash_1.merge)(resume, {
                    basics: {
                        name: `${(0, lodash_1.get)(profile, 'First Name')} ${(0, lodash_1.get)(profile, 'Last Name')}`,
                        headline: (0, lodash_1.get)(profile, 'Headline'),
                        location: {
                            address: (0, lodash_1.get)(profile, 'Address'),
                            postalCode: (0, lodash_1.get)(profile, 'Zip Code'),
                        },
                        summary: (0, lodash_1.get)(profile, 'Summary'),
                    },
                });
            }
            catch (_a) {
            }
            try {
                const emailsCSV = (await archive.entryData('Email Addresses.csv')).toString();
                const email = (await (0, csvtojson_1.default)().fromString(emailsCSV))[0];
                (0, lodash_1.merge)(resume, {
                    basics: {
                        email: (0, lodash_1.get)(email, 'Email Address'),
                    },
                });
            }
            catch (_b) {
            }
            try {
                const phoneNumbersCSV = (await archive.entryData('PhoneNumbers.csv')).toString();
                const phoneNumber = (await (0, csvtojson_1.default)().fromString(phoneNumbersCSV))[0];
                (0, lodash_1.merge)(resume, {
                    basics: {
                        phone: (0, lodash_1.get)(phoneNumber, 'Number'),
                    },
                });
            }
            catch (_c) {
            }
            try {
                const educationCSV = (await archive.entryData('Education.csv')).toString();
                const education = await (0, csvtojson_1.default)().fromString(educationCSV);
                education.forEach((school) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            education: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.education.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        institution: (0, lodash_1.get)(school, 'School Name'),
                                        degree: (0, lodash_1.get)(school, 'Degree Name'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(school, 'Start Date')),
                                            end: this.parseDate((0, lodash_1.get)(school, 'End Date')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_d) {
            }
            try {
                const positionsCSV = (await archive.entryData('Positions.csv')).toString();
                const positions = await (0, csvtojson_1.default)().fromString(positionsCSV);
                positions.forEach((position) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            work: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.work.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(position, 'Company Name'),
                                        position: (0, lodash_1.get)(position, 'Title'),
                                        summary: (0, lodash_1.get)(position, 'Description'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(position, 'Started On')),
                                            end: this.parseDate((0, lodash_1.get)(position, 'Finished On')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_e) {
            }
            try {
                const certificationsCSV = (await archive.entryData('Certifications.csv')).toString();
                const certifications = await (0, csvtojson_1.default)().fromString(certificationsCSV);
                certifications.forEach((certification) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            certifications: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.certifications.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(certification, 'Name'),
                                        issuer: (0, lodash_1.get)(certification, 'Authority'),
                                        url: (0, lodash_1.get)(certification, 'Url'),
                                        date: this.parseDate((0, lodash_1.get)(certification, 'Started On')),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_f) {
            }
            try {
                const languagesCSV = (await archive.entryData('Languages.csv')).toString();
                const languages = await (0, csvtojson_1.default)().fromString(languagesCSV);
                languages.forEach((language) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            languages: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.languages.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(language, 'Name'),
                                        level: 'Beginner',
                                        levelNum: 5,
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_g) {
            }
            try {
                const projectsCSV = (await archive.entryData('Projects.csv')).toString();
                const projects = await (0, csvtojson_1.default)().fromString(projectsCSV);
                projects.forEach((project) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            projects: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.projects.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(project, 'Title'),
                                        description: (0, lodash_1.get)(project, 'Description'),
                                        url: (0, lodash_1.get)(project, 'Url'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(project, 'Started On')),
                                            end: this.parseDate((0, lodash_1.get)(project, 'Finished On')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_h) {
            }
            try {
                const skillsCSV = (await archive.entryData('Skills.csv')).toString();
                const skills = await (0, csvtojson_1.default)().fromString(skillsCSV);
                skills.forEach((skill) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            skills: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.skills.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(skill, 'Name'),
                                        level: 'Beginner',
                                        levelNum: 5,
                                        keywords: [],
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_j) {
            }
            return this.resumeService.import(resume, userId);
        }
        catch (_k) {
            throw new common_1.HttpException('You must upload a valid zip archive downloaded from LinkedIn.', common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await (0, promises_1.unlink)(path);
            isArchiveValid && archive.close();
        }
    }
    async jsonResume(userId, path) {
        try {
            const jsonResume = JSON.parse(await (0, promises_1.readFile)(path, 'utf8'));
            const resume = (0, lodash_1.cloneDeep)(defaultState_1.default);
            const timestamp = (0, dayjs_1.default)().format(index_1.FILENAME_TIMESTAMP);
            (0, lodash_1.merge)(resume, {
                name: `Imported from JSON Resume (${timestamp})`,
                slug: `imported-from-json-resume-${timestamp}`,
            });
            try {
                (0, lodash_1.merge)(resume, {
                    basics: {
                        name: (0, lodash_1.get)(jsonResume, 'basics.name'),
                        headline: (0, lodash_1.get)(jsonResume, 'basics.label'),
                        photo: {
                            url: (0, lodash_1.get)(jsonResume, 'basics.image'),
                        },
                        email: (0, lodash_1.get)(jsonResume, 'basics.email'),
                        phone: (0, lodash_1.get)(jsonResume, 'basics.phone'),
                        website: (0, lodash_1.get)(jsonResume, 'basics.url'),
                        summary: (0, lodash_1.get)(jsonResume, 'basics.summary'),
                        location: {
                            address: (0, lodash_1.get)(jsonResume, 'basics.location.address'),
                            postalCode: (0, lodash_1.get)(jsonResume, 'basics.location.postalCode'),
                            city: (0, lodash_1.get)(jsonResume, 'basics.location.city'),
                            country: (0, lodash_1.get)(jsonResume, 'basics.location.countryCode'),
                            region: (0, lodash_1.get)(jsonResume, 'basics.location.region'),
                        },
                    },
                });
            }
            catch (_a) {
            }
            try {
                const profiles = (0, lodash_1.get)(jsonResume, 'basics.profiles', []);
                profiles.forEach((profile) => {
                    (0, lodash_1.merge)(resume, {
                        basics: {
                            profiles: [
                                ...resume.basics.profiles,
                                {
                                    id: (0, uuid_1.v4)(),
                                    url: (0, lodash_1.get)(profile, 'url'),
                                    network: (0, lodash_1.get)(profile, 'network'),
                                    username: (0, lodash_1.get)(profile, 'username'),
                                },
                            ],
                        },
                    });
                });
            }
            catch (_b) {
            }
            try {
                const work = (0, lodash_1.get)(jsonResume, 'work', []);
                work.forEach((item) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            work: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.work.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(item, 'name'),
                                        position: (0, lodash_1.get)(item, 'position'),
                                        summary: (0, lodash_1.get)(item, 'summary'),
                                        url: (0, lodash_1.get)(item, 'url'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(item, 'startDate')),
                                            end: this.parseDate((0, lodash_1.get)(item, 'endDate')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_c) {
            }
            try {
                const volunteer = (0, lodash_1.get)(jsonResume, 'volunteer', []);
                volunteer.forEach((item) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            volunteer: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.volunteer.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        organization: (0, lodash_1.get)(item, 'organization'),
                                        position: (0, lodash_1.get)(item, 'position'),
                                        summary: (0, lodash_1.get)(item, 'summary'),
                                        url: (0, lodash_1.get)(item, 'url'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(item, 'startDate')),
                                            end: this.parseDate((0, lodash_1.get)(item, 'endDate')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_d) {
            }
            try {
                const education = (0, lodash_1.get)(jsonResume, 'education', []);
                education.forEach((item) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            education: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.education.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        institution: (0, lodash_1.get)(item, 'institution'),
                                        degree: (0, lodash_1.get)(item, 'studyType'),
                                        score: (0, lodash_1.get)(item, 'score'),
                                        area: (0, lodash_1.get)(item, 'area'),
                                        url: (0, lodash_1.get)(item, 'url'),
                                        courses: (0, lodash_1.get)(item, 'courses', []),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(item, 'startDate')),
                                            end: this.parseDate((0, lodash_1.get)(item, 'endDate')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_e) {
            }
            try {
                const awards = (0, lodash_1.get)(jsonResume, 'awards', []);
                awards.forEach((award) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            awards: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.awards.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        title: (0, lodash_1.get)(award, 'title'),
                                        awarder: (0, lodash_1.get)(award, 'awarder'),
                                        summary: (0, lodash_1.get)(award, 'summary'),
                                        url: (0, lodash_1.get)(award, 'url'),
                                        date: this.parseDate((0, lodash_1.get)(award, 'date')),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_f) {
            }
            try {
                const publications = (0, lodash_1.get)(jsonResume, 'publications', []);
                publications.forEach((publication) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            publications: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.publications.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(publication, 'name'),
                                        publisher: (0, lodash_1.get)(publication, 'publisher'),
                                        summary: (0, lodash_1.get)(publication, 'summary'),
                                        url: (0, lodash_1.get)(publication, 'url'),
                                        date: this.parseDate((0, lodash_1.get)(publication, 'releaseDate')),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_g) {
            }
            try {
                const skills = (0, lodash_1.get)(jsonResume, 'skills', []);
                skills.forEach((skill) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            skills: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.skills.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(skill, 'name'),
                                        level: (0, lodash_1.get)(skill, 'level'),
                                        levelNum: 5,
                                        keywords: (0, lodash_1.get)(skill, 'keywords', []),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_h) {
            }
            try {
                const languages = (0, lodash_1.get)(jsonResume, 'languages', []);
                languages.forEach((language) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            languages: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.languages.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(language, 'language'),
                                        level: (0, lodash_1.get)(language, 'fluency'),
                                        levelNum: 5,
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_j) {
            }
            try {
                const interests = (0, lodash_1.get)(jsonResume, 'interests', []);
                interests.forEach((interest) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            interests: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.interests.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(interest, 'name'),
                                        keywords: (0, lodash_1.get)(interest, 'keywords', []),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_k) {
            }
            try {
                const references = (0, lodash_1.get)(jsonResume, 'references', []);
                references.forEach((reference) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            references: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.references.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(reference, 'name'),
                                        relationship: (0, lodash_1.get)(reference, 'reference'),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_l) {
            }
            try {
                const projects = (0, lodash_1.get)(jsonResume, 'projects', []);
                projects.forEach((project) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            projects: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.projects.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(project, 'name'),
                                        description: (0, lodash_1.get)(project, 'description'),
                                        summary: (0, lodash_1.get)(project, 'highlights', []).join(', '),
                                        keywords: (0, lodash_1.get)(project, 'keywords'),
                                        url: (0, lodash_1.get)(project, 'url'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(project, 'startDate')),
                                            end: this.parseDate((0, lodash_1.get)(project, 'endDate')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_m) {
            }
            return this.resumeService.import(resume, userId);
        }
        catch (_o) {
            throw new common_1.HttpException('You must upload a valid JSON Resume file.', common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await (0, promises_1.unlink)(path);
        }
    }
    async reactiveResume(userId, path) {
        try {
            const jsonResume = JSON.parse(await (0, promises_1.readFile)(path, 'utf8'));
            const resume = (0, lodash_1.cloneDeep)(jsonResume);
            const timestamp = (0, dayjs_1.default)().format(index_1.FILENAME_TIMESTAMP);
            (0, lodash_1.merge)(resume, {
                name: `Imported from Reactive Resume (${timestamp})`,
                slug: `imported-from-reactive-resume-${timestamp}`,
            });
            return this.resumeService.import(resume, userId);
        }
        catch (_a) {
            throw new common_1.HttpException('You must upload a valid JSON Resume file.', common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await (0, promises_1.unlink)(path);
        }
    }
    async reactiveResumeV2(userId, path) {
        try {
            const jsonResume = JSON.parse(await (0, promises_1.readFile)(path, 'utf8'));
            const resume = (0, lodash_1.cloneDeep)(defaultState_1.default);
            const timestamp = (0, dayjs_1.default)().format(index_1.FILENAME_TIMESTAMP);
            (0, lodash_1.merge)(resume, {
                name: `Imported from Reactive Resume V2 (${timestamp})`,
                slug: `imported-from-reactive-resume-v2-${timestamp}`,
            });
            try {
                (0, lodash_1.merge)(resume, {
                    basics: {
                        name: (0, lodash_1.get)(jsonResume, 'profile.firstName') + ' ' + (0, lodash_1.get)(jsonResume, 'profile.lastName'),
                        headline: (0, lodash_1.get)(jsonResume, 'profile.subtitle'),
                        photo: {
                            url: (0, lodash_1.get)(jsonResume, 'profile.photograph'),
                        },
                        email: (0, lodash_1.get)(jsonResume, 'profile.email'),
                        phone: (0, lodash_1.get)(jsonResume, 'profile.phone'),
                        website: (0, lodash_1.get)(jsonResume, 'profile.website'),
                        summary: (0, lodash_1.get)(jsonResume, 'objective'),
                        location: {
                            address: (0, lodash_1.get)(jsonResume, 'profile.address.line1'),
                            postalCode: (0, lodash_1.get)(jsonResume, 'profile.address.pincode'),
                            city: (0, lodash_1.get)(jsonResume, 'profile.address.city'),
                        },
                    },
                });
            }
            catch (_a) {
            }
            try {
                const profiles = (0, lodash_1.get)(jsonResume, 'social.items', []);
                profiles.forEach((profile) => {
                    (0, lodash_1.merge)(resume, {
                        basics: {
                            profiles: [
                                ...resume.basics.profiles,
                                {
                                    id: (0, uuid_1.v4)(),
                                    url: (0, lodash_1.get)(profile, 'url'),
                                    network: (0, lodash_1.get)(profile, 'network'),
                                    username: (0, lodash_1.get)(profile, 'username'),
                                },
                            ],
                        },
                    });
                });
            }
            catch (_b) {
            }
            try {
                const work = (0, lodash_1.get)(jsonResume, 'work.items', []);
                work.forEach((item) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            work: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.work.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(item, 'company'),
                                        position: (0, lodash_1.get)(item, 'position'),
                                        summary: (0, lodash_1.get)(item, 'summary'),
                                        url: (0, lodash_1.get)(item, 'website'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(item, 'startDate')),
                                            end: this.parseDate((0, lodash_1.get)(item, 'endDate')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_c) {
            }
            try {
                const education = (0, lodash_1.get)(jsonResume, 'education.items', []);
                education.forEach((item) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            education: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.education.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        institution: (0, lodash_1.get)(item, 'institution'),
                                        degree: (0, lodash_1.get)(item, 'studyType'),
                                        url: (0, lodash_1.get)(item, 'url'),
                                        score: (0, lodash_1.get)(item, 'gpa'),
                                        area: (0, lodash_1.get)(item, 'field'),
                                        summary: (0, lodash_1.get)(item, 'summary'),
                                        courses: (0, lodash_1.get)(item, 'courses', []),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(item, 'startDate')),
                                            end: this.parseDate((0, lodash_1.get)(item, 'endDate')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_d) {
            }
            try {
                const awards = (0, lodash_1.get)(jsonResume, 'awards.items', []);
                awards.forEach((award) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            awards: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.awards.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        title: (0, lodash_1.get)(award, 'title'),
                                        awarder: (0, lodash_1.get)(award, 'awarder'),
                                        summary: (0, lodash_1.get)(award, 'summary'),
                                        date: this.parseDate((0, lodash_1.get)(award, 'date')),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_e) {
            }
            try {
                const certifications = (0, lodash_1.get)(jsonResume, 'certifications.items', []);
                certifications.forEach((certificate) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            certifications: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.certifications.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(certificate, 'title'),
                                        issuer: (0, lodash_1.get)(certificate, 'issuer'),
                                        summary: (0, lodash_1.get)(certificate, 'summary'),
                                        date: this.parseDate((0, lodash_1.get)(certificate, 'date')),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_f) {
            }
            try {
                const skills = (0, lodash_1.get)(jsonResume, 'skills.items', []);
                skills.forEach((skill) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            skills: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.skills.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(skill, 'name'),
                                        level: (0, lodash_1.get)(skill, 'level'),
                                        levelNum: 5,
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_g) {
            }
            try {
                const languages = (0, lodash_1.get)(jsonResume, 'languages.items', []);
                languages.forEach((language) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            languages: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.languages.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(language, 'name'),
                                        level: (0, lodash_1.get)(language, 'fluency'),
                                        levelNum: 5,
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_h) {
            }
            try {
                const hobbies = (0, lodash_1.get)(jsonResume, 'hobbies.items', []);
                hobbies.forEach((hobby) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            interests: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.interests.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(hobby, 'name'),
                                        keywords: (0, lodash_1.get)(hobby, 'keywords', []),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_j) {
            }
            try {
                const references = (0, lodash_1.get)(jsonResume, 'references.items', []);
                references.forEach((reference) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            references: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.references.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(reference, 'name'),
                                        relationship: (0, lodash_1.get)(reference, 'position'),
                                        phone: (0, lodash_1.get)(reference, 'phone'),
                                        email: (0, lodash_1.get)(reference, 'email'),
                                        summary: (0, lodash_1.get)(reference, 'summary'),
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_k) {
            }
            try {
                const projects = (0, lodash_1.get)(jsonResume, 'projects.items', []);
                projects.forEach((project) => {
                    (0, lodash_1.merge)(resume, {
                        sections: {
                            projects: {
                                items: [
                                    ...(0, lodash_1.get)(resume, 'sections.projects.items', []),
                                    {
                                        id: (0, uuid_1.v4)(),
                                        name: (0, lodash_1.get)(project, 'title'),
                                        summary: (0, lodash_1.get)(project, 'summary'),
                                        keywords: (0, lodash_1.get)(project, 'keywords'),
                                        url: (0, lodash_1.get)(project, 'link'),
                                        date: {
                                            start: this.parseDate((0, lodash_1.get)(project, 'startDate')),
                                        },
                                    },
                                ],
                            },
                        },
                    });
                });
            }
            catch (_l) {
            }
            const template = (0, lodash_1.get)(jsonResume, 'metadata.template');
            const templateWhitelist = ['onyx', 'pikachu', 'gengar', 'castform', 'glalie'];
            (0, lodash_1.merge)(resume, {
                metadata: Object.assign(Object.assign({}, (0, lodash_1.get)(resume, 'metadata')), { typography: {
                        family: {
                            heading: (0, lodash_1.get)(jsonResume, 'metadata.font'),
                            body: (0, lodash_1.get)(jsonResume, 'metadata.font'),
                        },
                        size: {
                            heading: (0, lodash_1.get)(jsonResume, 'metadata.fontSize'),
                            body: (0, lodash_1.get)(jsonResume, 'metadata.fontSize'),
                        },
                    }, page: {
                        format: 'A4',
                    }, theme: {
                        background: (0, lodash_1.get)(jsonResume, 'metadata.colors.background'),
                        primary: (0, lodash_1.get)(jsonResume, 'metadata.colors.primary'),
                        text: (0, lodash_1.get)(jsonResume, 'metadata.colors.text'),
                    }, locale: (0, lodash_1.get)(jsonResume, 'metadata.language'), template: templateWhitelist.includes(template) ? template : 'kakuna' }),
            });
            return this.resumeService.import(resume, userId);
        }
        catch (_m) {
            throw new common_1.HttpException('You must upload a valid JSON Resume file.', common_1.HttpStatus.BAD_REQUEST);
        }
        finally {
            await (0, promises_1.unlink)(path);
        }
    }
};
IntegrationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [resume_service_1.ResumeService])
], IntegrationsService);
exports.IntegrationsService = IntegrationsService;
//# sourceMappingURL=integrations.service.js.map