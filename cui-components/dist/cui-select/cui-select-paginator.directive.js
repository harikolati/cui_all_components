import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { isNil } from 'lodash-es';
var DEFAULT_PAGING_SIZE = 100;
var PAGING_INCREMENT = 50;
var LEFTOVER_ITEM_SIZE = 55;
var HIT_TOP_SCROLL_RATIO = 0.51;
var HIT_BOTTOM_SCROLL_RATIO = 0.44;
var CuiSelectPaginatorDirective = (function () {
    function CuiSelectPaginatorDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.scroll = {
            start: 0,
            size: 100,
        };
    }
    Object.defineProperty(CuiSelectPaginatorDirective.prototype, "start", {
        get: function () {
            return this.scroll.start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CuiSelectPaginatorDirective.prototype, "size", {
        get: function () {
            return this.scroll.size;
        },
        enumerable: true,
        configurable: true
    });
    CuiSelectPaginatorDirective.prototype.onScroll = function () {
        if (this.dropdownPaginator) {
            var isTooCloseToBottom = this.el.nativeElement.scrollHeight -
                (this.el.nativeElement.scrollTop + this.el.nativeElement.clientHeight) <
                PAGING_INCREMENT &&
                this.fullDataset.length >= DEFAULT_PAGING_SIZE;
            var isTooCloseToTop = this.el.nativeElement.scrollTop < PAGING_INCREMENT;
            var isScrollingDown = this.el.nativeElement.scrollTop >= this.lastScrollTop;
            this.lastScrollTop = this.el.nativeElement.scrollTop;
            if (isTooCloseToBottom && isScrollingDown) {
                this.paginateUp();
            }
            else if (isTooCloseToTop && !isScrollingDown) {
                this.paginateDown();
            }
        }
    };
    CuiSelectPaginatorDirective.prototype.paginateUp = function () {
        if (this.scroll.start + PAGING_INCREMENT <= this.fullDataset.length - 1) {
            if (this.scroll.start + LEFTOVER_ITEM_SIZE >= this.fullDataset.length - 1) {
                return;
            }
            this.scroll.size = DEFAULT_PAGING_SIZE;
            this.scroll.start += PAGING_INCREMENT;
            this.renderer.setProperty(this.el.nativeElement, 'scrollTop', this.el.nativeElement.scrollHeight * HIT_BOTTOM_SCROLL_RATIO);
        }
    };
    CuiSelectPaginatorDirective.prototype.paginateDown = function () {
        if (this.scroll.start - PAGING_INCREMENT >= 0) {
            this.scroll.start -= PAGING_INCREMENT;
            this.renderer.setProperty(this.el.nativeElement, 'scrollTop', this.el.nativeElement.scrollHeight * HIT_TOP_SCROLL_RATIO);
        }
        else {
            this.scroll.start = 0;
        }
    };
    CuiSelectPaginatorDirective.prototype.ngOnChanges = function (changes) {
        if (!isNil(changes.fullDataset.currentValue) && !this.dropdownPaginator) {
            this.scroll.size = this.fullDataset.length;
        }
    };
    CuiSelectPaginatorDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dropdownPaginator]',
                },] },
    ];
    /** @nocollapse */
    CuiSelectPaginatorDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    CuiSelectPaginatorDirective.propDecorators = {
        "fullDataset": [{ type: Input },],
        "dropdownPaginator": [{ type: Input },],
        "onScroll": [{ type: HostListener, args: ['scroll', [],] },],
    };
    return CuiSelectPaginatorDirective;
}());
export { CuiSelectPaginatorDirective };
//# sourceMappingURL=cui-select-paginator.directive.js.map