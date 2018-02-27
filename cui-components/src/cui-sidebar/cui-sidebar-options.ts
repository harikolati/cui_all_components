/**
 * Options object for the CuiSidebarComponent
 */
export class CuiSidebarOptions {
	/**
	 * Index signature
	 */
	[key: string]: any;
	/**
	 * Optional title for the sidebar.
	 */
	public title: string;

	/**
	 * Optional toolbar buttons.
	 */
	public toolbarButtons: any[];

	/**
	 * The main sidebar drawers and items.
	 * A single item has properties: title:string, [icon]:string, [url]:string, [onClick]:function.
	 * A drawer has properties: title:string, [icon]:string, items:Array(single item).
	 */
	public items: any[];

	constructor(options: any = {}) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				this[key] = options[key];
			}
		}
	}
}
