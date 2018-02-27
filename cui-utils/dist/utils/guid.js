/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Utility for generating globally unique IDs.
 */
var /**
 * Utility for generating globally unique IDs.
 */
Guid = (function () {
    function Guid() {
    }
    /**
     * Generates a globally unique ID.
     * @return The generated Guid.
     */
    /**
     * Generates a globally unique ID.
     * @return {?} The generated Guid.
     */
    Guid.generate = /**
     * Generates a globally unique ID.
     * @return {?} The generated Guid.
     */
    function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var /** @type {?} */ r = Math.floor(Math.random() * 16);
            var /** @type {?} */ v = r;
            if (c === 'y') {
                v = r ? 3 : 8;
            }
            return v.toString(16);
        });
    };
    return Guid;
}());
/**
 * Utility for generating globally unique IDs.
 */
export { Guid };
//# sourceMappingURL=guid.js.map