/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Language } from './language';
import { find } from 'lodash-es';
var I18nDictionaryItem = (function () {
    function I18nDictionaryItem(key, value) {
        this.key = key;
        this.value = value;
    }
    return I18nDictionaryItem;
}());
export { I18nDictionaryItem };
function I18nDictionaryItem_tsickle_Closure_declarations() {
    /** @type {?} */
    I18nDictionaryItem.prototype.key;
    /** @type {?} */
    I18nDictionaryItem.prototype.value;
}
/**
 * Utility for setting and retrieving internationalized strings
 */
var I18n = (function () {
    function I18n() {
    }
    /**
     * Returns the current dictionary
     * @return {?} The dictionary
     */
    I18n.getDictionary = /**
     * Returns the current dictionary
     * @return {?} The dictionary
     */
    function () {
        return this.dictionary;
    };
    /**
     * Retrieves an internationalized string
     * @param {?} key    The key of the dictionary item to retrieve
     * @param {?=} values Optional values to inject into the result (item must have {x} binding).
     *   Send an array of values for multiple bindings.
     * @return {?} The internationalized string
     */
    I18n.get = /**
     * Retrieves an internationalized string
     * @param {?} key    The key of the dictionary item to retrieve
     * @param {?=} values Optional values to inject into the result (item must have {x} binding).
     *   Send an array of values for multiple bindings.
     * @return {?} The internationalized string
     */
    function (key, values) {
        if (values === void 0) { values = null; }
        var /** @type {?} */ item = find(this.dictionary, function (itm) { return itm.key === key; });
        if (!item) {
            return '';
        }
        if (values === null) {
            return item.value;
        }
        if (Array.isArray(values)) {
            var /** @type {?} */ result = item.value.toString();
            for (var /** @type {?} */ i = 0; i < values.length; i += 1) {
                result = result.split("{" + i + "}").join(values[i].toString());
            }
            return result;
        }
        if (typeof values === 'object') {
            return item.value.replace(/\{0\}/, JSON.stringify(values));
        }
        return item.value.replace(/\{0\}/, values);
    };
    /**
     * Appends and replaces items in the current dictionary
     * @param {?} newDictionary Array of {key: 'key', value: 'value'} objects to inject
     * @return {?}
     */
    I18n.injectDictionary = /**
     * Appends and replaces items in the current dictionary
     * @param {?} newDictionary Array of {key: 'key', value: 'value'} objects to inject
     * @return {?}
     */
    function (newDictionary) {
        for (var _i = 0, newDictionary_1 = newDictionary; _i < newDictionary_1.length; _i++) {
            var item = newDictionary_1[_i];
            if (!item['key'] || !item['value']) {
                continue;
            }
            var /** @type {?} */ match = false;
            for (var /** @type {?} */ i = 0; i < this.dictionary.length; i += 1) {
                if (item['key'] === this.dictionary[i].key) {
                    this.dictionary[i] = new I18nDictionaryItem(item['key'], item['value']);
                    match = true;
                    break;
                }
            }
            if (!match) {
                this.dictionary.push(new I18nDictionaryItem(item['key'], item['value']));
            }
        }
    };
    /**
     * Rebuilds the dictionary with the provided language
     * @param {?} language The language of the rebuilt dictionary
     * @param {?=} dictionary Array of {key: 'key', value: 'value'} objects to inject
     * @return {?}
     */
    I18n.buildDictionary = /**
     * Rebuilds the dictionary with the provided language
     * @param {?} language The language of the rebuilt dictionary
     * @param {?=} dictionary Array of {key: 'key', value: 'value'} objects to inject
     * @return {?}
     */
    function (language, dictionary) {
        if (dictionary === void 0) { dictionary = null; }
        this.language = language;
        this.dictionary = [];
        if (dictionary) {
            this.injectDictionary(dictionary);
        }
    };
    /**
     * The currently set language
     */
    I18n.language = Language.getPreferred();
    I18n.dictionary = [];
    return I18n;
}());
export { I18n };
function I18n_tsickle_Closure_declarations() {
    /**
     * The currently set language
     * @type {?}
     */
    I18n.language;
    /** @type {?} */
    I18n.dictionary;
}
//# sourceMappingURL=i18n.js.map