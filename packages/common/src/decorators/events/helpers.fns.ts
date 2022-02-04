import { EventHandlerOptions, defaultOptions } from './event-handler-options.interface';

/**
 * mergeOptions()
 * 
 * merges the default options with the provided options.
 * @param provided the provided options object.
 * @returns the merged options.
 */

export const mergeOptions = (provided?: EventHandlerOptions): EventHandlerOptions => {
    if (provided) {
        return {
            priority: provided.priority ? provided.priority : defaultOptions.priority,
            label: provided.label ? provided.label : defaultOptions.label,
            stopPropogationOnError: provided.stopPropogationOnError ? provided.stopPropogationOnError : defaultOptions.stopPropogationOnError
        }
    }
    else {
        return defaultOptions;
    }
}
