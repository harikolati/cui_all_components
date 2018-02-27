import { Component, Input } from '@angular/core';

@Component({
	selector: 'cui-loader',
	templateUrl: './cui-loader.component.html',
})
/**
 * Component for a loader element
 */
export class CuiLoaderComponent {
	/**
	 * Optional text to display with the loader
	 */
	@Input() label: string;
	/**
	 * Optional loading dots color (muted [default], white, info, primary, warning)
	 */
	@Input() color = 'muted';

	/**
	 * Returns the loading dots color class string
	 * @returns The color class string
	 */
	public getColorClass () {
		if (this.color === 'white') {
			return '';
		}

		return `loading-dots--${this.color}`;
	}
}
