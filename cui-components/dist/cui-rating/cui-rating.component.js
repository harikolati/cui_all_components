import { Component, Input, Output, EventEmitter } from '@angular/core';
var CuiRatingComponent = (function () {
    function CuiRatingComponent() {
        /**
             * Event emitted when rating is changed
             */
        this.onUpdate = new EventEmitter();
    }
    /**
     * Sets the rating to a new level
     * @param newRating The new rating.
     */
    /**
         * Sets the rating to a new level
         * @param newRating The new rating.
         */
    CuiRatingComponent.prototype.setRating = /**
         * Sets the rating to a new level
         * @param newRating The new rating.
         */
    function (newRating) {
        this.rating = newRating;
        this.onUpdate.emit(newRating);
    };
    CuiRatingComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-rating',
                    template: "<div class=\"rating__stars\"> <div class=\"rating__star\" (click)=\"setRating(5)\" [ngClass]=\"{'active': rating >= 5}\"> <span class=\"icon-star\"></span> </div> <div class=\"rating__star\" (click)=\"setRating(4)\" [ngClass]=\"{'active': rating >= 4}\"> <span class=\"icon-star\"></span> </div> <div class=\"rating__star\" (click)=\"setRating(3)\"[ngClass]=\"{'active': rating >= 3}\"> <span class=\"icon-star\"></span> </div> <div class=\"rating__star\" (click)=\"setRating(2)\" [ngClass]=\"{'active': rating >= 2}\"> <span class=\"icon-star\"></span> </div> <div class=\"rating__star\" (click)=\"setRating(1)\" [ngClass]=\"{'active': rating >= 1}\"> <span class=\"icon-star\"></span> </div> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiRatingComponent.ctorParameters = function () { return []; };
    CuiRatingComponent.propDecorators = {
        "rating": [{ type: Input },],
        "onUpdate": [{ type: Output },],
    };
    return CuiRatingComponent;
}());
export { CuiRatingComponent };
//# sourceMappingURL=cui-rating.component.js.map