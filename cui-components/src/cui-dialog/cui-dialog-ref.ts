import { OverlayRef, GlobalPositionStrategy } from '@angular/cdk/overlay';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Guid } from '@cisco-ngx/cui-utils';

import { CuiDialogComponent } from './cui-dialog.component';

export class CuiDialogRef<T, R = any> {
	componentInstanceToOpen: T;

	private _afterCuiDialogOpened = new Subject<MouseEvent>();
	private _afterCuiDialogClosed = new Subject<R | undefined>();
	private _cuiDialogResult: R | undefined;

	constructor(
		private _overlayRef: OverlayRef,
		private _cuiDialogComponentInstance: CuiDialogComponent,
		readonly id: string = `cui-dialog-${Guid.generate()}`,
	) {
		this._afterCuiDialogOpened.next();
    	this._afterCuiDialogOpened.complete();
	}

	/**
	 * Close the dialog.
	 * @param cuiDialogResult Optional result to return to the dialog opener.
	 * @returns   nothing
	 */
	close (cuiDialogResult?: R): void {
		this._cuiDialogResult = cuiDialogResult;
		this._overlayRef.detachBackdrop();
		this._overlayRef.dispose();
		this._afterCuiDialogClosed.next(this._cuiDialogResult);
		this._afterCuiDialogClosed.complete();
		this._cuiDialogComponentInstance = null;
		this.componentInstanceToOpen = null;
	}

	/**
	 * Updates the dialog's position.
	 */
	updatePosition (): this {
		const strategy = this._getPositionStrategy();

		if (strategy) {
			strategy.centerHorizontally();
			strategy.centerVertically();
		}

		this._overlayRef.updatePosition();

		return this;
	}

	/** Fetches the position strategy object from the overlay ref. */
	private _getPositionStrategy (): GlobalPositionStrategy {
		return <GlobalPositionStrategy>this._overlayRef.getConfig().positionStrategy;
	}

	/**
	 * Updates the dialog's width and height.
	 * @param width New width of the dialog.
	 * @param height New height of the dialog.
	 */
	updateSize (width: string = 'auto', height: string = 'auto'): this {
		this._getPositionStrategy().width(width).height(height);
		this._overlayRef.updatePosition();

		return this;
	}

	afterCuiDialogOpened (): Observable<MouseEvent | void> {
		return this._afterCuiDialogOpened.asObservable();
	}

	afterCuiDialogClosed (): Observable<R | undefined> {
		return this._afterCuiDialogClosed.asObservable();
	}

	backdropClick (): Observable<MouseEvent | void> {
		return this._overlayRef.backdropClick();
	}

	keydownEvents (): Observable<KeyboardEvent> {
		return this._overlayRef.keydownEvents();
	}
}
