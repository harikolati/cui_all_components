import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

@Component({
	selector: 'cui-drawers',
	templateUrl: './cui-drawers.component.html',
})
/**
 * Componentn for a group of drawers
 */
export class CuiDrawersComponent implements OnInit {
	/**
	 * Text to display at the top of the drawer group
	 */
	@Input() label: string;
	/**
	 * Array of drawer components in the group
	 */
	@Input() drawers: any[] = [];
	@Output() drawersChange = new EventEmitter();
	/**
	 * Optional alt background for the group header (1)
	 */
	@Input() alt = 0;
	/**
	 * Whether to toggle carets from right (collapsed) to down (expanded)
	 */
	@Input() rightToDown = false;
	/**
	 * Whether to start with all drawers expanded
	 */
	@Input() expanded = false;
	/**
	 * Whether to allow clicking the header to expand/collapse all drawers
	 */
	@Input() allowExpandAll = false;
	/**
	 * Whether to put the caret on the left side of the drawer
	 */
	@Input() caretLeft = false;
	/**
	 * Whether to use content projection or normal input fields
	 */
	@Input() projection = false;

	/**
	 * Generated class string for the header background
	 */
	public colorClass = 'panel--ltgray';

	ngOnInit () {
		if (this.alt) {
			this.colorClass = '';
		}
		if (this.expanded) {
			for (const drawer of this.drawers) {
				drawer.expanded = true;
			}
		}
	}

	/**
	 * Toggles all drawers open/closed
	 */
	public toggleAllExpanded () {
		if (this.allowExpandAll) {
			this.expanded = !this.expanded;
		}
		for (const drawer of this.drawers) {
			drawer.expanded = this.expanded;
		}
		this.drawersChange.emit(this.drawers);
	}
}
