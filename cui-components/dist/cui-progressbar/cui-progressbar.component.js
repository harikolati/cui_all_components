import { Component, Input } from '@angular/core';
var CuiProgressbarComponent = (function () {
    function CuiProgressbarComponent() {
        /**
             * Flag to display percent complete message below the progressbar
             */
        this.subtitle = false;
        /**
             * Flag to display progressbar as thin or not
             */
        this.thin = false;
    }
    CuiProgressbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-progressbar',
                    template: "<div class=\"progressbar\" [ngClass]=\"{'progressbar--thin': thin}\"> <div class=\"progressbar__header-msg\" [innerHTML]=\"title\"></div> <div class=\"progressbar__bar label--ltgray\"> <div class=\"progressbar__bar-solid\"></div> <div class=\"progressbar__bar-mask\" [ngStyle]=\"{'left' : percentage + '%'}\"></div> </div> <div *ngIf=\"subtitle\" class=\"progressbar__percent-complete-msg\">{{(percentage/100 | percent:'1.0-0') + ' Complete'}} </div> </div> ",
                    styles: [".progressbar { background: transparent; text-align: center; width: auto; /* progressbar color varieties */ } .progressbar__header-msg { color: inherit; font-size: 62.5%; font-weight: 300; margin-bottom: 10px; } .progressbar__bar { height: 30px; border-radius: 15px; background: #ffffff; box-shadow: 1px 1px 1px rgba(85, 85, 85, 0.2); position: relative; overflow: hidden; } .progressbar__bar-solid { background: #049fd9; position: absolute; top: 2px; left: 2px; right: 2px; bottom: 2px; border-radius: 15px; } .progressbar__bar-mask { background: #ffffff; position: absolute; transition: left 0.4s ease; top: 1px; left: 1px; right: 1px; bottom: 1px; border-top-right-radius: 15px; border-bottom-right-radius: 15px; } .progressbar__percent-complete-msg { margin-top: 10px; font-size: 12px; } .progressbar--thin .progressbar__bar { height: 10px; } .progressbar--success .progressbar__bar-solid { background: #6cc04a; } .progressbar--warning .progressbar__bar-solid { background: #ff7300; } .progressbar--danger .progressbar__bar-solid { background: #cf2030; } .progressbar--cta .progressbar__bar-solid { background: #abc233; } .background--success { background: #6cc04a; } .background--danger { background: #cf2030; } .background--warning { background: #ff7300; } "],
                },] },
    ];
    /** @nocollapse */
    CuiProgressbarComponent.ctorParameters = function () { return []; };
    CuiProgressbarComponent.propDecorators = {
        "title": [{ type: Input },],
        "percentage": [{ type: Input },],
        "subtitle": [{ type: Input },],
        "thin": [{ type: Input },],
    };
    return CuiProgressbarComponent;
}());
export { CuiProgressbarComponent };
//# sourceMappingURL=cui-progressbar.component.js.map