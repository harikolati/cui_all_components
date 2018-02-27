import { Component, Input } from '@angular/core';

@Component({
	selector: 'cui-spinner',
	templateUrl: './cui-spinner.component.html',
	host: { class: 'loading-spinner flex-center' },
})
export class CuiSpinnerComponent {

	/**
	 * Optional spinner color ('blue' [default], indigo)
	 */
	@Input() color = 'blue';

	public getColorClass () {
		if (this.color === 'blue') {
			return '';
		}

		return `loading-spinner--${this.color}`;
	}
}
