import {
	Injectable,
	Component,
	OnDestroy,
	ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { CuiToastComponent } from './cui-toast.component';
import { CuiToastOptions } from './cui-toast-options';

@Injectable()
export class CuiToasterService {

	private nextToast = new Subject<CuiToastOptions>();
	private removedToast = new Subject<CuiToastOptions>();

	/**
	 * Adds a toast to the screen
	 * @param  {string} severity
	 * @param  {string} title
	 * @param  {string} message
	 * @param  {string} padding
	 * @return {CuiToastOptions}
	 */
	public addToast (
		severity: string = '',
		title: string = '',
		message: string = '',
		padding: string = '',
	): CuiToastOptions {

		const toast: CuiToastOptions = new CuiToastOptions(severity, title, message, padding);
		this.nextToast.next(toast);

		return toast;
	}

	/**
	 * Removes a toast from the screen
	 * @param  {CuiToastOptions} toast
	 */
	public removeToast (toast: CuiToastOptions) {
		this.removedToast.next(toast);
	}

	/**
	 * Subscription for getting next toast
	 * @return {Observable<CuiToastOptions>}
	 */
	public getNextToast (): Observable<CuiToastOptions> {
		return this.nextToast.asObservable();
	}

	/**
	 * Subscription for getting removed toast
	 * @return {Observable<CuiToastOptions>}
	 */
	public getRemovedToast (): Observable<CuiToastOptions> {
		return this.removedToast.asObservable();
	}
}


@Component({
	selector: 'cui-toaster',
	template: '<cui-toast></cui-toast>',
})
export class CuiToasterComponent implements OnDestroy {
	constructor(private toastService: CuiToasterService) {}

	@ViewChild(CuiToastComponent)
	private toasts: CuiToastComponent;
	private toast: CuiToastOptions;

	private toastSubscribe: Subscription =
	this.toastService.getNextToast()
	.subscribe((toast: CuiToastOptions) => {
		this.toasts.pushToast(toast);
	});

	private removedToastSubscribe: Subscription =
	this.toastService.getRemovedToast()
	.subscribe((toast: CuiToastOptions) => {
		this.toasts.removeToast(toast);
	});

	ngOnDestroy () {
		this.toastSubscribe.unsubscribe();
		this.removedToastSubscribe.unsubscribe();
	}
}
