import { Component, Input, TemplateRef } from '@angular/core';

@Component({
	selector: 'cui-carousel',
	templateUrl: './cui-carousel.component.html',
})
/**
 * Component for a carousel
 */
export class CuiCarouselComponent {
	@Input() items: TemplateRef<any>[] = [];

	@Input() data: any;

	@Input() indigo = false;

	itemIndex = 0;

	gotoIndex (_index: number) {
		let index: number = _index;
		if (index >= this.items.length) {
			index = this.items.length - 1;
		}
		if (index < 0) {
			index = 0;
		}

		this.itemIndex = index;
	}
}
