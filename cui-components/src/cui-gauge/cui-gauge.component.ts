import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'cui-gauge',
	templateUrl: './cui-gauge.component.html',
})
/**
 * Component for a guage element
 */
export class CuiGaugeComponent implements OnInit {
	/**
	 * The percent to show in the gauge
	 */
	@Input() percentage: number;
	/**
	 * Optional alternate value to show in the center of the gauge
	 */
	@Input() value: string;
	/**
	 * Gauge size (medium [default], small, large)
	 */
	@Input() size: string;
	/**
	 * Alternate background color (1)
	 */
	@Input() alt = 0;
	/**
	 * Gauge color (info [default], success, warning, danger)
	 */
	@Input() color: string;
	/**
	 * Optional label for below the gauge
	 */
	@Input() label: string;
	/**
	 * Whether to animate the gauge value.
	 */
	@Input() animated: boolean;

	/**
	 * The generated class name for the gauge color
	 */
	colorClass: string;

	ngOnInit () {
		if (this.animated) {
			this.animate();
		}
	}

	/**
	 * Drops the percentage to zero to start an animation
	 */
	public animate () {
		const originalPercentage = this.percentage;
		this.percentage = 0;
		setTimeout(() => {
			this.percentage = originalPercentage;
		}, 1);
	}
}
