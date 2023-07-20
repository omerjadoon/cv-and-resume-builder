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
exports.CreateResumeDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CreateResumeDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_transformer_1.Transform)(({ value }) => value.toLowerCase().replace(/[ ]/gi, '-')),
    (0, class_validator_1.Matches)(/^[a-z0-9-]+$/, {
        message: 'slug must contain only lowercase characters, numbers and hyphens',
    }),
    __metadata("design:type", String)
], CreateResumeDto.prototype, "slug", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateResumeDto.prototype, "public", void 0);
exports.CreateResumeDto = CreateResumeDto;
//# sourceMappingURL=create-resume.dto.js.map