import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CuiToastOptions } from './cui-toast-options';
export declare class CuiToasterService {
    private nextToast;
    private removedToast;
    /**
     * Adds a toast to the screen
     * @param  {string} severity
     * @param  {string} title
     * @param  {string} message
     * @param  {string} padding
     * @return {CuiToastOptions}
     */
    addToast(severity?: string, title?: string, message?: string, padding?: string): CuiToastOptions;
    /**
     * Removes a toast from the screen
     * @param  {CuiToastOptions} toast
     */
    removeToast(toast: CuiToastOptions): void;
    /**
     * Subscription for getting next toast
     * @return {Observable<CuiToastOptions>}
     */
    getNextToast(): Observable<CuiToastOptions>;
    /**
     * Subscription for getting removed toast
     * @return {Observable<CuiToastOptions>}
     */
    getRemovedToast(): Observable<CuiToastOptions>;
}
export declare class CuiToasterComponent implements OnDestroy {
    private toastService;
    constructor(toastService: CuiToasterService);
    private toasts;
    private toast;
    private toastSubscribe;
    private removedToastSubscribe;
    ngOnDestroy(): void;
}
