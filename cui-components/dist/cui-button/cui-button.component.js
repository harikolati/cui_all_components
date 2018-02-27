import { Component, HostBinding, HostListener, Input, ElementRef, } from '@angular/core';
var CuiButtonComponent = (function () {
    function CuiButtonComponent(elementRef) {
        var _this = this;
        this.class = 'btn';
        this.clickFn = function (e) {
            if (_this.animated) {
                var X = e.pageX - _this.getOffsetLeft(_this.elem);
                var Y = e.pageY - _this.getOffsetTop(_this.elem);
                var rippleDiv_1 = document.createElement('div');
                rippleDiv_1.classList.add('ripple');
                rippleDiv_1.setAttribute('style', "top: " + Y + "px; left: " + X + "px;");
                var customColor = _this.elem.getAttribute('ripple-color');
                if (customColor) {
                    rippleDiv_1.style.background = customColor;
                }
                _this.elem.appendChild(rippleDiv_1);
                setTimeout(function () {
                    rippleDiv_1.parentElement.removeChild(rippleDiv_1);
                }, 900);
            }
        };
        this.elem = elementRef.nativeElement;
    }
    CuiButtonComponent.prototype.setClass = function () {
        /* tslint:disable-next-line */
        this.class = "btn " + (this.color ? "btn--" + this.color : '') + " " + (this.wide ? 'btn--wide' : '') + " " + (this.small ? 'btn--small' : '') + " " + (this.icon ? 'btn--icon' : '');
    };
    CuiButtonComponent.prototype.ngOnInit = function () {
        this.setClass();
    };
    CuiButtonComponent.prototype.ngOnChanges = function () {
        this.setClass();
    };
    CuiButtonComponent.prototype.getOffsetLeft = function (elem) {
        var offsetLeft = 0;
        var $elem = elem;
        do {
            if (!isNaN(elem.offsetLeft)) {
                offsetLeft += $elem.offsetLeft;
            }
        } while ($elem = $elem.offsetParent);
        return offsetLeft;
    };
    CuiButtonComponent.prototype.getOffsetTop = function (elem) {
        var offsetTop = 0;
        var $elem = elem;
        do {
            if (!isNaN($elem.offsetTop)) {
                offsetTop += $elem.offsetTop;
            }
        } while ($elem = $elem.offsetParent);
        return offsetTop;
    };
    CuiButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'button[cuiButton]',
                    template: "<ng-content></ng-content> ",
                    styles: [":host ::ng-deep .ripple { position: absolute; background: #c6c7ca; border-radius: 50%; width: 5px; height: 5px; animation: rippleEffect 1.5s; opacity: .4; } :host ::ng-deep .cui-icon path { fill: #ffffff; } :host.btn--secondary ::ng-deep .cui-icon path, :host.btn--gray-ghost ::ng-deep .cui-icon path, :host.btn--white ::ng-deep .cui-icon path { fill: #58585b; } :host.btn--gray-ghost:hover ::ng-deep .cui-icon path { fill: #ffffff; } :host.btn--primary-ghost ::ng-deep .cui-icon path { fill: #049fd9; } :host.btn--primary-ghost:hover ::ng-deep .cui-icon path { fill: #ffffff; } @keyframes rippleEffect { 0% { transform: scale(1); opacity: 0.4; } 100% { transform: scale(150); opacity: 0; } } button[cuiButton]:host { position: relative; overflow: hidden; } "],
                },] },
    ];
    /** @nocollapse */
    CuiButtonComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    CuiButtonComponent.propDecorators = {
        "color": [{ type: Input },],
        "small": [{ type: Input },],
        "wide": [{ type: Input },],
        "icon": [{ type: Input },],
        "animated": [{ type: Input },],
        "class": [{ type: HostBinding, args: ['class',] },],
        "clickFn": [{ type: HostListener, args: ['click', ['$event'],] },],
    };
    return CuiButtonComponent;
}());
export { CuiButtonComponent };
//# sourceMappingURL=cui-button.component.js.map