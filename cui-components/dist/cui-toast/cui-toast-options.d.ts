import { Guid } from '@cisco-ngx/cui-utils';
export declare class CuiToastOptions {
    /**
     * Guid of the toast item
     */
    guid: Guid;
    /**
     * Toast padding (regular, compressed, loose)
     */
    padding: string;
    /**
     * Toast severity (info, success, warning, danger)
     */
    severity: string;
    /**
     * The title to display in the toast
     */
    title: string;
    /**
     * The message to display under the title
     */
    message: string;
    /**
     * Whether the toast is showing in the bottom right corner
     */
    popped: boolean;
    /**
     * Pops the toast with severity, title and message
     * @param severity The severity of the toast
     * @param title    The title to display
     * @param message  The message to display
     * @param padding  The padding of the toast
     */
    constructor(severity: string, title: string, message: string, padding: string);
    /**
     * Updates the toast with severity, title and message
     * @param severity The severity of the toast
     * @param title    The title to display
     * @param message  The message to display
     */
    update(severity: string, title: string, message: string): void;
    /**
     * Hides the toast
     */
    hide(): void;
}
