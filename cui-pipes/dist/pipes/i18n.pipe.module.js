/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable, Pipe, NgModule } from '@angular/core';
import { get, isEmpty, isNil, reduce } from 'lodash-es';
var /** @type {?} */ _ = { get: get, isEmpty: isEmpty, isNil: isNil, reduce: reduce };
/**
 * @record
 */
function I18nDictionary() { }
function I18nDictionary_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [key: string]: string;
    */
}
/**
 * @record
 */
function LocationNavigator() { }
function LocationNavigator_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [key: string]: any;
    */
}
var /** @type {?} */ dictionary = {};
var I18nPipe = (function () {
    function I18nPipe() {
    }
    /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    I18nPipe.prototype.transform = /**
     * @param {?} value
     * @param {...?} args
     * @return {?}
     */
    function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var /** @type {?} */ entry = _.get(dictionary, value, '');
        if (!_.isEmpty(entry)) {
            return _.reduce(args, function (memo, variable, i) {
                return memo.replace(new RegExp("\\{" + i + "\\}", 'g'), variable);
            }, entry);
        }
        return '';
    };
    I18nPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'i18n',
                },] },
    ];
    /** @nocollapse */
    I18nPipe.ctorParameters = function () { return []; };
    return I18nPipe;
}());
export { I18nPipe };
function I18nPipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    I18nPipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    I18nPipe.ctorParameters;
}
var I18nService = (function () {
    function I18nService() {
        this.language = 'en_us';
    }
    /**
     * @return {?}
     */
    I18nService.prototype.getPreferredLanguage = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ possibleLanguageLocations = [
            'languages',
            'language',
            'browserLanguage',
            'userLanguage',
            'systemLanguage',
        ];
        for (var _i = 0, possibleLanguageLocations_1 = possibleLanguageLocations; _i < possibleLanguageLocations_1.length; _i++) {
            var location_1 = possibleLanguageLocations_1[_i];
            var /** @type {?} */ navigator_1 = window.navigator;
            if (navigator_1[location_1]) {
                if (Array.isArray(navigator_1[location_1])) {
                    return navigator_1[location_1][0].toLowerCase();
                }
                return navigator_1[location_1].toLowerCase();
            }
        }
        return 'en-us';
    };
    /**
     * @param {?} dictionaries
     * @param {?=} forceLocale
     * @return {?}
     */
    I18nService.prototype.injectDictionary = /**
     * @param {?} dictionaries
     * @param {?=} forceLocale
     * @return {?}
     */
    function (dictionaries, forceLocale) {
        var /** @type {?} */ locale = (!_.isNil(forceLocale)) ? forceLocale : this.getPreferredLanguage();
        // always load the english locale into memory first
        // there's no telling what keys might exist or not
        // in the other locales, or what locales might not
        // even exist
        if (locale !== 'en-us') {
            for (var /** @type {?} */ key in dictionaries['en-us']) {
                if (dictionaries[locale].hasOwnProperty(key)) {
                    dictionary[key] = dictionaries[locale][key];
                }
            }
        }
        for (var /** @type {?} */ key in dictionaries[locale]) {
            if (dictionaries[locale].hasOwnProperty(key)) {
                dictionary[key] = dictionaries[locale][key];
            }
        }
    };
    I18nService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    I18nService.ctorParameters = function () { return []; };
    return I18nService;
}());
export { I18nService };
function I18nService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    I18nService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    I18nService.ctorParameters;
    /** @type {?} */
    I18nService.prototype.language;
}
var I18nPipeModule = (function () {
    function I18nPipeModule() {
    }
    I18nPipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [I18nPipe],
                    exports: [I18nPipe],
                    providers: [I18nService, I18nPipe],
                },] },
    ];
    /** @nocollapse */
    I18nPipeModule.ctorParameters = function () { return []; };
    return I18nPipeModule;
}());
export { I18nPipeModule };
function I18nPipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    I18nPipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    I18nPipeModule.ctorParameters;
}
//# sourceMappingURL=i18n.pipe.module.js.map