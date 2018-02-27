/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, Output, Input, EventEmitter } from '@angular/core';
import { Directionality } from './directionality';
/**
 * Directive to listen for changes of direction of part of the DOM.
 *
 * Provides itself as Directionality such that descendant directives only need to ever inject
 * Directionality to get the closest direction.
 */
var Dir = (function () {
    function Dir() {
        this._dir = 'ltr';
        /** Whether the `value` has been set to its initial value. */
        this._isInitialized = false;
        /** Event emitted when the direction changes. */
        this.change = new EventEmitter();
    }
    Object.defineProperty(Dir.prototype, "dir", {
        get: /** @docs-private */
        function () { return this._dir; },
        set: function (v) {
            var old = this._dir;
            this._dir = v;
            if (old !== this._dir && this._isInitialized) {
                this.change.emit();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dir.prototype, "value", {
        /** Current layout direction of the element. */
        get: /** Current layout direction of the element. */
        function () { return this.dir; },
        enumerable: true,
        configurable: true
    });
    /** Initialize once default value has been set. */
    /** Initialize once default value has been set. */
    Dir.prototype.ngAfterContentInit = /** Initialize once default value has been set. */
    function () {
        this._isInitialized = true;
    };
    Dir.decorators = [
        { type: Directive, args: [{
                    selector: '[dir]',
                    providers: [{ provide: Directionality, useExisting: Dir }],
                    host: { '[dir]': 'dir' },
                    exportAs: 'dir',
                },] },
    ];
    /** @nocollapse */
    Dir.ctorParameters = function () { return []; };
    Dir.propDecorators = {
        "change": [{ type: Output, args: ['dirChange',] },],
        "dir": [{ type: Input, args: ['dir',] },],
    };
    return Dir;
}());
export { Dir };
//# sourceMappingURL=dir.js.map