import { TemplateRef } from '@angular/core';
export class CuiTreeOptions {
	/**
	 * Index signature
	 */
	[key: string]: any;

	/**
	 * width of indentation placeholders to indicate tree depth
	 * @type {Number}
	 */
	public placeholderWidth = 25;

	/**
	 * width in px of icon container margin-left
	 * @type {Number}
	 */
	public iconMargin = 25;

	/**
	 * customizable wrapper class name
	 * @type {String}
	 */
	public wrapperClass = 'cui-tree-example';

	/**
	 * right align 90-degree hierarchy indicators
	 * @type {Boolean}
	 */
	public rightAlignChildMarkers = true;

	/**
	 * showExpandAllBtn
	 * @type {boolean}
	 */
	public showExpandAllBtn = true;

	/**
	 * whether or not rows should be selectable
	 * @type {boolean}
	 */
	public selectable = false;

	/**
	 * allows for a mix of selectable and unselectable rows
	 * (selectableKey is used to define which row field to use for selectability evaluation)
	 * @type {boolean}
	 */
	public selectableMix = false;

	/**
	 * id key for parent identification
	 * @type {boolean}
	 */
	public idKey = 'id';

	/**
	 * defines a key to detect if a node is expanded
	 * @type {boolean}
	 */
	public expandedKey = 'expanded';

	/**
	 * key to reference parent
	 * @type {boolean}
	 */
	public parentKey = 'parent';

	/**
	 * key to reference parent
	 * @type {boolean}
	 */
	public selectableKey = 'selectable';

	/**
	 * defines data-auto-id attribute for automation
	 * @type {boolean}
	 */
	public dataAutoId = 'cui-tree--';

	/**
	 * defines disabling and enabling of checkboxes for cui-tree parent and children
	 * @type {string}
	 */
	public checkboxDisabled = 'checkboxDisabled';

	/**
	 * Defines a key which the tree should be sorted by
	 * @type {string}
	 */
	public sortByKey: string;

	/**
	 * html template to display for each row
	 * @type {boolean}
	 */
	public template: TemplateRef<any>;

	/**
	 * Centers the elements in a row vertically
	 * @type {boolean}
	 */
	public rowElemsVerticallyCentered = true;

	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				this[key] = options[key];
			}
		}
	}
}
