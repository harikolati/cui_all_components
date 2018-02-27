import { Component, Input } from '@angular/core';

@Component({
	selector: 'cui-breadcrumbs',
	templateUrl: './cui-breadcrumbs.component.html',
})
/**
 * Component for a breadcrumbs element
 */
export class CuiBreadcrumbsComponent {
	/**
	 * The items to display ( label, href|onClick )
	 */
	@Input() items: any[];
}
