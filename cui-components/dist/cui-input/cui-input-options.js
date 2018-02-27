var CuiInputOptions = (function () {
    function CuiInputOptions(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        /**
             * Level of the helper text (info, success, warning, danger)
             */
        this.helperLevel = 'info';
        /**
             * Minimum amount for a number input
             */
        this.min = 0;
        /**
             * Maximum amount for a number input
             */
        this.max = 999999;
        /**
             * Step amount for a number input
             */
        this.step = 1;
        /**
             * Number of rows to display for a textarea
             */
        this.rows = 1;
        /**
             * Whether to autofocus on the input
             */
        this.autofocus = false;
        /**
             * Minimum length for text and textarea inputs
             */
        this.minLength = 0;
        /**
             * Maximum length for text and textarea inputs
             */
        this.maxLength = 0;
        this.errorMessages = [
            {
                type: CuiInputValidationError.MIN_LENGTH_NOT_MET,
                message: function () { return "Minimum of " + _this.minLength + " characters required."; },
            },
            {
                type: CuiInputValidationError.REGEXP_MISMATCH,
                message: 'This value does not meet the requirements.',
            },
        ];
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }
    return CuiInputOptions;
}());
export { CuiInputOptions };
export var CuiInputValidationError;
(function (CuiInputValidationError) {
    CuiInputValidationError[CuiInputValidationError["NO_ERROR"] = 0] = "NO_ERROR";
    CuiInputValidationError[CuiInputValidationError["MIN_LENGTH_NOT_MET"] = 1] = "MIN_LENGTH_NOT_MET";
    CuiInputValidationError[CuiInputValidationError["MAX_LENGTH_EXCEEDED"] = 2] = "MAX_LENGTH_EXCEEDED";
    CuiInputValidationError[CuiInputValidationError["REGEXP_MISMATCH"] = 3] = "REGEXP_MISMATCH";
})(CuiInputValidationError || (CuiInputValidationError = {}));
var CuiInputValidation = (function () {
    function CuiInputValidation() {
    }
    CuiInputValidation.validate = function (options, model) {
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
    };
    return CuiInputValidation;
}());
export { CuiInputValidation };
//# sourceMappingURL=cui-input-options.js.map