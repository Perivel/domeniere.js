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
// events well
__exportStar(require("./on-any.decorator"), exports);
__exportStar(require("./on-error.decorator"), exports);
__exportStar(require("./on-internal.decorator"), exports);
__exportStar(require("./on.decorator"), exports);
__exportStar(require("./event-handler-options.interface"), exports);
//# sourceMappingURL=events.well.js.map