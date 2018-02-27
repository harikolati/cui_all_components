import { Component, Input, Output, EventEmitter } from '@angular/core';
var CuiPagerComponent = (function () {
    function CuiPagerComponent() {
        /**
             * The current page index.
             */
        this.page = 0;
        /**
             * Event emitted when the page is changed.
             */
        this.onPageChanged = new EventEmitter();
    }
    CuiPagerComponent.prototype.ngOnInit = function () {
        this.lastPage = Math.ceil(this.totalItems / this.limit) - 1;
        this.refreshPageDetails();
    };
    CuiPagerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.totalItems || changes.limit) {
            this.lastPage = Math.ceil(this.totalItems / this.limit) - 1;
            this.refreshPageDetails();
        }
    };
    CuiPagerComponent.prototype.gotoPage = function (page) {
        this.page = page;
        this.onPageChanged.emit(this.page);
        this.refreshPageDetails();
    };
    CuiPagerComponent.prototype.refreshPageDetails = function () {
        /* tslint:disable-next-line max-line-length ter-max-len */
        this.pageDetails = this.page * this.limit + 1 + "-" + Math.min(this.page * this.limit + this.limit, this.totalItems) + " of " + this.totalItems;
    };
    CuiPagerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-pager',
                    template: "<div class=\"cui-pager\"> <div class=\"flex-center-vertical\"> <span class=\"base-margin-right\"> <span class=\"text-muted\">{{pageDetails}}</span> </span> <span> <a class=\"link\" [attr.disabled]=\"page === 0 ? true : null\" (click)=\"gotoPage(0)\"> <span class=\"icon-step-backward\"></span> </a> </span> <span> <a class=\"link\" [attr.disabled]=\"page === 0 ? true : null\" (click)=\"gotoPage(page - 1)\"> <span class=\"icon-step-prev\"></span> </a> </span> <span> <a class=\"link\" [attr.disabled]=\"page === lastPage ? true : null\" (click)=\"gotoPage(page + 1)\"> <span class=\"icon-step-next\"></span> </a> </span> <span> <a class=\"link\" [attr.disabled]=\"page === lastPage ? true : null\" (click)=\"gotoPage(lastPage)\"> <span class=\"icon-step-forward\"></span> </a> </span> </div> </div> ",
                    styles: [".full-page { position: fixed; top: 0; right: 0; bottom: 0; left: 0; } .divider--vertical > :after { color: #9e9ea2; content: '|'; margin: 0 5px; padding: 0; } .cui-pager { display: flex; align-items: center; justify-content: flex-end; position: relative; } .cui-pager span + span:before { color: #9e9ea2; content: '|'; margin: 0 5px; padding: 0; content: ' '; } "],
                },] },
    ];
    /** @nocollapse */
    CuiPagerComponent.ctorParameters = function () { return []; };
    CuiPagerComponent.propDecorators = {
        "page": [{ type: Input },],
        "limit": [{ type: Input },],
        "totalItems": [{ type: Input },],
        "onPageChanged": [{ type: Output },],
    };
    return CuiPagerComponent;
}());
export { CuiPagerComponent };
//# sourceMappingURL=cui-pager.component.js.map