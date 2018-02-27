export declare class CuiInputOptions {
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
    helperLevel: string;
    /**
     * Minimum amount for a number input
     */
    min: number;
    /**
     * Maximum amount for a number input
     */
    max: number;
    /**
     * Step amount for a number input
     */
    step: number;
    /**
     * Number of rows to display for a textarea
     */
    rows: number;
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
    autofocus: boolean;
    /**
     * Minimum length for text and textarea inputs
     */
    minLength: number;
    /**
     * Maximum length for text and textarea inputs
     */
    maxLength: number;
    /**
     * Regular expression to match the model against.
     */
    match: RegExp;
    errorMessages: any[];
    constructor(options?: any);
}
export declare enum CuiInputValidationError {
    NO_ERROR = 0,
    MIN_LENGTH_NOT_MET = 1,
    MAX_LENGTH_EXCEEDED = 2,
    REGEXP_MISMATCH = 3,
}
export declare class CuiInputValidation {
    static validate(options: CuiInputOptions, model: any): CuiInputValidationError;
}
