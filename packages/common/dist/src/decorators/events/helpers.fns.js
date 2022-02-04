"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeOptions = void 0;
const event_handler_options_interface_1 = require("./event-handler-options.interface");
/**
 * mergeOptions()
 *
 * merges the default options with the provided options.
 * @param provided the provided options object.
 * @returns the merged options.
 */
const mergeOptions = (provided) => {
    if (provided) {
        return {
            priority: provided.priority ? provided.priority : event_handler_options_interface_1.defaultOptions.priority,
            label: provided.label ? provided.label : event_handler_options_interface_1.defaultOptions.label,
            stopPropogationOnError: provided.stopPropogationOnError ? provided.stopPropogationOnError : event_handler_options_interface_1.defaultOptions.stopPropogationOnError
        };
    }
    else {
        return event_handler_options_interface_1.defaultOptions;
    }
};
exports.mergeOptions = mergeOptions;
//# sourceMappingURL=helpers.fns.js.map