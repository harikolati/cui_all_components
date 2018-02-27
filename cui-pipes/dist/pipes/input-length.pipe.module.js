/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe } from '@angular/core';
var InputLengthPipe = (function () {
    function InputLengthPipe() {
    }
    /**
     * @param {?} input
     * @param {?} max
     * @return {?}
     */
    InputLengthPipe.prototype.transform = /**
     * @param {?} input
     * @param {?} max
     * @return {?}
     */
    function (input, max) {
        return input.length + " / " + max;
    };
    InputLengthPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'inputLength',
                },] },
    ];
    /** @nocollapse */
    InputLengthPipe.ctorParameters = function () { return []; };
    return InputLengthPipe;
}());
export { InputLengthPipe };
function InputLengthPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    InputLengthPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    InputLengthPipe.ctorParameters;
}
var InputLengthPipeModule = (function () {
    function InputLengthPipeModule() {
    }
    InputLengthPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [InputLengthPipe],
                    exports: [InputLengthPipe],
                    providers: [InputLengthPipe],
                },] },
    ];
    /** @nocollapse */
    InputLengthPipeModule.ctorParameters = function () { return []; };
    return InputLengthPipeModule;
}());
export { InputLengthPipeModule };
function InputLengthPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    InputLengthPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    InputLengthPipeModule.ctorParameters;
}
//# sourceMappingURL=input-length.pipe.module.js.map