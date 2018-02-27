/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule, Pipe } from '@angular/core';
var FileSizePipe = (function () {
    function FileSizePipe() {
    }
    /**
     * Returns a readable file size from bytes
     * @param  _size The file size in bytes
     * @returns The readable file size
     */
    /**
     * Returns a readable file size from bytes
     * @param {?} _size The file size in bytes
     * @return {?} The readable file size
     */
    FileSizePipe.prototype.transform = /**
     * Returns a readable file size from bytes
     * @param {?} _size The file size in bytes
     * @return {?} The readable file size
     */
    function (_size) {
        var /** @type {?} */ size = _size;
        var /** @type {?} */ units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var /** @type {?} */ unit = units.find(function () {
            if (size / 1024 >= 1) {
                size /= 1024;
                return false;
            }
            return true;
        });
        var /** @type {?} */ roundedSize = Math.round(parseFloat(size.toFixed(2)) * 10) / 10;
        return roundedSize + " " + unit;
    };
    FileSizePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'fileSize',
                },] },
    ];
    /** @nocollapse */
    FileSizePipe.ctorParameters = function () { return []; };
    return FileSizePipe;
}());
export { FileSizePipe };
function FileSizePipe_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FileSizePipe.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FileSizePipe.ctorParameters;
}
var FileSizePipeModule = (function () {
    function FileSizePipeModule() {
    }
    FileSizePipeModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [FileSizePipe],
                    exports: [FileSizePipe],
                    providers: [FileSizePipe],
                },] },
    ];
    /** @nocollapse */
    FileSizePipeModule.ctorParameters = function () { return []; };
    return FileSizePipeModule;
}());
export { FileSizePipeModule };
function FileSizePipeModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FileSizePipeModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FileSizePipeModule.ctorParameters;
}
//# sourceMappingURL=file-size.pipe.module.js.map