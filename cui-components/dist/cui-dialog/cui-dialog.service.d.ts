import { InjectionToken, Injector, TemplateRef } from '@angular/core';
import { BlockScrollStrategy, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentType } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CuiDialogRef } from './cui-dialog-ref';
import { CuiDialogConfig } from './cui-dialog-config';
export declare const CUI_DIALOG_DATA: InjectionToken<any>;
export declare const CUI_DIALOG_SCROLL_STRATEGY: InjectionToken<() => ScrollStrategy>;
export declare function CUI_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay): () => BlockScrollStrategy;
export declare const CUI_DIALOG_SCROLL_STRATEGY_PROVIDER: {
    provide: InjectionToken<() => ScrollStrategy>;
    deps: typeof Overlay[];
    useFactory: (overlay: Overlay) => () => BlockScrollStrategy;
};
export declare class CuiDialogService {
    private _overlay;
    private _injector;
    private _parentDialog;
    private _cuiDialogScrollStrategy;
    private _openCuiDialogsAtThisLevel;
    private _afterAllCuiDialogsClosedAtThisLevel;
    private _afterCuiDialogOpenAtThisLevel;
    readonly openCuiDialogs: CuiDialogRef<any>[];
    readonly afterCuiDialogOpen: Subject<CuiDialogRef<any>>;
    readonly _afterAllCuiDialogsClosed: Subject<void>;
    /**
     * Stream that emits when all open dialog have finished closing.
     * Will emit on subscribe if there are no open dialogs to begin with.
     */
    afterAllClosed: Observable<void>;
    constructor(_overlay: Overlay, _injector: Injector, location: Location, _parentDialog: CuiDialogService, _cuiDialogScrollStrategy: any);
    /**
     * Opens a dialog containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    open<T, D = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>, config?: CuiDialogConfig<D>): CuiDialogRef<T>;
    /**
     * Applies default options to the dialog config.
     * @param config Config to be modified.
     * @returns The new configuration object.
     */
    private _applyConfigDefaults(config?);
    /**
     * Closes all of the currently-open dialogs.
     */
    closeAll(): void;
    /**
     * Creates a custom injector to be used inside the dialog.
     * Allows a component loaded inside a dialog to close itself and,
     * optionally, to return a value.
     * @param config config object used to construct the dialog.
     * @param dialogRef reference to dialog.
     * @param dialogComponent dialog container component element to wrap all the contents.
     * @returns The custom injector that can be used inside the dialog.
     */
    private _createInjector<T>(config, dialogRef, dialogComponent);
    /**
     * Removes a dialog from the array of open dialogs.
     * @param dialogRef dialog to be removed.
     */
    private _removeOpenDialog(dialogRef);
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     * @returns CuiDialogRef or undefined
     */
    getCuiDialogById(id: string): CuiDialogRef<any> | undefined;
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param config The dialog configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    private _createOverlay(config);
    /**
     * Create an overlay config from the dialog config
     * @param cuiDialogConfig dialog configuration
     * @returns overlay coniguration
     */
    private _getOverlayConfig(cuiDialogConfig);
    /**
     * Attach a CuiDialogComponent to a dialog's overlay.
     * @param overlayRef reference to the dialog's overlay.
     * @param config dialog configuration.
     * @returns promise resolving to a ComponentRef for attached container.
     */
    private _attachCuiDialogComponent(overlayRef, config);
    /**
     * Attach the user-provided component to the CuiDialogComponent.
     * @param componentOrTemplateRef type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param cuiDialogComponent reference to the wrapping CuiDialogComponent.
     * @param overlayRef reference to the dialog's overlay.
     * @param config dialog configuration.
     * @returns promise resolving to the CuiDialogRef that should be returned to the user.
     */
    private _attachCuiDialogContent<T>(componentOrTemplateRef, cuiDialogComponent, overlayRef, config);
}
