import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CuiHeaderOptions } from './cui-header-options';

@Component({
	selector: 'cui-header',
	templateUrl: './cui-header.component.html',
	styleUrls: ['./cui-header.component.scss'],
})
/**
 * Component for a CiscoUI page header
 */
export class CuiHeaderComponent implements OnInit {
	@Input() options: CuiHeaderOptions;

	@Output() menuToggleClicked: EventEmitter<any> = new EventEmitter();

	/**
	 * Whether a mobile overflow navigation menu is expanded
	 */
	public overflowExpanded = false;

	ngOnInit () {
		if (this.options.primaryNav && !this.options.mobileNav) {
			this.options.mobileNav = this.options.primaryNav;
		}
	}

	/**
	 * Returns the proper color class for a toolbar button
	 * @param button The button object
	 * @returns The button color class string
	 */
	public getToolbarButtonClass (button: any): String {
		if (!button['color']) {
			return '';
		}

		return `btn--${button['color']}`;
	}

	/**
	 * Toggles the mobile overflow menu open/closed
	 */
	public toggleOverflow () {
		this.overflowExpanded = !this.overflowExpanded;
	}

	private getMobileTabsForDisplay (overflowTabs: boolean): any[] {
		if (!overflowTabs) {
			return this.options.mobileNav.filter((item, index) => item && index < 2);
		}

		return this.options.mobileNav.filter((item, index) => item && index >= 2);
	}

	private overflowTabIsActive () {
		return this.getMobileTabsForDisplay(true)
			.filter(item => item['active']).length > 0;
	}

	onMenuButtonClicked (event: Event) {
		this.menuToggleClicked.emit(event);
	}
}
