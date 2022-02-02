"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// the domain module.
__exportStar(require("./domain/domain"), exports);
__exportStar(require("./exceptions/domain.exception"), exports);
__exportStar(require("./exceptions/duplicate-service-registration.exception"), exports);
__exportStar(require("./exceptions/service-not-found.exception"), exports);
//# sourceMappingURL=domain.module.js.map