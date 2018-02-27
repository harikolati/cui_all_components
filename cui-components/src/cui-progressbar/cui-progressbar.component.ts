import { Component, Input } from '@angular/core';

@Component({
	selector: 'cui-progressbar',
	templateUrl: './cui-progressbar.component.html',
	styleUrls: ['./cui-progressbar.component.scss'],
})
export class CuiProgressbarComponent {
	/**
	 * Title of the progressbar
	 */
	@Input() title: string;
	/**
	 * The value of completion displayed by the progressbar
	 */
	@Input() percentage: number;
	/**
	 * Flag to display percent complete message below the progressbar
	 */
	@Input() subtitle = false;
	/**
	 * Flag to display progressbar as thin or not
	 */
	@Input() thin = false;
}
