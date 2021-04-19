"use strict";
/**
 * A custom type to specify the handler priority for internal framework handlers.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameworkEventHandlerPriority = void 0;
var FrameworkEventHandlerPriority;
(function (FrameworkEventHandlerPriority) {
    FrameworkEventHandlerPriority[FrameworkEventHandlerPriority["VERY_HIGH"] = 10] = "VERY_HIGH";
    FrameworkEventHandlerPriority[FrameworkEventHandlerPriority["HIGH"] = 20] = "HIGH";
    FrameworkEventHandlerPriority[FrameworkEventHandlerPriority["MEDIUM"] = 30] = "MEDIUM";
    FrameworkEventHandlerPriority[FrameworkEventHandlerPriority["LOW"] = 40] = "LOW";
    FrameworkEventHandlerPriority[FrameworkEventHandlerPriority["VERY_LOW"] = 50] = "VERY_LOW";
})(FrameworkEventHandlerPriority = exports.FrameworkEventHandlerPriority || (exports.FrameworkEventHandlerPriority = {}));
