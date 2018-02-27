import { EventEmitter } from '@angular/core';
import { CuiToastOptions } from './cui-toast-options';
export declare class CuiToastComponent {
    autoHide: number;
    toastIsVisible: EventEmitter<boolean>;
    toasts: CuiToastOptions[];
    /**
     * Pushes a created toast to the screen
     * @param  {CuiToastOptions} toast
     */
    pushToast(toast: CuiToastOptions): void;
    /**
     * Adds a toast to the screen
     * @param severity The severity of the toast
     * @param title    The title to display
     * @param message  The message to display
     * @param padding  The padding of the toast
     * @returns The toast object
     */
    addToast(severity: string, title: string, message: string, padding?: string): CuiToastOptions;
    /**
     * Removes a toast from the screen
     * @param toastToRemove The toast to remove
     */
    removeToast(toastToRemove: CuiToastOptions): void;
}
