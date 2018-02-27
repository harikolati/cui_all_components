var CuiTreeOptions = (function () {
    function CuiTreeOptions(options) {
        /**
             * width of indentation placeholders to indicate tree depth
             * @type {Number}
             */
        this.placeholderWidth = 25;
        /**
             * width in px of icon container margin-left
             * @type {Number}
             */
        this.iconMargin = 25;
        /**
             * customizable wrapper class name
             * @type {String}
             */
        this.wrapperClass = 'cui-tree-example';
        /**
             * right align 90-degree hierarchy indicators
             * @type {Boolean}
             */
        this.rightAlignChildMarkers = true;
        /**
             * showExpandAllBtn
             * @type {boolean}
             */
        this.showExpandAllBtn = true;
        /**
             * whether or not rows should be selectable
             * @type {boolean}
             */
        this.selectable = false;
        /**
             * allows for a mix of selectable and unselectable rows
             * (selectableKey is used to define which row field to use for selectability evaluation)
             * @type {boolean}
             */
        this.selectableMix = false;
        /**
             * id key for parent identification
             * @type {boolean}
             */
        this.idKey = 'id';
        /**
             * defines a key to detect if a node is expanded
             * @type {boolean}
             */
        this.expandedKey = 'expanded';
        /**
             * key to reference parent
             * @type {boolean}
             */
        this.parentKey = 'parent';
        /**
             * key to reference parent
             * @type {boolean}
             */
        this.selectableKey = 'selectable';
        /**
             * defines data-auto-id attribute for automation
             * @type {boolean}
             */
        this.dataAutoId = 'cui-tree--';
        /**
             * defines disabling and enabling of checkboxes for cui-tree parent and children
             * @type {string}
             */
        this.checkboxDisabled = 'checkboxDisabled';
        /**
             * Centers the elements in a row vertically
             * @type {boolean}
             */
        this.rowElemsVerticallyCentered = true;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
    }
    return CuiTreeOptions;
}());
export { CuiTreeOptions };
//# sourceMappingURL=cui-tree-options.js.map