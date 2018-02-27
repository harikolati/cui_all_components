import { Component, Input } from '@angular/core';

@Component({
	selector: 'cui-drawer',
	templateUrl: './cui-drawer.component.html',
})
/**
 * Component for a single drawer
 */
export class CuiDrawerComponent {
	/**
	 * Text to display in the drawer header
	 */
	@Input() label: string;
	/**
	 * Content to display when the drawer is expanded
	 */
	@Input() content: string;
	/**
	 * Whether to toggle carets from right (collapsed) to down (expanded)
	 */
	@Input() rightToDown = false;
	/**
	 * Whether to start with the drawer expanded
	 */
	@Input() expanded = false;
	/**
	 * Whether to put the caret on the left side of the drawer
	 */
	@Input() caretLeft = false;
	/**
	 * Whether to use content projection or normal input fields
	 */
	@Input() projection = false;
	/**
	 * Custom class to apply to panel div
	 */
	@Input() panelClass = '';
	/**
	 * Whether to allow the drawer to be expanded
	 */
	@Input() allowExpand = true;
	/**
	 * Toggles the drawer open/closed
	 */
	public toggleExpanded () {
		if (this.allowExpand) {
			this.expanded = !this.expanded;
		}
	}
}
