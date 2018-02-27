import { AfterContentInit, ElementRef, EventEmitter, Renderer2, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
export declare enum HoverToggle {
    OFF = 0,
    ON = 1,
}
export declare class CuiSelectKeyControlDirective implements AfterContentInit {
    private el;
    private renderer;
    needsHoverDetection: boolean;
    justScrolled: boolean;
    upArrowHidingDropdown: boolean;
    keydownNavIndex: number;
    dropdownVisible: boolean;
    fullDataset: any[];
    dropdownVisibleChange: EventEmitter<boolean>;
    onEnterKey: EventEmitter<number>;
    dropdownOptionsList: QueryList<ElementRef>;
    queryListSub: Subscription;
    dropdownOptions: ElementRef[];
    hoveredOption: ElementRef;
    onMouseEnter(): void;
    onKeyDown($event: KeyboardEvent): void;
    constructor(el: ElementRef, renderer: Renderer2);
    getElementStyle(el: HTMLElement): CSSStyleDeclaration;
    hideDropdown(): void;
    detectCurrentHoveredIndex(): void;
    setHoverBackground(state: HoverToggle): void;
    toggleHoverCSS(state: HoverToggle): void;
    setAllOptionsBackgroundWhite($event: KeyboardEvent): void;
    detectNeedsScroll(elem: ElementRef): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
}
