import { TemplateRef } from '@angular/core';
export declare class CuiTreeOptions {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * width of indentation placeholders to indicate tree depth
     * @type {Number}
     */
    placeholderWidth: number;
    /**
     * width in px of icon container margin-left
     * @type {Number}
     */
    iconMargin: number;
    /**
     * customizable wrapper class name
     * @type {String}
     */
    wrapperClass: string;
    /**
     * right align 90-degree hierarchy indicators
     * @type {Boolean}
     */
    rightAlignChildMarkers: boolean;
    /**
     * showExpandAllBtn
     * @type {boolean}
     */
    showExpandAllBtn: boolean;
    /**
     * whether or not rows should be selectable
     * @type {boolean}
     */
    selectable: boolean;
    /**
     * allows for a mix of selectable and unselectable rows
     * (selectableKey is used to define which row field to use for selectability evaluation)
     * @type {boolean}
     */
    selectableMix: boolean;
    /**
     * id key for parent identification
     * @type {boolean}
     */
    idKey: string;
    /**
     * defines a key to detect if a node is expanded
     * @type {boolean}
     */
    expandedKey: string;
    /**
     * key to reference parent
     * @type {boolean}
     */
    parentKey: string;
    /**
     * key to reference parent
     * @type {boolean}
     */
    selectableKey: string;
    /**
     * defines data-auto-id attribute for automation
     * @type {boolean}
     */
    dataAutoId: string;
    /**
     * defines disabling and enabling of checkboxes for cui-tree parent and children
     * @type {string}
     */
    checkboxDisabled: string;
    /**
     * Defines a key which the tree should be sorted by
     * @type {string}
     */
    sortByKey: string;
    /**
     * html template to display for each row
     * @type {boolean}
     */
    template: TemplateRef<any>;
    /**
     * Centers the elements in a row vertically
     * @type {boolean}
     */
    rowElemsVerticallyCentered: boolean;
    constructor(options: any);
}
