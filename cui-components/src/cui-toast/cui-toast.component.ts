import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CuiToastOptions } from './cui-toast-options';
import { find as _find } from 'lodash-es';

@Component({
	selector: 'cui-toast',
	templateUrl: './cui-toast.component.html',
	styleUrls: ['./cui-toast.component.scss'],
})
/**
 * Component for toast popups
 */
export class CuiToastComponent {
	@Input() autoHide: number;
	@Output() toastIsVisible: EventEmitter<boolean> = new EventEmitter<boolean>();
	toasts: CuiToastOptions[] = [];

	/**
	 * Pushes a created toast to the screen
	 * @param  {CuiToastOptions} toast
	 */
	public pushToast (toast: CuiToastOptions) {
		this.toasts.push(toast);

		if (this.autoHide) {
			setTimeout(this.removeToast.bind(this, toast), this.autoHide);
		}
		this.toastIsVisible.emit(true);
	}

	/**
	 * Adds a toast to the screen
	 * @param severity The severity of the toast
	 * @param title    The title to display
	 * @param message  The message to display
	 * @param padding  The padding of the toast
	 * @returns The toast object
	 */
	public addToast (severity: string, title: string, message: string,
		padding: string = 'regular'): CuiToastOptions {
		const toast: CuiToastOptions = new CuiToastOptions(severity, title, message, padding);
		this.pushToast(toast);

		return toast;
	}

	/**
	 * Removes a toast from the screen
	 * @param toastToRemove The toast to remove
	 */
	public removeToast (toastToRemove: CuiToastOptions) {
		const toast = _find(
			this.toasts,
			(toastOptions: CuiToastOptions) => toastOptions.guid === toastToRemove.guid,
		);

		if (toast) {
			toast.hide();
			setTimeout(() => {
				this.toasts.splice(this.toasts.indexOf(toast), 1);
				this.toastIsVisible.emit(false);
			}, 500);
		}
	}
}
