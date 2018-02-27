/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe } from '@angular/core';
var ParseUrlPipe = (function () {
    function ParseUrlPipe() {
    }
    /**
     * Converts text with URLs to anchor tags
     * @param   _text      The text containing URLs
     * @param   [target]  The target for the anchors
     * @param   [shorten] Whether to shorten the URL
     * @returns The reformatted text
     */
    /**
     * Converts text with URLs to anchor tags
     * @param {?} _text      The text containing URLs
     * @param {?=} target
     * @param {?=} shorten
     * @return {?} The reformatted text
     */
    ParseUrlPipe.prototype.transform = /**
     * Converts text with URLs to anchor tags
     * @param {?} _text      The text containing URLs
     * @param {?=} target
     * @param {?=} shorten
     * @return {?} The reformatted text
     */
    function (_text, target, shorten) {
        if (target === void 0) { target = ''; }
        if (shorten === void 0) { shorten = false; }
        var /** @type {?} */ text = _text;
        /* tslint:disable-next-line max-line-length ter-max-len */
        var /** @type {?} */ urlPattern = /(<a.*?href=("|'))?(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
        var /** @type {?} */ urls = text.match(urlPattern);
        for (var _i = 0, urls_1 = urls; _i < urls_1.length; _i++) {
            var url = urls_1[_i];
            if (url.charAt(0) === '<') {
                continue;
            }
            text = text.replace(url, "<a target=\"" + target + "\" href=\"" + url + "\">" + (shorten ? this.shortenUrl(url) : url) + "</a>");
        }
        return text;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    ParseUrlPipe.prototype.shortenUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var /** @type {?} */ components = url.split('/');
        for (var /** @type {?} */ i = 0; i < components.length; i += 1) {
            if (!components[i] || !components[i].length) {
                components.splice(i, 1);
                i -= 1;
            }
        }
        return components.pop();
    };
    ParseUrlPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'parseUrl',
                },] },
    ];
    /** @nocollapse */
    ParseUrlPipe.ctorParameters = function () { return []; };
    return ParseUrlPipe;
}());
export { ParseUrlPipe };
function ParseUrlPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ParseUrlPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ParseUrlPipe.ctorParameters;
}
var ParseUrlPipeModule = (function () {
    function ParseUrlPipeModule() {
    }
    ParseUrlPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [ParseUrlPipe],
                    exports: [ParseUrlPipe],
                    providers: [ParseUrlPipe],
                },] },
    ];
    /** @nocollapse */
    ParseUrlPipeModule.ctorParameters = function () { return []; };
    return ParseUrlPipeModule;
}());
export { ParseUrlPipeModule };
function ParseUrlPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ParseUrlPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ParseUrlPipeModule.ctorParameters;
}
//# sourceMappingURL=parse-url.pipe.module.js.map