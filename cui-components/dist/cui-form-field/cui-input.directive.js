import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Optional, SkipSelf, Renderer2, } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
var CuiInputDirective = (function () {
    function CuiInputDirective(elementRef, renderer, controlContainer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.controlContainer = controlContainer;
        this.placeholder = '';
        this.onChanges = new EventEmitter();
    }
    CuiInputDirective.prototype.focusChanged = function () {
        this.onChanges.emit(this);
    };
    CuiInputDirective.prototype.onInput = function () {
        if (this.elementRef.nativeElement.localName === 'textarea') {
            this.adjust();
        }
    };
    CuiInputDirective.prototype.ngOnInit = function () {
        this.refreshForm();
    };
    CuiInputDirective.prototype.refreshForm = function () {
        if (this.controlContainer && this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
        else if (this.formControl) {
            this.control = this.formControl;
        }
    };
    CuiInputDirective.prototype.ngOnChanges = function () {
        this.refreshForm();
        this.onChanges.emit(this);
    };
    CuiInputDirective.prototype.ngAfterContentChecked = function () {
        if (this.elementRef.nativeElement.localName === 'textarea') {
            this.adjust();
        }
    };
    CuiInputDirective.prototype.adjust = function () {
        var nativeElement = this.elementRef.nativeElement;
        this.maxHeight = this.maxHeight || 500;
        this.renderer.setStyle(nativeElement, 'overflow', 'hidden');
        this.renderer.setStyle(nativeElement, 'height', 'auto');
        if (nativeElement.scrollHeight < this.maxHeight) {
            this.renderer.setStyle(nativeElement, 'height', nativeElement.scrollHeight + "px");
        }
        else {
            this.renderer.setStyle(nativeElement, 'height', this.maxHeight + "px");
        }
        this.renderer.setStyle(nativeElement, 'overflow', 'auto');
    };
    CuiInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: 'input[cuiInput], textarea[cuiInput]',
                    exportAs: 'cuiInput',
                    host: {
                        '[attr.id]': 'id',
                        '[attr.maxlength]': 'maxlength',
                        '[placeholder]': 'placeholder',
                        '[disabled]': 'disabled',
                        '[required]': 'required',
                        '[readonly]': 'readonly',
                        '(blur)': 'focusChanged(false)',
                        '(focus)': 'focusChanged(true)',
                        '(input)': 'onInput()',
                    },
                },] },
    ];
    /** @nocollapse */
    CuiInputDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
        { type: ControlContainer, decorators: [{ type: Optional }, { type: Host }, { type: SkipSelf },] },
    ]; };
    CuiInputDirective.propDecorators = {
        "required": [{ type: Input },],
        "disabled": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "id": [{ type: Input },],
        "readonly": [{ type: Input },],
        "maxlength": [{ type: Input },],
        "maxHeight": [{ type: Input },],
        "ngModel": [{ type: Input },],
        "formControl": [{ type: Input },],
        "formControlName": [{ type: Input },],
        "onInput": [{ type: HostListener, args: ['input', ['$event.target'],] },],
    };
    return CuiInputDirective;
}());
export { CuiInputDirective };
//# sourceMappingURL=cui-input.directive.js.map