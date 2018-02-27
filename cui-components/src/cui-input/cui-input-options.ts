export class CuiInputOptions {
	/**
	 * Index signature
	 */
	[key: string]: any;
	
	/**
	 * Whether the input is required (not available for switches)
	 */
	required: boolean;
	/**
	 * Optional helper text to display below the input (not available for switches)
	 */
	helperText: string;
	/**
	 * Level of the helper text (info, success, warning, danger)
	 */
	helperLevel = 'info';

	/**
	 * Minimum amount for a number input
	 */
	min = 0;
	/**
	 * Maximum amount for a number input
	 */
	max = 999999;
	/**
	 * Step amount for a number input
	 */
	step = 1;

	/**
	 * Number of rows to display for a textarea
	 */
	rows = 1;

	/**
	 * Optional left icon class for a switch
	 */
	leftIcon: string;

	/**
	 * Optional right icon class for a switch
	 */
	rightIcon: string;

	/**
	 * Whether to autofocus on the input
	 */
	autofocus = false;

	/**
	 * Minimum length for text and textarea inputs
	 */
	minLength = 0;

	/**
	 * Maximum length for text and textarea inputs
	 */
	maxLength = 0;

	/**
	 * Regular expression to match the model against.
	 */
	match: RegExp;

	errorMessages: any[] = [
		{
			type: CuiInputValidationError.MIN_LENGTH_NOT_MET,
			message: (): string => `Minimum of ${this.minLength} characters required.`,
		},
		{
			type: CuiInputValidationError.REGEXP_MISMATCH,
			message: 'This value does not meet the requirements.',
		},
	];

	constructor (options: any = {}) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				this[key] = options[key];
			}
		}
	}
}

export enum CuiInputValidationError {
	NO_ERROR,
	MIN_LENGTH_NOT_MET,
	MAX_LENGTH_EXCEEDED,
	REGEXP_MISMATCH,
}

export class CuiInputValidation {
	static validate (options: CuiInputOptions, model: any) {
		if (options.minLength && String(model).length < options.minLength) {
			return CuiInputValidationError.MIN_LENGTH_NOT_MET;
		}
		if (options.maxLength && String(model).length > options.maxLength) {
			return CuiInputValidationError.MAX_LENGTH_EXCEEDED;
		}
		if (options.match && !String(model).match(options.match)) {
			return CuiInputValidationError.REGEXP_MISMATCH;
		}

		return CuiInputValidationError.NO_ERROR;
	}
}
