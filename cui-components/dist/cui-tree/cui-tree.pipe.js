import { Pipe } from '@angular/core';
var CuiTreePipe = (function () {
    function CuiTreePipe() {
    }
    CuiTreePipe.prototype.transform = function (items) {
        return items.filter(function (item) { return item.show; });
    };
    CuiTreePipe.decorators = [
        { type: Pipe, args: [{
                    name: 'treeShowFilter',
                    pure: false,
                },] },
    ];
    /** @nocollapse */
    CuiTreePipe.ctorParameters = function () { return []; };
    return CuiTreePipe;
}());
export { CuiTreePipe };
//# sourceMappingURL=cui-tree.pipe.js.map