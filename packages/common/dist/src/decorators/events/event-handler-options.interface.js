"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOptions = void 0;
const framework_1 = require("@domeniere/framework");
const core_1 = require("@swindle/core");
exports.defaultOptions = {
    priority: framework_1.DomainEventHandlerPriority.MEDIUM,
    label: core_1.UUID.V4().id(),
    stopPropogationOnError: false
};
//# sourceMappingURL=event-handler-options.interface.js.map