"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookie = void 0;
const common_1 = require("@nestjs/common");
exports.Cookie = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    const request = ctx.switchToHttp().getRequest();
    return data ? (_a = request.cookies) === null || _a === void 0 ? void 0 : _a[data] : request.cookies;
});
//# sourceMappingURL=cookie.decorator.js.map