import {
	ComponentRef,
	Inject,
	Injectable,
	InjectionToken,
	Injector,
	Optional,
	SkipSelf,
	TemplateRef,
} from '@angular/core';

import {
	BlockScrollStrategy,
	Overlay,
	OverlayConfig,
	OverlayRef,
	ScrollStrategy,
} from '@angular/cdk/overlay';

import {
	ComponentPortal,
	ComponentType,
	PortalInjector,
	TemplatePortal,
} from '@angular/cdk/portal';

import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { defer } from 'rxjs/observable/defer';

import { startWith } from 'rxjs/operators/startWith';

import { CuiDialogRef } from './cui-dialog-ref';
import { CuiDialogConfig } from './cui-dialog-config';
import { CuiDialogComponent } from './cui-dialog.component';


export const CUI_DIALOG_DATA = new InjectionToken<any>('CuiDialogData');

/* Token to determine how to handle scroll strategy when dialog is open */
export const CUI_DIALOG_SCROLL_STRATEGY =
	new InjectionToken<() => ScrollStrategy>('cui-dialog-scroll-strategy');

export function CUI_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY (overlay: Overlay):
	() => BlockScrollStrategy { return () => overlay.scrollStrategies.block(); }


export const CUI_DIALOG_SCROLL_STRATEGY_PROVIDER = {
	provide: CUI_DIALOG_SCROLL_STRATEGY,
	deps: [Overlay],
	useFactory: CUI_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};


/* service to open cui-dialog */
@Injectable()
export class CuiDialogService {
	private _openCuiDialogsAtThisLevel: CuiDialogRef<any>[] = [];
	private _afterAllCuiDialogsClosedAtThisLevel = new Subject<void>();
	private _afterCuiDialogOpenAtThisLevel = new Subject<CuiDialogRef<any>>();

	get openCuiDialogs (): CuiDialogRef<any>[] {
		return this._parentDialog ?
			this._parentDialog.openCuiDialogs : this._openCuiDialogsAtThisLevel;
	}

	get afterCuiDialogOpen (): Subject<CuiDialogRef<any>> {
		return this._parentDialog ?
			this._parentDialog.afterCuiDialogOpen : this._afterCuiDialogOpenAtThisLevel;
	}

	get _afterAllCuiDialogsClosed (): Subject<void> {
		return this._parentDialog ?
			this._parentDialog._afterAllCuiDialogsClosed :
			this._afterAllCuiDialogsClosedAtThisLevel;
	}

	/**
	 * Stream that emits when all open dialog have finished closing.
	 * Will emit on subscribe if there are no open dialogs to begin with.
	 */
	afterAllClosed: Observable<void> = defer<void>(() =>
		this.openCuiDialogs.length ? this._afterAllCuiDialogsClosed
			: this._afterAllCuiDialogsClosed.pipe(startWith(undefined)));

	constructor(
		private _overlay: Overlay,
		private _injector: Injector,
		@Optional() location: Location,
		@Optional() @SkipSelf() private _parentDialog: CuiDialogService,
		@Inject(CUI_DIALOG_SCROLL_STRATEGY) private _cuiDialogScrollStrategy: any,
	) {
		// close all dialogs if location changes.
		if (!_parentDialog && location) {
			location.subscribe(() => this.closeAll());
		}
	}

	/**
	 * Opens a dialog containing the given component.
	 * @param componentOrTemplateRef Type of the component to load into the dialog,
	 *     or a TemplateRef to instantiate as the dialog content.
	 * @param config Extra configuration options.
	 * @returns Reference to the newly-opened dialog.
	 */
	open<T, D = any> (
		componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
		config?: CuiDialogConfig<D>,
	): CuiDialogRef<T> {

		const updatedConfig = this._applyConfigDefaults(config);
		if (updatedConfig.id && this.getCuiDialogById(updatedConfig.id)) {
			throw Error(`Dialog with id "${updatedConfig.id}" exists already.
        The dialog id must be unique.`);
		}

		const overlayRef = this._createOverlay(updatedConfig);
		const dialogContainer = this._attachCuiDialogComponent(overlayRef, updatedConfig);
		const dialogRef = this._attachCuiDialogContent<T>(
			componentOrTemplateRef, dialogContainer, overlayRef, updatedConfig);

		this.openCuiDialogs.push(dialogRef);
		dialogRef.afterCuiDialogClosed().subscribe(() => this._removeOpenDialog(dialogRef));
		this.afterCuiDialogOpen.next(dialogRef);

		return dialogRef;
	}

	/**
	 * Applies default options to the dialog config.
	 * @param config Config to be modified.
	 * @returns The new configuration object.
	 */
	private _applyConfigDefaults (config?: CuiDialogConfig): CuiDialogConfig {
		const newConf = {
			...new CuiDialogConfig(),
			...config,
		};
		if (newConf.animated) {
			newConf.hostClass = 'modal modal--animated';
		}

		return newConf;
	}
	/**
	 * Closes all of the currently-open dialogs.
	 */
	closeAll (): void {
		let i = this.openCuiDialogs.length;

		while (i > 0) {
			i = i - 1;
			this.openCuiDialogs[i].close();
		}
	}

	/**
	 * Creates a custom injector to be used inside the dialog.
	 * Allows a component loaded inside a dialog to close itself and,
	 * optionally, to return a value.
	 * @param config config object used to construct the dialog.
	 * @param dialogRef reference to dialog.
	 * @param dialogComponent dialog container component element to wrap all the contents.
	 * @returns The custom injector that can be used inside the dialog.
	 */
	private _createInjector<T> (
		config: CuiDialogConfig,
		dialogRef: CuiDialogRef<T>,
		dialogComponent: CuiDialogComponent,
	): PortalInjector {
		const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
		const injectionTokens = new WeakMap();

		injectionTokens.set(CuiDialogRef, dialogRef);

		/**
		 * The CuiDialogComponent is injected in the portal as the CuiDialogComponent
		 * and the dialog's content are created out of the same ViewContainerRef.
		 * As such, they are siblings for the injector's purposes. To allow the hierarchy
		 * that is expected, the CuiDialogComponent is explicitly added to the injection tokens
		 */
		injectionTokens.set(CuiDialogComponent, dialogComponent);
		injectionTokens.set(CUI_DIALOG_DATA, config.data);

		return new PortalInjector(userInjector || this._injector, injectionTokens);
	}

	/**
	 * Removes a dialog from the array of open dialogs.
	 * @param dialogRef dialog to be removed.
	 */
	private _removeOpenDialog (dialogRef: CuiDialogRef<any>) {
		const index = this.openCuiDialogs.indexOf(dialogRef);
		if (index > -1) {
			this.openCuiDialogs.splice(index, 1);

			// Call next on afterAllCuiDialogsClosed subject, if there are no open dialogs.
			if (!this.openCuiDialogs.length) {
				this._afterAllCuiDialogsClosed.next();
			}
		}
	}

	/**
	 * Finds an open dialog by its id.
	 * @param id ID to use when looking up the dialog.
	 * @returns CuiDialogRef or undefined
	 */
	getCuiDialogById (id: string): CuiDialogRef<any> | undefined {
		return this.openCuiDialogs.find(dialog => dialog.id === id);
	}

	/**
	 * Creates the overlay into which the dialog will be loaded.
	 * @param config The dialog configuration.
	 * @returns A promise resolving to the OverlayRef for the created overlay.
	 */
	private _createOverlay (config: CuiDialogConfig): OverlayRef {
		const overlayConfig = this._getOverlayConfig(config);

		return this._overlay.create(overlayConfig);
	}

	/**
	 * Create an overlay config from the dialog config
	 * @param cuiDialogConfig dialog configuration
	 * @returns overlay coniguration
	 */
	private _getOverlayConfig (cuiDialogConfig: CuiDialogConfig): OverlayConfig {
		return new OverlayConfig({
			positionStrategy: this._overlay.position().global(),
			scrollStrategy: this._cuiDialogScrollStrategy(),
			hasBackdrop: cuiDialogConfig.hasBackdrop,
		});
	}

	/**
	 * Attach a CuiDialogComponent to a dialog's overlay.
	 * @param overlayRef reference to the dialog's overlay.
	 * @param config dialog configuration.
	 * @returns promise resolving to a ComponentRef for attached container.
	 */
	private _attachCuiDialogComponent (
		overlayRef: OverlayRef,
		config: CuiDialogConfig,
	): CuiDialogComponent {

		const containerPortal = new ComponentPortal(
			CuiDialogComponent,
			config.viewContainerRef,
		);

		const containerRef: ComponentRef<CuiDialogComponent> =
			overlayRef.attach(containerPortal);

		containerRef.instance._cuiDialogConfig = config;

		return containerRef.instance;
	}

	/**
	 * Attach the user-provided component to the CuiDialogComponent.
	 * @param componentOrTemplateRef type of component being loaded into the dialog,
	 *     or a TemplateRef to instantiate as the content.
	 * @param cuiDialogComponent reference to the wrapping CuiDialogComponent.
	 * @param overlayRef reference to the dialog's overlay.
	 * @param config dialog configuration.
	 * @returns promise resolving to the CuiDialogRef that should be returned to the user.
	 */
	private _attachCuiDialogContent<T> (
		componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
		cuiDialogComponent: CuiDialogComponent,
		overlayRef: OverlayRef,
		config: CuiDialogConfig,
	): CuiDialogRef<T> {
		// Reference to the dialog, to give the user,
		// a handle to modify and close it.
		const dialogRef = new CuiDialogRef<T>(overlayRef, cuiDialogComponent, config.id);

		if (componentOrTemplateRef instanceof TemplateRef) {
			cuiDialogComponent.attachTemplatePortal(
				new TemplatePortal<T>(componentOrTemplateRef,
					// tslint:disable-next-line:no-non-null-assertion
					null!,
					<any>{ dialogRef, $implicit: config.data },
				));
		} else {
			const injector = this._createInjector<T>(config, dialogRef, cuiDialogComponent);

			const contentRef = cuiDialogComponent.attachComponentPortal<T>(
				new ComponentPortal(componentOrTemplateRef, undefined, injector),
			);

			dialogRef.componentInstanceToOpen = contentRef.instance;
		}

		dialogRef.updatePosition();

		return dialogRef;
	}
}
