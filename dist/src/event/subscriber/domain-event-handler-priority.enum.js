"use strict";
/**
 * A Custom type to specify the priority of a domain event handler.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEventHandlerPriority = void 0;
var DomainEventHandlerPriority;
(function (DomainEventHandlerPriority) {
    DomainEventHandlerPriority[DomainEventHandlerPriority["VERY_HIGH"] = 100] = "VERY_HIGH";
    DomainEventHandlerPriority[DomainEventHandlerPriority["HIGH"] = 200] = "HIGH";
    DomainEventHandlerPriority[DomainEventHandlerPriority["MEDIUM"] = 300] = "MEDIUM";
    DomainEventHandlerPriority[DomainEventHandlerPriority["LOW"] = 400] = "LOW";
    DomainEventHandlerPriority[DomainEventHandlerPriority["VERY_LOW"] = 500] = "VERY_LOW";
})(DomainEventHandlerPriority = exports.DomainEventHandlerPriority || (exports.DomainEventHandlerPriority = {}));
//# sourceMappingURL=domain-event-handler-priority.enum.js.map