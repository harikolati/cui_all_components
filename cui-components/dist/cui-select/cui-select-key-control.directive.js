import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer2, ContentChildren, QueryList } from '@angular/core';
import { get, inRange, invoke, isNil } from 'lodash-es';
var ENTER = 13;
var UP_ARROW = 38;
var DOWN_ARROW = 40;
var SCROLL_AMT = 40;
var HOVER_BG_COLOR = 'rgb(4, 159, 217)';
var NORMAL_BG_COLOR = 'rgba(0, 0, 0, 0)';
var NORMAL_FONT_COLOR = 'rgb(88, 88, 91)';
var NORMAL_FONT_WEIGHT = 300;
export var HoverToggle;
(function (HoverToggle) {
    HoverToggle[HoverToggle["OFF"] = 0] = "OFF";
    HoverToggle[HoverToggle["ON"] = 1] = "ON";
})(HoverToggle || (HoverToggle = {}));
var CuiSelectKeyControlDirective = (function () {
    function CuiSelectKeyControlDirective(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.needsHoverDetection = true;
        this.justScrolled = false;
        this.upArrowHidingDropdown = false;
        this.keydownNavIndex = -1;
        this.dropdownVisibleChange = new EventEmitter();
        this.onEnterKey = new EventEmitter();
        this.dropdownOptions = [];
    }
    CuiSelectKeyControlDirective.prototype.onMouseEnter = function () {
        var _this = this;
        this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
        this.dropdownOptions.forEach(function () { return _this.setHoverBackground(HoverToggle.OFF); });
        this.toggleHoverCSS(HoverToggle.ON);
    };
    CuiSelectKeyControlDirective.prototype.onKeyDown = function ($event) {
        this.detectCurrentHoveredIndex();
        // key navigation logic
        switch ($event.keyCode) {
            case ENTER:
                // set the model to the selected option
                if (inRange(this.keydownNavIndex, 0, this.fullDataset.length)) {
                    this.onEnterKey.emit(this.keydownNavIndex);
                }
                break;
            case UP_ARROW:
                // hide dropdown when first option is highlighted and up key pressed
                if (this.keydownNavIndex <= 0) {
                    if (this.keydownNavIndex === 0) {
                        this.keydownNavIndex -= 1;
                    }
                    this.upArrowHidingDropdown = true;
                    this.hideDropdown();
                    return;
                }
                // move highlight up
                this.setHoverBackground(HoverToggle.OFF);
                this.keydownNavIndex -= 1;
                this.setAllOptionsBackgroundWhite($event);
                this.setHoverBackground(HoverToggle.ON);
                this.detectNeedsScroll(this.dropdownOptions[this.keydownNavIndex]);
                break;
            case DOWN_ARROW:
                if (this.keydownNavIndex >= this.dropdownOptions.length - 1) {
                    // if current element is the last option, don't go down any further
                    this.setHoverBackground(HoverToggle.ON);
                    return;
                }
                // move highlight down
                if (this.keydownNavIndex !== -1) {
                    this.setHoverBackground(HoverToggle.OFF);
                }
                this.keydownNavIndex += 1;
                this.setAllOptionsBackgroundWhite($event);
                this.setHoverBackground(HoverToggle.ON);
                this.detectNeedsScroll(this.dropdownOptions[this.keydownNavIndex]);
                break;
            default:
        }
    };
    CuiSelectKeyControlDirective.prototype.getElementStyle = function (el) {
        return window.getComputedStyle(el, null);
    };
    CuiSelectKeyControlDirective.prototype.hideDropdown = function () {
        this.dropdownVisible = false;
        this.dropdownVisibleChange.emit(this.dropdownVisible);
    };
    CuiSelectKeyControlDirective.prototype.detectCurrentHoveredIndex = function () {
        var _this = this;
        this.hoveredOption = this.dropdownOptions
            .filter(function (option) {
            return _this.getElementStyle(option.nativeElement)
                .backgroundColor === HOVER_BG_COLOR;
        }).pop();
        this.keydownNavIndex = this.dropdownOptions.indexOf(this.hoveredOption);
    };
    CuiSelectKeyControlDirective.prototype.setHoverBackground = function (state) {
        var hoveredElem = get(this.dropdownOptions, [this.keydownNavIndex, 'nativeElement']);
        if (!isNil(hoveredElem)) {
            if (state === HoverToggle.ON) {
                this.renderer.addClass(hoveredElem, 'active');
                this.renderer.removeStyle(hoveredElem, 'backgroundColor');
                this.renderer.removeStyle(hoveredElem, 'color');
                this.renderer.removeStyle(hoveredElem, 'font-weight');
            }
            else {
                this.renderer.removeClass(hoveredElem, 'active');
            }
        }
    };
    CuiSelectKeyControlDirective.prototype.toggleHoverCSS = function (state) {
        var _this = this;
        this.dropdownOptions.forEach(function (option) {
            if (!isNil(option)) {
                if (state === HoverToggle.OFF) {
                    _this.renderer
                        .setStyle(option.nativeElement, 'backgroundColor', NORMAL_BG_COLOR);
                    _this.renderer.setStyle(option.nativeElement, 'color', NORMAL_FONT_COLOR);
                    _this.renderer.setStyle(option.nativeElement, 'font-weight', NORMAL_FONT_WEIGHT);
                }
                else {
                    _this.renderer.removeStyle(option.nativeElement, 'backgroundColor');
                    _this.renderer.removeStyle(option.nativeElement, 'color');
                    _this.renderer.removeStyle(option.nativeElement, 'font-weight');
                }
            }
        });
    };
    CuiSelectKeyControlDirective.prototype.setAllOptionsBackgroundWhite = function ($event) {
        if ([UP_ARROW, DOWN_ARROW].includes($event.keyCode)) {
            this.toggleHoverCSS(HoverToggle.OFF);
        }
    };
    CuiSelectKeyControlDirective.prototype.detectNeedsScroll = function (elem) {
        var dropdownElem = get(this, 'el.nativeElement');
        var hoverElem = get(elem, 'nativeElement');
        var dropdownTop = get(dropdownElem, 'scrollTop');
        var dropdownBottom = dropdownTop + get(dropdownElem, 'offsetHeight');
        var elemTop = get(hoverElem, 'offsetTop');
        var elemBottom = elemTop + get(hoverElem, 'offsetHeight');
        if (elemBottom > dropdownBottom || elemTop < dropdownTop) {
            if (elemBottom > dropdownBottom) {
                this.renderer.setProperty(dropdownElem, 'scrollTop', dropdownTop + SCROLL_AMT);
            }
            else if (elemTop < dropdownTop) {
                this.renderer.setProperty(dropdownElem, 'scrollTop', dropdownTop - SCROLL_AMT);
            }
        }
    };
    CuiSelectKeyControlDirective.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.queryListSub = this.dropdownOptionsList.changes
            .subscribe(function (updated) {
            _this.dropdownOptions = updated.toArray();
        });
    };
    CuiSelectKeyControlDirective.prototype.ngOnDestroy = function () {
        invoke(this, 'queryListSub.unsubscribe');
    };
    CuiSelectKeyControlDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[dropdownKeyControl]',
                },] },
    ];
    /** @nocollapse */
    CuiSelectKeyControlDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    CuiSelectKeyControlDirective.propDecorators = {
        "dropdownVisible": [{ type: Input },],
        "fullDataset": [{ type: Input },],
        "dropdownVisibleChange": [{ type: Output },],
        "onEnterKey": [{ type: Output },],
        "dropdownOptionsList": [{ type: ContentChildren, args: ['dropdownOption',] },],
        "onMouseEnter": [{ type: HostListener, args: ['mousemove',] },],
        "onKeyDown": [{ type: HostListener, args: ['window:keydown', ['$event'],] },],
    };
    return CuiSelectKeyControlDirective;
}());
export { CuiSelectKeyControlDirective };
//# sourceMappingURL=cui-select-key-control.directive.js.map