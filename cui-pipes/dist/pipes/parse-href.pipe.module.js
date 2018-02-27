/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe } from '@angular/core';
var ParseHrefPipe = (function () {
    function ParseHrefPipe() {
    }
    /**
     * Adds or removes a target from anchor tags
     * @param   _text     The text containing anchor tags
     * @param   [target] The target for the anchor
     * @returns The reformatted text
     */
    /**
     * Adds or removes a target from anchor tags
     * @param {?} _text     The text containing anchor tags
     * @param {?=} target
     * @return {?} The reformatted text
     */
    ParseHrefPipe.prototype.transform = /**
     * Adds or removes a target from anchor tags
     * @param {?} _text     The text containing anchor tags
     * @param {?=} target
     * @return {?} The reformatted text
     */
    function (_text, target) {
        if (target === void 0) { target = ''; }
        var /** @type {?} */ text = _text;
        var /** @type {?} */ urlPattern = /(<a.*?href=)?/gi;
        var /** @type {?} */ urls = text.match(urlPattern);
        for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
            var url = urls_1[_i];
            if (url.substring(0, 2) === '<a' && target.length) {
                text = text.replace(url, "<a target=\"" + target + "\"" + url.substring(2, url.length));
            }
        }
        return text;
    };
    ParseHrefPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'parseHref',
                },] },
    ];
    /** @nocollapse */
    ParseHrefPipe.ctorParameters = function () { return []; };
    return ParseHrefPipe;
}());
export { ParseHrefPipe };
function ParseHrefPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ParseHrefPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ParseHrefPipe.ctorParameters;
}
var ParseHrefPipeModule = (function () {
    function ParseHrefPipeModule() {
    }
    ParseHrefPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ParseHrefPipe],
                    exports: [ParseHrefPipe],
                    providers: [ParseHrefPipe],
                },] },
    ];
    /** @nocollapse */
    ParseHrefPipeModule.ctorParameters = function () { return []; };
    return ParseHrefPipeModule;
}());
export { ParseHrefPipeModule };
function ParseHrefPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ParseHrefPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ParseHrefPipeModule.ctorParameters;
}
//# sourceMappingURL=parse-href.pipe.module.js.map