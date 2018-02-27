/**
 * Enumeration of available log levels
 */
export declare const enum LogLevel {
    INFO = 0,
    DEBUG = 1,
    WARNING = 2,
    ERROR = 3,
    VERBOSE = 4,
}
export declare class LogService {
    /**
     * Logs a message to the console
     * @param   message The message to log
     * @param   level   The level to log the message under
     * @returns         The formatted message sent to the console
     */
    log(message: string, level?: number): string;
    /**
     * Logs a message to the console at the INFO level
     * @param   message The message to log
     * @returns         The formatted message sent to the console
     */
    info(message: string): string;
    /**
     * Logs a message to the console at the DEBUG level
     * @param   message The message to log
     * @returns         The formatted message sent to the console
     */
    debug(message: string): string;
    /**
     * Logs a message to the console at the WARNING level
     * @param   message The message to log
     * @returns         The formatted message sent to the console
     */
    warn(message: string): string;
    /**
     * Logs a message to the console at the ERROR level
     * @param   message The message to log
     * @returns         The formatted message sent to the console
     */
    error(message: string): string;
    /**
     * Logs a message to the console at the VERBOSE level
     * @param   message The message to log
     * @returns         The formatted message sent to the console
     */
    verbose(message: string): string;
    private getLevelDisplayString(level?);
    private getFormattedErrorString(message, level?);
}
