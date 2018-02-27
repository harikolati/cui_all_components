/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe } from '@angular/core';
var ProperCasePipe = (function () {
    function ProperCasePipe() {
    }
    /**
     * Converts text to proper case (first letter of each word capitalized)
     * @param   text The text to convert
     * @returns The converted text
     */
    /**
     * Converts text to proper case (first letter of each word capitalized)
     * @param {?} text The text to convert
     * @return {?} The converted text
     */
    ProperCasePipe.prototype.transform = /**
     * Converts text to proper case (first letter of each word capitalized)
     * @param {?} text The text to convert
     * @return {?} The converted text
     */
    function (text) {
        return text.replace(/\w\S*/g, function (txt) {
            return "" + txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    };
    ProperCasePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'properCase',
                },] },
    ];
    /** @nocollapse */
    ProperCasePipe.ctorParameters = function () { return []; };
    return ProperCasePipe;
}());
export { ProperCasePipe };
function ProperCasePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ProperCasePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ProperCasePipe.ctorParameters;
}
var ProperCasePipeModule = (function () {
    function ProperCasePipeModule() {
    }
    ProperCasePipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ProperCasePipe],
                    exports: [ProperCasePipe],
                    providers: [ProperCasePipe],
                },] },
    ];
    /** @nocollapse */
    ProperCasePipeModule.ctorParameters = function () { return []; };
    return ProperCasePipeModule;
}());
export { ProperCasePipeModule };
function ProperCasePipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ProperCasePipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ProperCasePipeModule.ctorParameters;
}
//# sourceMappingURL=proper-case.pipe.module.js.map