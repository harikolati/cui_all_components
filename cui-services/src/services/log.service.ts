import { Injectable } from '@angular/core';

/**
 * Enumeration of available log levels
 */
export const enum LogLevel {
	INFO,
	DEBUG,
	WARNING,
	ERROR,
	VERBOSE,
}

@Injectable()
export class LogService {
	/**
	 * Logs a message to the console
	 * @param   message The message to log
	 * @param   level   The level to log the message under
	 * @returns         The formatted message sent to the console
	 */
	public log (message: string, level: number = LogLevel.INFO): string {
		const errorString = this.getFormattedErrorString(message, level);

		switch (level) {
		case LogLevel.INFO:
			console.log(errorString);
			break;
		case LogLevel.WARNING:
			console.warn(errorString);
			break;
		case LogLevel.ERROR:
			console.error(errorString);
			break;
		default:
			console.log(errorString);
			break;
		}

		return errorString;
	}

	/**
	 * Logs a message to the console at the INFO level
	 * @param   message The message to log
	 * @returns         The formatted message sent to the console
	 */
	public info (message: string): string {
		return this.log(message, LogLevel.INFO);
	}

	/**
	 * Logs a message to the console at the DEBUG level
	 * @param   message The message to log
	 * @returns         The formatted message sent to the console
	 */
	public debug (message: string): string {
		return this.log(message, LogLevel.DEBUG);
	}

	/**
	 * Logs a message to the console at the WARNING level
	 * @param   message The message to log
	 * @returns         The formatted message sent to the console
	 */
	public warn (message: string): string {
		return this.log(message, LogLevel.WARNING);
	}

	/**
	 * Logs a message to the console at the ERROR level
	 * @param   message The message to log
	 * @returns         The formatted message sent to the console
	 */
	public error (message: string): string {
		return this.log(message, LogLevel.ERROR);
	}

	/**
	 * Logs a message to the console at the VERBOSE level
	 * @param   message The message to log
	 * @returns         The formatted message sent to the console
	 */
	public verbose (message: string): string {
		return this.log(message, LogLevel.VERBOSE);
	}

	private getLevelDisplayString (level: number = LogLevel.INFO): string {
		switch (level) {
		case LogLevel.VERBOSE:
			return 'verbose';
		case LogLevel.ERROR:
			return 'error';
		case LogLevel.WARNING:
			return 'warning';
		case LogLevel.DEBUG:
			return 'debug';
		default:
			return 'info';
		}
	}

	private getFormattedErrorString (message: string, level: number = LogLevel.INFO): string {
		const levelDisplayString = this.getLevelDisplayString(level);

		return `${levelDisplayString}: ${message}`;
	}
}
