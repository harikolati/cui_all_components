var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Inject, Injectable, InjectionToken, Injector, Optional, SkipSelf, TemplateRef, } from '@angular/core';
import { Overlay, OverlayConfig, } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal, } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { defer } from 'rxjs/observable/defer';
import { startWith } from 'rxjs/operators/startWith';
import { CuiDialogRef } from './cui-dialog-ref';
import { CuiDialogConfig } from './cui-dialog-config';
import { CuiDialogComponent } from './cui-dialog.component';
export var CUI_DIALOG_DATA = new InjectionToken('CuiDialogData');
/* Token to determine how to handle scroll strategy when dialog is open */
export var CUI_DIALOG_SCROLL_STRATEGY = new InjectionToken('cui-dialog-scroll-strategy');
export function CUI_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) { return function () { return overlay.scrollStrategies.block(); }; }
export var CUI_DIALOG_SCROLL_STRATEGY_PROVIDER = {
    provide: CUI_DIALOG_SCROLL_STRATEGY,
    deps: [Overlay],
    useFactory: CUI_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};
/* service to open cui-dialog */
var CuiDialogService = (function () {
    function CuiDialogService(_overlay, _injector, location, _parentDialog, _cuiDialogScrollStrategy) {
        var _this = this;
        this._overlay = _overlay;
        this._injector = _injector;
        this._parentDialog = _parentDialog;
        this._cuiDialogScrollStrategy = _cuiDialogScrollStrategy;
        this._openCuiDialogsAtThisLevel = [];
        this._afterAllCuiDialogsClosedAtThisLevel = new Subject();
        this._afterCuiDialogOpenAtThisLevel = new Subject();
        /**
             * Stream that emits when all open dialog have finished closing.
             * Will emit on subscribe if there are no open dialogs to begin with.
             */
        this.afterAllClosed = defer(function () {
            return _this.openCuiDialogs.length ? _this._afterAllCuiDialogsClosed
                : _this._afterAllCuiDialogsClosed.pipe(startWith(undefined));
        });
        // close all dialogs if location changes.
        if (!_parentDialog && location) {
            location.subscribe(function () { return _this.closeAll(); });
        }
    }
    Object.defineProperty(CuiDialogService.prototype, "openCuiDialogs", {
        get: function () {
            return this._parentDialog ?
                this._parentDialog.openCuiDialogs : this._openCuiDialogsAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CuiDialogService.prototype, "afterCuiDialogOpen", {
        get: function () {
            return this._parentDialog ?
                this._parentDialog.afterCuiDialogOpen : this._afterCuiDialogOpenAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CuiDialogService.prototype, "_afterAllCuiDialogsClosed", {
        get: function () {
            return this._parentDialog ?
                this._parentDialog._afterAllCuiDialogsClosed :
                this._afterAllCuiDialogsClosedAtThisLevel;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens a dialog containing the given component.
     * @param componentOrTemplateRef Type of the component to load into the dialog,
     *     or a TemplateRef to instantiate as the dialog content.
     * @param config Extra configuration options.
     * @returns Reference to the newly-opened dialog.
     */
    /**
         * Opens a dialog containing the given component.
         * @param componentOrTemplateRef Type of the component to load into the dialog,
         *     or a TemplateRef to instantiate as the dialog content.
         * @param config Extra configuration options.
         * @returns Reference to the newly-opened dialog.
         */
    CuiDialogService.prototype.open = /**
         * Opens a dialog containing the given component.
         * @param componentOrTemplateRef Type of the component to load into the dialog,
         *     or a TemplateRef to instantiate as the dialog content.
         * @param config Extra configuration options.
         * @returns Reference to the newly-opened dialog.
         */
    function (componentOrTemplateRef, config) {
        var _this = this;
        var updatedConfig = this._applyConfigDefaults(config);
        if (updatedConfig.id && this.getCuiDialogById(updatedConfig.id)) {
            throw Error("Dialog with id \"" + updatedConfig.id + "\" exists already.\n        The dialog id must be unique.");
        }
        var overlayRef = this._createOverlay(updatedConfig);
        var dialogContainer = this._attachCuiDialogComponent(overlayRef, updatedConfig);
        var dialogRef = this._attachCuiDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, updatedConfig);
        this.openCuiDialogs.push(dialogRef);
        dialogRef.afterCuiDialogClosed().subscribe(function () { return _this._removeOpenDialog(dialogRef); });
        this.afterCuiDialogOpen.next(dialogRef);
        return dialogRef;
    };
    /**
     * Applies default options to the dialog config.
     * @param config Config to be modified.
     * @returns The new configuration object.
     */
    /**
         * Applies default options to the dialog config.
         * @param config Config to be modified.
         * @returns The new configuration object.
         */
    CuiDialogService.prototype._applyConfigDefaults = /**
         * Applies default options to the dialog config.
         * @param config Config to be modified.
         * @returns The new configuration object.
         */
    function (config) {
        var newConf = __assign({}, new CuiDialogConfig(), config);
        if (newConf.animated) {
            newConf.hostClass = 'modal modal--animated';
        }
        return newConf;
    };
    /**
     * Closes all of the currently-open dialogs.
     */
    /**
         * Closes all of the currently-open dialogs.
         */
    CuiDialogService.prototype.closeAll = /**
         * Closes all of the currently-open dialogs.
         */
    function () {
        var i = this.openCuiDialogs.length;
        while (i > 0) {
            i = i - 1;
            this.openCuiDialogs[i].close();
        }
    };
    /**
     * Creates a custom injector to be used inside the dialog.
     * Allows a component loaded inside a dialog to close itself and,
     * optionally, to return a value.
     * @param config config object used to construct the dialog.
     * @param dialogRef reference to dialog.
     * @param dialogComponent dialog container component element to wrap all the contents.
     * @returns The custom injector that can be used inside the dialog.
     */
    /**
         * Creates a custom injector to be used inside the dialog.
         * Allows a component loaded inside a dialog to close itself and,
         * optionally, to return a value.
         * @param config config object used to construct the dialog.
         * @param dialogRef reference to dialog.
         * @param dialogComponent dialog container component element to wrap all the contents.
         * @returns The custom injector that can be used inside the dialog.
         */
    CuiDialogService.prototype._createInjector = /**
         * Creates a custom injector to be used inside the dialog.
         * Allows a component loaded inside a dialog to close itself and,
         * optionally, to return a value.
         * @param config config object used to construct the dialog.
         * @param dialogRef reference to dialog.
         * @param dialogComponent dialog container component element to wrap all the contents.
         * @returns The custom injector that can be used inside the dialog.
         */
    function (config, dialogRef, dialogComponent) {
        var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        var injectionTokens = new WeakMap();
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
    };
    /**
     * Removes a dialog from the array of open dialogs.
     * @param dialogRef dialog to be removed.
     */
    /**
         * Removes a dialog from the array of open dialogs.
         * @param dialogRef dialog to be removed.
         */
    CuiDialogService.prototype._removeOpenDialog = /**
         * Removes a dialog from the array of open dialogs.
         * @param dialogRef dialog to be removed.
         */
    function (dialogRef) {
        var index = this.openCuiDialogs.indexOf(dialogRef);
        if (index > -1) {
            this.openCuiDialogs.splice(index, 1);
            // Call next on afterAllCuiDialogsClosed subject, if there are no open dialogs.
            if (!this.openCuiDialogs.length) {
                this._afterAllCuiDialogsClosed.next();
            }
        }
    };
    /**
     * Finds an open dialog by its id.
     * @param id ID to use when looking up the dialog.
     * @returns CuiDialogRef or undefined
     */
    /**
         * Finds an open dialog by its id.
         * @param id ID to use when looking up the dialog.
         * @returns CuiDialogRef or undefined
         */
    CuiDialogService.prototype.getCuiDialogById = /**
         * Finds an open dialog by its id.
         * @param id ID to use when looking up the dialog.
         * @returns CuiDialogRef or undefined
         */
    function (id) {
        return this.openCuiDialogs.find(function (dialog) { return dialog.id === id; });
    };
    /**
     * Creates the overlay into which the dialog will be loaded.
     * @param config The dialog configuration.
     * @returns A promise resolving to the OverlayRef for the created overlay.
     */
    /**
         * Creates the overlay into which the dialog will be loaded.
         * @param config The dialog configuration.
         * @returns A promise resolving to the OverlayRef for the created overlay.
         */
    CuiDialogService.prototype._createOverlay = /**
         * Creates the overlay into which the dialog will be loaded.
         * @param config The dialog configuration.
         * @returns A promise resolving to the OverlayRef for the created overlay.
         */
    function (config) {
        var overlayConfig = this._getOverlayConfig(config);
        return this._overlay.create(overlayConfig);
    };
    /**
     * Create an overlay config from the dialog config
     * @param cuiDialogConfig dialog configuration
     * @returns overlay coniguration
     */
    /**
         * Create an overlay config from the dialog config
         * @param cuiDialogConfig dialog configuration
         * @returns overlay coniguration
         */
    CuiDialogService.prototype._getOverlayConfig = /**
         * Create an overlay config from the dialog config
         * @param cuiDialogConfig dialog configuration
         * @returns overlay coniguration
         */
    function (cuiDialogConfig) {
        return new OverlayConfig({
            positionStrategy: this._overlay.position().global(),
            scrollStrategy: this._cuiDialogScrollStrategy(),
            hasBackdrop: cuiDialogConfig.hasBackdrop,
        });
    };
    /**
     * Attach a CuiDialogComponent to a dialog's overlay.
     * @param overlayRef reference to the dialog's overlay.
     * @param config dialog configuration.
     * @returns promise resolving to a ComponentRef for attached container.
     */
    /**
         * Attach a CuiDialogComponent to a dialog's overlay.
         * @param overlayRef reference to the dialog's overlay.
         * @param config dialog configuration.
         * @returns promise resolving to a ComponentRef for attached container.
         */
    CuiDialogService.prototype._attachCuiDialogComponent = /**
         * Attach a CuiDialogComponent to a dialog's overlay.
         * @param overlayRef reference to the dialog's overlay.
         * @param config dialog configuration.
         * @returns promise resolving to a ComponentRef for attached container.
         */
    function (overlayRef, config) {
        var containerPortal = new ComponentPortal(CuiDialogComponent, config.viewContainerRef);
        var containerRef = overlayRef.attach(containerPortal);
        containerRef.instance._cuiDialogConfig = config;
        return containerRef.instance;
    };
    /**
     * Attach the user-provided component to the CuiDialogComponent.
     * @param componentOrTemplateRef type of component being loaded into the dialog,
     *     or a TemplateRef to instantiate as the content.
     * @param cuiDialogComponent reference to the wrapping CuiDialogComponent.
     * @param overlayRef reference to the dialog's overlay.
     * @param config dialog configuration.
     * @returns promise resolving to the CuiDialogRef that should be returned to the user.
     */
    /**
         * Attach the user-provided component to the CuiDialogComponent.
         * @param componentOrTemplateRef type of component being loaded into the dialog,
         *     or a TemplateRef to instantiate as the content.
         * @param cuiDialogComponent reference to the wrapping CuiDialogComponent.
         * @param overlayRef reference to the dialog's overlay.
         * @param config dialog configuration.
         * @returns promise resolving to the CuiDialogRef that should be returned to the user.
         */
    CuiDialogService.prototype._attachCuiDialogContent = /**
         * Attach the user-provided component to the CuiDialogComponent.
         * @param componentOrTemplateRef type of component being loaded into the dialog,
         *     or a TemplateRef to instantiate as the content.
         * @param cuiDialogComponent reference to the wrapping CuiDialogComponent.
         * @param overlayRef reference to the dialog's overlay.
         * @param config dialog configuration.
         * @returns promise resolving to the CuiDialogRef that should be returned to the user.
         */
    function (componentOrTemplateRef, cuiDialogComponent, overlayRef, config) {
        // Reference to the dialog, to give the user,
        // a handle to modify and close it.
        var dialogRef = new CuiDialogRef(overlayRef, cuiDialogComponent, config.id);
        if (componentOrTemplateRef instanceof TemplateRef) {
            cuiDialogComponent.attachTemplatePortal(new TemplatePortal(componentOrTemplateRef, 
            // tslint:disable-next-line:no-non-null-assertion
            (null), { dialogRef: dialogRef, $implicit: config.data }));
        }
        else {
            var injector = this._createInjector(config, dialogRef, cuiDialogComponent);
            var contentRef = cuiDialogComponent.attachComponentPortal(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            dialogRef.componentInstanceToOpen = contentRef.instance;
        }
        dialogRef.updatePosition();
        return dialogRef;
    };
    CuiDialogService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CuiDialogService.ctorParameters = function () { return [
        { type: Overlay, },
        { type: Injector, },
        { type: Location, decorators: [{ type: Optional },] },
        { type: CuiDialogService, decorators: [{ type: Optional }, { type: SkipSelf },] },
        { type: undefined, decorators: [{ type: Inject, args: [CUI_DIALOG_SCROLL_STRATEGY,] },] },
    ]; };
    return CuiDialogService;
}());
export { CuiDialogService };
//# sourceMappingURL=cui-dialog.service.js.map