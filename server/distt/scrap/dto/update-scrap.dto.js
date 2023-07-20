"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScrapDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_scrap_dto_1 = require("./create-scrap.dto");
class UpdateScrapDto extends (0, mapped_types_1.PartialType)(create_scrap_dto_1.CreateScrapDto) {
}
exports.UpdateScrapDto = UpdateScrapDto;
//# sourceMappingURL=update-scrap.dto.js.map