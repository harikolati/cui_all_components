import { Guid } from '@cisco-ngx/cui-utils';
var CuiToastOptions = (function () {
    /**
     * Pops the toast with severity, title and message
     * @param severity The severity of the toast
     * @param title    The title to display
     * @param message  The message to display
     * @param padding  The padding of the toast
     */
    function CuiToastOptions(severity, title, message, padding) {
        /**
             * Guid of the toast item
             */
        this.guid = Guid.generate();
        /**
             * Toast padding (regular, compressed, loose)
             */
        this.padding = 'regular';
        /**
             * Toast severity (info, success, warning, danger)
             */
        this.severity = 'info';
        /**
             * Whether the toast is showing in the bottom right corner
             */
        this.popped = true;
        this.title = title || this.title;
        this.message = message || this.message;
        this.severity = severity || this.severity;
        this.padding = padding || this.padding;
        this.popped = true;
    }
    /**
     * Updates the toast with severity, title and message
     * @param severity The severity of the toast
     * @param title    The title to display
     * @param message  The message to display
     */
    /**
         * Updates the toast with severity, title and message
         * @param severity The severity of the toast
         * @param title    The title to display
         * @param message  The message to display
         */
    CuiToastOptions.prototype.update = /**
         * Updates the toast with severity, title and message
         * @param severity The severity of the toast
         * @param title    The title to display
         * @param message  The message to display
         */
    function (severity, title, message) {
        this.title = title || this.title;
        this.message = message || this.message;
        this.severity = severity || this.severity;
    };
    /**
     * Hides the toast
     */
    /**
         * Hides the toast
         */
    CuiToastOptions.prototype.hide = /**
         * Hides the toast
         */
    function () {
        this.popped = false;
    };
    return CuiToastOptions;
}());
export { CuiToastOptions };
//# sourceMappingURL=cui-toast-options.js.map