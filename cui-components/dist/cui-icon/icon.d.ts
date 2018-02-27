import { ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { CuiIconRegistry } from './icon-registry';
import { CuiIconRegistryService } from './cui-icon-registry.service';
/** @docs-private */
export declare class MatIconBase {
    _renderer: Renderer2;
    _elementRef: ElementRef;
    constructor(_renderer: Renderer2, _elementRef: ElementRef);
}
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
export declare class CuiIconComponent extends MatIconBase implements OnChanges, OnInit {
    private _iconRegistry;
    private registryService;
    /** Name of the icon in the SVG icon set. */
    svgIcon: string;
    /** Font set that the icon is a part of. */
    fontSet: string;
    /** Name of an icon within a font set. */
    fontIcon: string;
    /** Specify size of icon (medium or large) */
    iconSize: string;
    color: string;
    private _previousFontSetClass;
    private _previousFontIconClass;
    constructor(renderer: Renderer2, elementRef: ElementRef, _iconRegistry: CuiIconRegistry, registryService: CuiIconRegistryService, ariaHidden: string);
    private _splitIconName(iconName);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    private _usingFontIcon();
    private _setSvgElement(svg);
    private _clearSvgElement();
    private _updateFontIconClasses();
}
