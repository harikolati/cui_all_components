import { Component, Input } from '@angular/core';

@Component({
	selector: 'cui-footer',
	templateUrl: './cui-footer.component.html',
})
/**
 * Component for a footer using Cisco UI
 */
export class CuiFooterComponent {
	/**
	 * Default links to be added to the footer.
	 */
	static defaultLinks: any[] = [
		{
			url: 'http://www.cisco.com/cisco/web/siteassets/contacts/index.html',
			label: 'Contacts',
		},
		{
			url: 'https://secure.opinionlab.com/ccc01/o.asp?id=jBjOhqOJ',
			label: 'Feedback',
		},
		{
			url: 'http://www.cisco.com/c/en/us/about/sitemap.html',
			label: 'Site Map',
		},
		{
			url: 'http://www.cisco.com/web/siteassets/legal/terms_condition.html',
			label: 'Terms & Conditions',
		},
		{
			url: 'http://www.cisco.com/web/siteassets/legal/privacy_full.html',
			label: 'Privacy Statement',
		},
		{
			url: 'http://www.cisco.com/web/siteassets/legal/privacy_full.html#cookies',
			label: 'Cookie Policy',
		},
		{
			url: 'http://www.cisco.com/web/siteassets/legal/trademark.html',
			label: 'Trademarks',
		},
	];

	/**
	 * Optional custom links object. Will be populated with default links if not set.
	 */
	@Input() links: any[];
	/**
	 * Whether to show the legal disclaimer in the footer.
	 */
	@Input() showLegal = true;
	/**
	 * Padding of the footer (regular, compressed, loose)
	 */
	@Input() padding = '';

	constructor() {
		if (!this.links) {
			this.links = CuiFooterComponent.defaultLinks;
		}
	}
}
