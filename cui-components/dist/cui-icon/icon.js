var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { first } from 'rxjs/operators/first';
import { Attribute, ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2, ViewEncapsulation, } from '@angular/core';
import { CuiIconRegistry } from './icon-registry';
import { CuiIconRegistryService } from './cui-icon-registry.service';
// Boilerplate for applying mixins to MatIcon.
/** @docs-private */
var 
// Boilerplate for applying mixins to MatIcon.
/** @docs-private */
MatIconBase = (function () {
    function MatIconBase(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
    }
    return MatIconBase;
}());
// Boilerplate for applying mixins to MatIcon.
/** @docs-private */
export { MatIconBase };
/**
 * Component to display an icon. It can be used in the following ways:
 *
 * - Specify the svgIcon input to load an SVG icon from a URL previously registered with the
 *   addSvgIcon, addSvgIconInNamespace, addSvgIconSet, or addSvgIconSetInNamespace methods of
 *   CuiIconRegistry. If the svgIcon value contains a colon it is assumed to be in the format
 *   "[namespace]:[name]", if not the value will be the name of an icon in the default namespace.
 *   Examples:
 *     <mat-icon svgIcon="left-arrow"></mat-icon>
 *     <mat-icon svgIcon="animals:cat"></mat-icon>
 *
 * - Use a font ligature as an icon by putting the ligature text in the content of the <mat-icon>
 *   component. By default the Material icons font is used as described at
 *   http://google.github.io/material-design-icons/#icon-font-for-the-web. You can specify an
 *   alternate font by setting the fontSet input to either the CSS class to apply to use the
 *   desired font, or to an alias previously registered with CuiIconRegistry.registerFontClassAlias.
 *   Examples:
 *     <mat-icon>home</mat-icon>
 *     <mat-icon fontSet="myfont">sun</mat-icon>
 *
 * - Specify a font glyph to be included via CSS rules by setting the fontSet input to specify the
 *   font, and the fontIcon input to specify the icon. Typically the fontIcon will specify a
 *   CSS class which causes the glyph to be displayed via a :before selector, as in
 *   https://fortawesome.github.io/Font-Awesome/examples/
 *   Example:
 *     <mat-icon fontSet="fa" fontIcon="alarm"></mat-icon>
 */
var CuiIconComponent = (function (_super) {
    __extends(CuiIconComponent, _super);
    function CuiIconComponent(renderer, elementRef, _iconRegistry, registryService, ariaHidden) {
        var _this = _super.call(this, renderer, elementRef) || this;
        _this._iconRegistry = _iconRegistry;
        _this.registryService = registryService;
        // If the user has not explicitly set aria-hidden, mark the icon as hidden, as this is
        // the right thing to do for the majority of icon use-cases.
        if (!ariaHidden) {
            renderer.setAttribute(elementRef.nativeElement, 'aria-hidden', 'true');
        }
        return _this;
    }
    /*
     * Splits an svgIcon binding value into its icon set and icon name components.
     * Returns a 2-element array of [(icon set), (icon name)].
     * The separator for the two fields is ':'. If there is no separator, an empty
     * string is returned for the icon set and the entire value is returned for
     * the icon name. If the argument is falsy, returns an array of two empty strings.
     * Throws an error if the name contains two or more ':' separators.
     * Examples:
     *   'social:cake' -> ['social', 'cake']
     *   'penguin' -> ['', 'penguin']
     *   null -> ['', '']
     *   'a:b:c' -> (throws Error)
     */
    /*
         * Splits an svgIcon binding value into its icon set and icon name components.
         * Returns a 2-element array of [(icon set), (icon name)].
         * The separator for the two fields is ':'. If there is no separator, an empty
         * string is returned for the icon set and the entire value is returned for
         * the icon name. If the argument is falsy, returns an array of two empty strings.
         * Throws an error if the name contains two or more ':' separators.
         * Examples:
         *   'social:cake' -> ['social', 'cake']
         *   'penguin' -> ['', 'penguin']
         *   null -> ['', '']
         *   'a:b:c' -> (throws Error)
         */
    CuiIconComponent.prototype._splitIconName = /*
         * Splits an svgIcon binding value into its icon set and icon name components.
         * Returns a 2-element array of [(icon set), (icon name)].
         * The separator for the two fields is ':'. If there is no separator, an empty
         * string is returned for the icon set and the entire value is returned for
         * the icon name. If the argument is falsy, returns an array of two empty strings.
         * Throws an error if the name contains two or more ':' separators.
         * Examples:
         *   'social:cake' -> ['social', 'cake']
         *   'penguin' -> ['', 'penguin']
         *   null -> ['', '']
         *   'a:b:c' -> (throws Error)
         */
    function (iconName) {
        if (!iconName) {
            return ['', ''];
        }
        var parts = iconName.split(':');
        switch (parts.length) {
            case 1: return ['', parts[0]]; // Use default namespace.
            case 2: return parts;
            default: throw Error("Invalid icon name: \"" + iconName + "\"");
        }
    };
    CuiIconComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        // Only update the inline SVG icon if the inputs changed,
        // to avoid unnecessary DOM operations.
        if (changes.svgIcon) {
            if (this.svgIcon) {
                var _a = this._splitIconName(this.svgIcon), namespace = _a[0], iconName = _a[1];
                this._iconRegistry.getNamedSvgIcon(iconName, namespace).pipe(first()).subscribe(function (svg) { return _this._setSvgElement(svg); }, function (err) { return console.log("Error retrieving icon: " + err.message); });
            }
            else {
                this._clearSvgElement();
            }
        }
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
        /* tslint:disable-next-line:ter-max-len */
        this._elementRef.nativeElement.className = "cui-icon " + (this.iconSize || '') + " " + (this.color || '');
    };
    CuiIconComponent.prototype.ngOnInit = function () {
        // Update font classes because ngOnChanges won't be
        // called if none of the inputs are present,
        // e.g. <mat-icon>arrow</mat-icon> In this case we
        // need to add a CSS class for the default font.
        if (this._usingFontIcon()) {
            this._updateFontIconClasses();
        }
        /* tslint:disable-next-line:ter-max-len */
        this._elementRef.nativeElement.className = "cui-icon " + (this.iconSize || '') + " " + (this.color || '');
    };
    CuiIconComponent.prototype._usingFontIcon = function () {
        return !this.svgIcon;
    };
    CuiIconComponent.prototype._setSvgElement = function (svg) {
        this._clearSvgElement();
        this._renderer.appendChild(this._elementRef.nativeElement, svg);
    };
    CuiIconComponent.prototype._clearSvgElement = function () {
        var layoutElement = this._elementRef.nativeElement;
        var childCount = layoutElement.childNodes.length;
        // Remove existing child nodes and add the new SVG element. Note that we can't
        // use innerHTML, because IE will throw if the element has a data binding.
        /* tslint:disable-next-line:no-increment-decrement */
        for (var i = 0; i < childCount; i++) {
            this._renderer.removeChild(layoutElement, layoutElement.childNodes[i]);
        }
    };
    CuiIconComponent.prototype._updateFontIconClasses = function () {
        if (!this._usingFontIcon()) {
            return;
        }
        var elem = this._elementRef.nativeElement;
        var fontSetClass = this.fontSet ?
            this._iconRegistry.classNameForFontAlias(this.fontSet) :
            this._iconRegistry.getDefaultFontSetClass();
        /* tslint:disable-next-line:triple-equals */
        if (fontSetClass != this._previousFontSetClass) {
            if (this._previousFontSetClass) {
                this._renderer.removeClass(elem, this._previousFontSetClass);
            }
            if (fontSetClass) {
                this._renderer.addClass(elem, fontSetClass);
            }
            this._previousFontSetClass = fontSetClass;
        }
        /* tslint:disable-next-line:triple-equals */
        if (this.fontIcon != this._previousFontIconClass) {
            if (this._previousFontIconClass) {
                this._renderer.removeClass(elem, this._previousFontIconClass);
            }
            if (this.fontIcon) {
                this._renderer.addClass(elem, this.fontIcon);
            }
            this._previousFontIconClass = this.fontIcon;
        }
    };
    CuiIconComponent.decorators = [
        { type: Component, args: [{ template: '<ng-content></ng-content>',
                    selector: 'cui-icon',
                    exportAs: 'cuiIcon',
                    styles: [".cui-icon { background-repeat: no-repeat; display: inline-block; fill: #58585b; margin: 5px; height: 16px; width: 16px; } .cui-icon.medium { width: 3rem; height: 3rem; } .cui-icon.large { width: 5rem; height: 5rem; } .cui-icon path { fill: #58585b; } .cui-icon.primary, .cui-icon.primary path { fill: #abc233 !important; } .cui-icon.secondary, .cui-icon.secondary path { fill: #049fd9 !important; } .cui-icon.default, .cui-icon.default path { fill: #58585b !important; } .cui-icon.cta, .cui-icon.cta path { fill: #abc233 !important; } .cui-icon.info, .cui-icon.info path { fill: #64bbe3 !important; } .cui-icon.success, .cui-icon.success path { fill: #6cc04a !important; } .cui-icon.danger, .cui-icon.danger path { fill: #cf2030 !important; } .cui-icon.warning, .cui-icon.warning path { fill: #ff7300 !important; } .cui-icon.warning-alt, .cui-icon.warning-alt path { fill: #ffcc00 !important; } "],
                    inputs: ['color'],
                    host: {
                        role: 'img',
                        class: 'cui-icon',
                    },
                    encapsulation: ViewEncapsulation.None,
                    preserveWhitespaces: false,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    CuiIconComponent.ctorParameters = function () { return [
        { type: Renderer2, },
        { type: ElementRef, },
        { type: CuiIconRegistry, },
        { type: CuiIconRegistryService, },
        { type: undefined, decorators: [{ type: Attribute, args: ['aria-hidden',] },] },
    ]; };
    CuiIconComponent.propDecorators = {
        "svgIcon": [{ type: Input },],
        "fontSet": [{ type: Input },],
        "fontIcon": [{ type: Input },],
        "iconSize": [{ type: Input },],
        "color": [{ type: Input },],
    };
    return CuiIconComponent;
}(MatIconBase));
export { CuiIconComponent };
//# sourceMappingURL=icon.js.map