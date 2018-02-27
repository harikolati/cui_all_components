/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe, ChangeDetectorRef, NgZone } from '@angular/core';
import { FromNow } from './from-now.class';
var GuidFromNowPipe = (function () {
    function GuidFromNowPipe(changeDetectorRef, ngZone) {
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.fromNow = new FromNow(this.changeDetectorRef, this.ngZone);
    }
    /**
     * Retrieves the time from now that a MongoDB object was created
     * @param   value The _id property from the Mongo object
     * @returns The time from now
     */
    /**
     * Retrieves the time from now that a MongoDB object was created
     * @param {?} value The _id property from the Mongo object
     * @return {?} The time from now
     */
    GuidFromNowPipe.prototype.transform = /**
     * Retrieves the time from now that a MongoDB object was created
     * @param {?} value The _id property from the Mongo object
     * @return {?} The time from now
     */
    function (value) {
        var /** @type {?} */ timestamp = value.substring(0, 8);
        return this.fromNow.generate(parseInt(timestamp, 16) * 1000);
    };
    /**
     * @return {?}
     */
    GuidFromNowPipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.fromNow.removeTimer();
    };
    GuidFromNowPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'guidFromNow',
                },] },
    ];
    /** @nocollapse */
    GuidFromNowPipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: NgZone, },
    ]; };
    return GuidFromNowPipe;
}());
export { GuidFromNowPipe };
function GuidFromNowPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GuidFromNowPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GuidFromNowPipe.ctorParameters;
    /** @type {?} */
    GuidFromNowPipe.prototype.fromNow;
    /** @type {?} */
    GuidFromNowPipe.prototype.changeDetectorRef;
    /** @type {?} */
    GuidFromNowPipe.prototype.ngZone;
}
var GuidFromNowPipeModule = (function () {
    function GuidFromNowPipeModule() {
    }
    GuidFromNowPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [GuidFromNowPipe],
                    exports: [GuidFromNowPipe],
                    providers: [GuidFromNowPipe],
                },] },
    ];
    /** @nocollapse */
    GuidFromNowPipeModule.ctorParameters = function () { return []; };
    return GuidFromNowPipeModule;
}());
export { GuidFromNowPipeModule };
function GuidFromNowPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    GuidFromNowPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    GuidFromNowPipeModule.ctorParameters;
}
//# sourceMappingURL=guid-from-now.pipe.module.js.map