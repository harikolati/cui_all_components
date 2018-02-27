/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe, NgZone, ChangeDetectorRef, } from '@angular/core';
import { FromNow } from './from-now.class';
var FromNowPipe = (function () {
    function FromNowPipe(changeDetectorRef, ngZone) {
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.fromNow = new FromNow(this.changeDetectorRef, this.ngZone);
    }
    /**
     * @param {?} value
     * @param {?=} unix
     * @return {?}
     */
    FromNowPipe.prototype.transform = /**
     * @param {?} value
     * @param {?=} unix
     * @return {?}
     */
    function (value, unix) {
        return this.fromNow.generate(unix && typeof value === 'number' ? value * 1000 : value);
    };
    /**
     * @return {?}
     */
    FromNowPipe.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.fromNow.removeTimer();
    };
    FromNowPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'fromNow',
                    pure: false,
                },] },
    ];
    /** @nocollapse */
    FromNowPipe.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: NgZone, },
    ]; };
    return FromNowPipe;
}());
export { FromNowPipe };
function FromNowPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FromNowPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FromNowPipe.ctorParameters;
    /** @type {?} */
    FromNowPipe.prototype.fromNow;
    /** @type {?} */
    FromNowPipe.prototype.changeDetectorRef;
    /** @type {?} */
    FromNowPipe.prototype.ngZone;
}
var FromNowPipeModule = (function () {
    function FromNowPipeModule() {
    }
    FromNowPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FromNowPipe],
                    exports: [FromNowPipe],
                    providers: [FromNowPipe],
                },] },
    ];
    /** @nocollapse */
    FromNowPipeModule.ctorParameters = function () { return []; };
    return FromNowPipeModule;
}());
export { FromNowPipeModule };
function FromNowPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FromNowPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FromNowPipeModule.ctorParameters;
}
//# sourceMappingURL=from-now.pipe.module.js.map