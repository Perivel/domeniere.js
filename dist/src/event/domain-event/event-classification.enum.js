"use strict";
/**
 * An Enumeration outlining the possible default classifications for events.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventClassifications = void 0;
var EventClassifications;
(function (EventClassifications) {
    EventClassifications["InternalEvent"] = "framework.internal.general";
    EventClassifications["InternalError"] = "framework.internal.error";
    EventClassifications["Domain"] = "domain.general";
})(EventClassifications = exports.EventClassifications || (exports.EventClassifications = {}));
