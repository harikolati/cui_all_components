import { Directive, ElementRef, HostListener, Input,
	Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { isNil } from 'lodash-es';
const DEFAULT_PAGING_SIZE = 100;
const PAGING_INCREMENT = 50;
const LEFTOVER_ITEM_SIZE = 55;
const HIT_TOP_SCROLL_RATIO = 0.51;
const HIT_BOTTOM_SCROLL_RATIO = 0.44;

@Directive({
	selector: '[dropdownPaginator]',
})
export class CuiSelectPaginatorDirective implements OnChanges {
	scroll: { start: number; size: number; } = {
		start: 0,
		size: 100,
	};
	get start () {
		return this.scroll.start;
	}
	get size () {
		return this.scroll.size;
	}
	lastScrollTop: 0;
	@Input() fullDataset: any[];
	@Input() dropdownPaginator: boolean;
	@HostListener('scroll', []) onScroll () {
		if (this.dropdownPaginator) {
			const isTooCloseToBottom = this.el.nativeElement.scrollHeight -
				(this.el.nativeElement.scrollTop + this.el.nativeElement.clientHeight) <
			PAGING_INCREMENT &&
				this.fullDataset.length >= DEFAULT_PAGING_SIZE;
			const isTooCloseToTop = this.el.nativeElement.scrollTop < PAGING_INCREMENT;
			const isScrollingDown = this.el.nativeElement.scrollTop >= this.lastScrollTop;
			this.lastScrollTop = this.el.nativeElement.scrollTop;
			if (isTooCloseToBottom && isScrollingDown) {
				this.paginateUp();
			} else if (isTooCloseToTop && !isScrollingDown) {
				this.paginateDown();
			}
		}
	}
	public paginateUp () {
		if (this.scroll.start + PAGING_INCREMENT <= this.fullDataset.length - 1) {
			if (this.scroll.start + LEFTOVER_ITEM_SIZE >= this.fullDataset.length - 1) {
				return;
			}
			this.scroll.size = DEFAULT_PAGING_SIZE;
			this.scroll.start += PAGING_INCREMENT;
			this.renderer.setProperty(
				this.el.nativeElement,
				'scrollTop',
				this.el.nativeElement.scrollHeight * HIT_BOTTOM_SCROLL_RATIO,
			);
		}
	}

	public paginateDown () {
		if (this.scroll.start - PAGING_INCREMENT >= 0) {
			this.scroll.start -= PAGING_INCREMENT;
			this.renderer.setProperty(
				this.el.nativeElement,
				'scrollTop',
				this.el.nativeElement.scrollHeight * HIT_TOP_SCROLL_RATIO,
			);
		} else {
			this.scroll.start = 0;
		}
	}
	constructor (private el: ElementRef, private renderer: Renderer2) {}

	ngOnChanges (changes: SimpleChanges) {
		if (!isNil(changes.fullDataset.currentValue) && !this.dropdownPaginator) {
			this.scroll.size = this.fullDataset.length;
		}
	}
}

