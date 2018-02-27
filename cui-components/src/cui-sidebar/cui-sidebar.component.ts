import { Component, Input } from '@angular/core';

import { CuiSidebarOptions } from './cui-sidebar-options';

@Component({
	selector: 'cui-sidebar',
	templateUrl: './cui-sidebar.component.html',
	styleUrls: ['./cui-sidebar.component.scss'],
})
/**
 * Component for a CiscoUI sidebar.
 */
export class CuiSidebarComponent {
	/**
	 * Options for the display of the sidebar.
	 */
	@Input() options: CuiSidebarOptions = new CuiSidebarOptions();
	/**
	 * Whether the sidebar is visible.
	 */
	@Input() visible = true;

	toggleDrawer (item: any) {
		if (item.subItems && !item.disabled) {
			item.open = !item.open;
		}
	}
}
