/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Utility for retrieving a device's preferred language.
 */
var /**
 * Utility for retrieving a device's preferred language.
 */
Language = (function () {
    function Language() {
    }
    /**
     * Retrieves the user's preferred language.
     * @return The preferred language.
     */
    /**
     * Retrieves the user's preferred language.
     * @return {?} The preferred language.
     */
    Language.getPreferred = /**
     * Retrieves the user's preferred language.
     * @return {?} The preferred language.
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
                    return navigator_1[location_1][0];
                }
                return navigator_1[location_1];
            }
        }
        return 'en_us';
    };
    return Language;
}());
/**
 * Utility for retrieving a device's preferred language.
 */
export { Language };
/**
 * @record
 */
export function LocationNavigator() { }
function LocationNavigator_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [key: string]: any;
    */
}
//# sourceMappingURL=language.js.map