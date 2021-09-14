

export interface LogOptions {
    className?: string
    methodName?: string
    data?: object
}

export interface ErrorLogOptions extends LogOptions {
    error?: Error;
}