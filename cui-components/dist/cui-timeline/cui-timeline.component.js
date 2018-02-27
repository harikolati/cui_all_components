import { Component, Input } from '@angular/core';
var CuiTimelineComponent = (function () {
    function CuiTimelineComponent() {
        /**
             * Items to display in the timeline.
             */
        this.items = [];
        /**
             * Whether to display timeline items in block width.
             */
        this.block = false;
        /**
             * Whether to vertically center timeline content.
             */
        this.centered = false;
        /**
             * Whether to animate timeline items on hover.
             */
        this.animated = true;
    }
    CuiTimelineComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-timeline',
                    template: "<div class=\"timeline\" [ngClass]=\"{'timeline--block': block, 'timeline--centered': centered, 'timeline--animation': animated}\"> <div class=\"timeline__list\"> <div class=\"timeline__item\" *ngFor=\"let item of items\"> <div class=\"timeline__icon {{item.colorClass}}\"></div> <div class=\"timeline__time\">{{item.formattedTime}}</div> <div class=\"timeline__content\" [innerHtml]=\"item.content\" *ngIf=\"item.content\"></div> <div class=\"timeline__content\" *ngIf=\"item.template && !item.content\"> <ng-container *ngTemplateOutlet=\"item.template; context: {data: item.data}\"></ng-container> </div> </div> </div> </div>",
                },] },
    ];
    /** @nocollapse */
    CuiTimelineComponent.ctorParameters = function () { return []; };
    CuiTimelineComponent.propDecorators = {
        "items": [{ type: Input },],
        "block": [{ type: Input },],
        "centered": [{ type: Input },],
        "animated": [{ type: Input },],
    };
    return CuiTimelineComponent;
}());
export { CuiTimelineComponent };
//# sourceMappingURL=cui-timeline.component.js.map