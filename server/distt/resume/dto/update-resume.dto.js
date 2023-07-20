"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateResumeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const resume_entity_1 = require("../entities/resume.entity");
class UpdateResumeDto extends (0, mapped_types_1.PartialType)(resume_entity_1.Resume) {
}
exports.UpdateResumeDto = UpdateResumeDto;
//# sourceMappingURL=update-resume.dto.js.map