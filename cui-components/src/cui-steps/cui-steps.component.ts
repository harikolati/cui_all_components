import { Component, Input } from '@angular/core';

@Component({
	selector: 'cui-steps',
	templateUrl: './cui-steps.component.html',
})
/**
 * Component for step states
 */
export class CuiStepsComponent {
	/**
	 * Steps to display (number, label, [active], [visited], [class])
	 */
	@Input() steps: any[];
	/**
	 * Optional alternate background (1)
	 */
	@Input() alt = 0;
	/**
	 * Whether to display as vertical steps
	 */
	@Input() vertical: boolean;
	/**
	 * Whether to display as small steps
	 */
	@Input() small: boolean;
}
