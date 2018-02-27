import { AfterContentInit, Directive, ElementRef, HostListener, Input, Output, EventEmitter,
	Renderer2, ContentChildren, QueryList } from '@angular/core';
import { get, inRange, invoke, isNil } from 'lodash-es';
import { Subscription } from 'rxjs/Subscription';

const ENTER = 13;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const SCROLL_AMT = 40;
const HOVER_BG_COLOR = 'rgb(4, 159, 217)';
const NORMAL_BG_COLOR = 'rgba(0, 0, 0, 0)';
const NORMAL_FONT_COLOR = 'rgb(88, 88, 91)';
const NORMAL_FONT_WEIGHT = 300;
export enum HoverToggle { OFF, ON }
@Directive({
	selector: '[dropdownKeyControl]',
})
export class CuiSelectKeyControlDirective implements AfterContentInit {
	needsHoverDetection = true;
	justScrolled = false;
	upArrowHidingDropdown = false;
	keydownNavIndex = -1;
	@Input() dropdownVisible: boolean;
	@Input() fullDataset: any[];
	@Output() dropdownVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output() onEnterKey: EventEmitter<number> = new EventEmitter<number>();
	@ContentChildren('dropdownOption') dropdownOptionsList: QueryList<ElementRef>;
	queryListSub: Subscription;
	dropdownOptions: ElementRef[] = [];
	hoveredOption: ElementRef;
	@HostListener('mousemove') onMouseEnter () {
		this.renderer.setStyle(this.el.nativeElement, 'pointer-events', 'auto');
		this.dropdownOptions.forEach(() => this.setHoverBackground(HoverToggle.OFF));
		this.toggleHoverCSS(HoverToggle.ON);
	}
	@HostListener('window:keydown', ['$event']) onKeyDown ($event: KeyboardEvent) {
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
	}
	constructor (private el: ElementRef, private renderer: Renderer2) {}

	getElementStyle (el: HTMLElement) {
		return window.getComputedStyle(el, null);
	}

	hideDropdown () {
		this.dropdownVisible = false;
		this.dropdownVisibleChange.emit(this.dropdownVisible);
	}

	detectCurrentHoveredIndex () {
		this.hoveredOption = this.dropdownOptions
			.filter(option => this.getElementStyle(option.nativeElement)
			.backgroundColor === HOVER_BG_COLOR).pop();
		this.keydownNavIndex = this.dropdownOptions.indexOf(this.hoveredOption);
	}

	setHoverBackground (state: HoverToggle) {
		const hoveredElem = get(this.dropdownOptions, [this.keydownNavIndex, 'nativeElement']);
		if (!isNil(hoveredElem)) {
			if (state === HoverToggle.ON) {
				this.renderer.addClass(hoveredElem, 'active');
				this.renderer.removeStyle(hoveredElem, 'backgroundColor');
				this.renderer.removeStyle(hoveredElem, 'color');
				this.renderer.removeStyle(hoveredElem, 'font-weight');
			} else {
				this.renderer.removeClass(hoveredElem, 'active');
			}
		}
	}

	toggleHoverCSS (state: HoverToggle) {
		this.dropdownOptions.forEach(option => {
			if (!isNil(option)) {
				if (state === HoverToggle.OFF) {
					this.renderer
						.setStyle(option.nativeElement, 'backgroundColor', NORMAL_BG_COLOR);
					this.renderer.setStyle(option.nativeElement, 'color', NORMAL_FONT_COLOR);
					this.renderer.setStyle(option.nativeElement, 'font-weight', NORMAL_FONT_WEIGHT);
				} else {
					this.renderer.removeStyle(option.nativeElement, 'backgroundColor');
					this.renderer.removeStyle(option.nativeElement, 'color');
					this.renderer.removeStyle(option.nativeElement, 'font-weight');
				}
			}
		});
	}

	setAllOptionsBackgroundWhite ($event: KeyboardEvent) {
		if ([UP_ARROW, DOWN_ARROW].includes($event.keyCode)) {
			this.toggleHoverCSS(HoverToggle.OFF);
		}
	}

	detectNeedsScroll (elem: ElementRef) {
		const dropdownElem = get(this, 'el.nativeElement');
		const hoverElem = get(elem, 'nativeElement');
		const dropdownTop = get(dropdownElem, 'scrollTop');
		const dropdownBottom = dropdownTop + get(dropdownElem, 'offsetHeight');

		const elemTop = get(hoverElem, 'offsetTop');
		const elemBottom = elemTop + get(hoverElem, 'offsetHeight');

		if (elemBottom > dropdownBottom || elemTop < dropdownTop) {
			if (elemBottom > dropdownBottom) {
				this.renderer.setProperty(dropdownElem, 'scrollTop', dropdownTop + SCROLL_AMT);
			} else if (elemTop < dropdownTop) {
				this.renderer.setProperty(dropdownElem, 'scrollTop', dropdownTop - SCROLL_AMT);
			}
		}
	}

	ngAfterContentInit () {
		this.queryListSub = this.dropdownOptionsList.changes
			.subscribe((updated: QueryList<ElementRef>) => {
				this.dropdownOptions = updated.toArray();
			});
	}
	ngOnDestroy () {
		invoke(this, 'queryListSub.unsubscribe');
	}
}
