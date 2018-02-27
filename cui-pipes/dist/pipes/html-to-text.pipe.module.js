/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe } from '@angular/core';
var HtmlToTextPipe = (function () {
    function HtmlToTextPipe() {
    }
    /**
     * Removes HTML markup from a string
     * @param   text The HTML text
     * @returns The stripped text
     */
    /**
     * Removes HTML markup from a string
     * @param {?} text The HTML text
     * @return {?} The stripped text
     */
    HtmlToTextPipe.prototype.transform = /**
     * Removes HTML markup from a string
     * @param {?} text The HTML text
     * @return {?} The stripped text
     */
    function (text) {
        return text.replace(/<[^>]+>/gm, '');
    };
    HtmlToTextPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'htmlToText',
                },] },
    ];
    /** @nocollapse */
    HtmlToTextPipe.ctorParameters = function () { return []; };
    return HtmlToTextPipe;
}());
export { HtmlToTextPipe };
function HtmlToTextPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HtmlToTextPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HtmlToTextPipe.ctorParameters;
}
var HtmlToTextPipeModule = (function () {
    function HtmlToTextPipeModule() {
    }
    HtmlToTextPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [HtmlToTextPipe],
                    exports: [HtmlToTextPipe],
                    providers: [HtmlToTextPipe],
                },] },
    ];
    /** @nocollapse */
    HtmlToTextPipeModule.ctorParameters = function () { return []; };
    return HtmlToTextPipeModule;
}());
export { HtmlToTextPipeModule };
function HtmlToTextPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HtmlToTextPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HtmlToTextPipeModule.ctorParameters;
}
//# sourceMappingURL=html-to-text.pipe.module.js.map