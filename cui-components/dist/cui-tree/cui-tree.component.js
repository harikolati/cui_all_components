import { Component, EventEmitter, Input, IterableDiffers, KeyValueDiffers, Output, } from '@angular/core';
import { CuiTreeOptions } from './cui-tree-options';
import { each, forOwn, findIndex, isNil, sortBy } from 'lodash-es';
var CuiTreeComponent = (function () {
    function CuiTreeComponent(kvDiffers, iDiffers) {
        this.kvDiffers = kvDiffers;
        this.tableExpanded = false;
        this.onToggleExpand = new EventEmitter();
        this.onItemClick = new EventEmitter();
        this.onSelectionChanged = new EventEmitter();
        this.dataElemDiffers = {};
        this.hasChildren = false;
        this.allSelected = false;
        this.optionsDiffer = kvDiffers.find({}).create();
        this.dataDiffer = iDiffers.find([]).create();
        this.setDiffers();
    }
    CuiTreeComponent.prototype.ngDoCheck = function () {
        var _this = this;
        // check to see if elements have been added or removed on the data array
        var dataChanges = this.dataDiffer.diff(this.data);
        if (!isNil(dataChanges)) {
            // remove all current differs, in case elements were removed
            this.dataElemDiffers = {};
            // re-initialize the deep differs
            this.setDiffers();
            return this.initData();
        }
        // check to see if the options have changed
        var optionsChanges = this.optionsDiffer.diff(this.options);
        if (!isNil(optionsChanges)) {
            return this.initData();
        }
        // check key/value differs for each element in data array
        // last because most expensive change detection
        var dataElemChanges = false;
        each(this.data, function (d) {
            var differ = _this.dataElemDiffers[d[_this.options.idKey]];
            var elemChanges = differ ? differ.diff(d) : null;
            if (!isNil(elemChanges)) {
                dataElemChanges = true;
            }
        });
        if (dataElemChanges) {
            this.initData();
        }
    };
    CuiTreeComponent.prototype.ngOnInit = function () {
        if (this.options && this.data) {
            this.initData();
        }
    };
    CuiTreeComponent.prototype.ngOnChanges = function (changes) {
        if (changes.data || changes.options) {
            this.initData();
        }
    };
    CuiTreeComponent.prototype.initData = function () {
        var _this = this;
        if (!isNil(this.data) && !this.hasDuplicateIds(this.data)) {
            this.allSelected = this.data.every(this.allSelectedCheck.bind(this));
            this.hasChildren = this.data.some(function (item) { return !isNil(item[_this.options.parentKey]); });
            this.rows = this.getTree(this.data) || [];
            this.rows
                .filter(function (row) { return row[_this.options.expandedKey]; })
                .forEach(function (row) { return _this.expandAtNode(_this.rows, row[_this.options.idKey]); });
            this.tableExpanded = this.checkTableExpandStatus(this.rows, true);
        }
        else {
            this.rows = [];
            console.error('Tree Data Contains Duplicate IDs. Node IDs must be unique.');
        }
    };
    CuiTreeComponent.prototype.setDiffers = function () {
        var _this = this;
        each(this.data, function (d) { return _this.dataElemDiffers[d[_this.options.idKey]] = _this.kvDiffers.find(d).create(); });
    };
    // emit event when node is clicked
    // emit event when node is clicked
    CuiTreeComponent.prototype.clickTreeNode = 
    // emit event when node is clicked
    function (id) {
        this.onItemClick.emit(id);
    };
    // show all elements of the tree
    // show all elements of the tree
    CuiTreeComponent.prototype.expandAll = 
    // show all elements of the tree
    function (tree) {
        var _this = this;
        tree.forEach(function (node) {
            node.show = true;
            if (node.isParent) {
                node[_this.options.expandedKey] = true;
            }
        });
        this.onToggleExpand.emit(true);
    };
    // get root nodes and collapse if node is a parent
    // get root nodes and collapse if node is a parent
    CuiTreeComponent.prototype.collapseAll = 
    // get root nodes and collapse if node is a parent
    function (tree) {
        var _this = this;
        var roots = this.getRootNodes(tree);
        roots.forEach(function (root) {
            if (root.isParent) {
                _this.collapseAtNode(tree, root[_this.options.idKey]);
            }
        });
        this.onToggleExpand.emit(false);
    };
    // find immediate children and show them
    // find immediate children and show them
    CuiTreeComponent.prototype.expandAtNode = 
    // find immediate children and show them
    function (tree, id) {
        var _this = this;
        // expand+show top node and show immediate children
        tree.forEach(function (node) {
            if (node[_this.options.idKey] === id) {
                node.show = true;
                node[_this.options.expandedKey] = true;
            }
            if (node[_this.options.parentKey] === id) {
                node.show = true;
            }
        });
    };
    // collapse recursively down the tree, starting at a particular item id
    // collapse recursively down the tree, starting at a particular item id
    CuiTreeComponent.prototype.collapseAtNode = 
    // collapse recursively down the tree, starting at a particular item id
    function (tree, id) {
        var _this = this;
        // delete show property from top level and find subparents
        var subParents = tree.filter(function (node) {
            if (node[_this.options.idKey] === id) {
                // delete show property from top level during filter
                delete node[_this.options.expandedKey];
            }
            if (node[_this.options.parentKey] === id) {
                // found immediate children
                delete node.show;
                if (node.isParent) {
                    node[_this.options.expandedKey] = false;
                    return true;
                }
            }
            return false;
        });
        if (subParents.length) {
            // found parents underneath collapse level, keep collapsing
            subParents.forEach(function (node) {
                _this.collapseAtNode(tree, node[_this.options.idKey]);
            });
        }
    };
    CuiTreeComponent.prototype.toggleItemExpanded = function (item) {
        if (!item.isParent) {
            return;
        }
        if (!item[this.options.expandedKey]) {
            // expand
            this.expandAtNode(this.rows, item[this.options.idKey]);
            if (this.checkTableExpandStatus(this.rows, true)) {
                // all became expanded- set tableExpanded
                this.tableExpanded = true;
                this.onToggleExpand.emit(true);
            }
        }
        else {
            // collapse
            this.collapseAtNode(this.rows, item[this.options.idKey]);
            if (this.checkTableExpandStatus(this.rows, false)) {
                // all became collapsed- set tableExpanded
                this.tableExpanded = false;
                this.onToggleExpand.emit(false);
            }
        }
    };
    CuiTreeComponent.prototype.toggleExpandAll = function () {
        this.tableExpanded = !this.tableExpanded;
        if (this.tableExpanded) {
            // expand all
            this.expandAll(this.rows);
        }
        else {
            // collapse all
            this.collapseAll(this.rows);
        }
    };
    // get placeholder elements
    // get placeholder elements
    CuiTreeComponent.prototype.placeholder = 
    // get placeholder elements
    function (n) {
        var array = [];
        for (var i = 0, il = n; i < il; i += 1) {
            array.push(undefined);
        }
        return array;
    };
    // get root nodes
    // get root nodes
    CuiTreeComponent.prototype.getRootNodes = 
    // get root nodes
    function (tree) {
        var _this = this;
        var rootNodes = tree.filter(function (item) { return !item[_this.options.parentKey]; });
        return this.options.sortByKey ? sortBy(rootNodes, this.options.sortByKey) : rootNodes;
    };
    // for a given set of input data nodes,
    // return a sorted and structured array for rendering a hierarchical view of the data
    // initialized with root nodes visible
    // sibling group order preserved from original data
    // for a given set of input data nodes,
    // return a sorted and structured array for rendering a hierarchical view of the data
    // initialized with root nodes visible
    // sibling group order preserved from original data
    CuiTreeComponent.prototype.getTree = 
    // for a given set of input data nodes,
    // return a sorted and structured array for rendering a hierarchical view of the data
    // initialized with root nodes visible
    // sibling group order preserved from original data
    function (data) {
        var _this = this;
        var depth = 0;
        var sortedTree = [];
        var totalItems = 0;
        var nodes = this.getRootNodes(data);
        // init with root nodes visible
        nodes.forEach(function (node) {
            totalItems += 1;
            node.show = true;
        });
        // start a sorted tree array with root nodes
        sortedTree = sortedTree.concat(nodes);
        var _loop_1 = function () {
            // store depth on all nodes and get ids for filtering
            var nodeIds = [];
            nodes.forEach(function (node) {
                node.depth = depth;
                nodeIds.push(node[_this.options.idKey]);
            });
            // filter input data to get next layer of nodes, by parent id
            nodes = data.filter(function (item) {
                var parentIndex = nodeIds.indexOf(item[_this.options.parentKey]);
                // found parent id
                if (parentIndex > -1) {
                    nodes[parentIndex].isParent = true;
                    return true;
                }
                return false;
            });
            // group siblings by parent id to preserve original order
            var groups = {};
            nodes.forEach(function (node) {
                if (node[_this.options.parentKey]) {
                    if (!groups[node[_this.options.parentKey]]) {
                        groups[node[_this.options.parentKey]] = [];
                    }
                    groups[node[_this.options.parentKey]].push(node);
                }
            });
            this_1.sortTree(groups);
            var _loop_2 = function (key) {
                if (groups.hasOwnProperty(key)) {
                    // try to find a parent in sortedTree
                    var insertIndex = findIndex(sortedTree, function (item) { return item[_this.options.idKey] === key; });
                    // see if group has a parent in the tree, if so, splice
                    if (insertIndex > -1) {
                        // if parent is in tree, splice siblings into tree at parent index + 1
                        var spliceArgs = [insertIndex + 1, 0].concat(groups[key]);
                        Array.prototype.splice.apply(sortedTree, spliceArgs);
                    }
                }
            };
            // insert each sibling group under its parent in the sorted tree,
            // preserving sibling order
            for (var key in groups) {
                _loop_2(key);
            }
            totalItems += nodes.length;
            depth += 1;
        };
        var this_1 = this;
        do {
            _loop_1();
        } while (nodes.length > 0 && totalItems <= data.length);
        each(sortedTree, function (node) {
            if (!node.isParent) {
                node.expanded = false;
            }
        });
        return sortedTree;
    };
    // check for duplicate ids in tree items
    // check for duplicate ids in tree items
    CuiTreeComponent.prototype.hasDuplicateIds = 
    // check for duplicate ids in tree items
    function (tree) {
        var _this = this;
        var treeArray = tree.map(function (node) { return node[_this.options.idKey]; });
        return treeArray.some(function (item, index) { return treeArray.indexOf(item) !== index; });
    };
    // return parent nodes from tree, or false if there are none
    // return parent nodes from tree, or false if there are none
    CuiTreeComponent.prototype.getParentNodes = 
    // return parent nodes from tree, or false if there are none
    function (tree) {
        var parentNodes = tree.filter(function (node) { return node.isParent; });
        if (!parentNodes.length) {
            // no parent nodes
            return null;
        }
        return parentNodes;
    };
    // check if all elements are expanded or collapsed
    // check if all elements are expanded or collapsed
    CuiTreeComponent.prototype.checkTableExpandStatus = 
    // check if all elements are expanded or collapsed
    function (tree, expand) {
        var _this = this;
        var parentNodes = this.getParentNodes(tree);
        if (parentNodes) {
            // got parent nodes
            if (expand) {
                // checking after expanding item
                return parentNodes
                    .every(function (node) { return node[_this.options.expandedKey]; });
            }
            // checking after collapsing item
            // check if all parentNodes do not have expanded property
            return parentNodes
                .every(function (node) { return !node[_this.options.expandedKey]; });
        }
        return null;
    };
    /**
     * Toggles selection of all items
     */
    /**
         * Toggles selection of all items
         */
    CuiTreeComponent.prototype.toggleAllSelected = /**
         * Toggles selection of all items
         */
    function () {
        this.allSelected = !this.allSelected;
        for (var _i = 0, _a = this.rows; _i < _a.length; _i++) {
            var item = _a[_i];
            if (
            // selectableMix restricts some rows from being selectable
            (!this.options.selectableMix || item[this.options.selectableKey]) &&
                // if the checkbox is disabled, don't mess with it
                !item[this.options.checkboxDisabled]) {
                item.selected = this.allSelected;
            }
        }
        this.tableExpanded = true;
        this.expandAll(this.rows);
        this.onSelectionChanged.emit(this.rows.filter(function (row) { return row.selected; }));
    };
    CuiTreeComponent.prototype.onItemSelectedChange = function () {
        this.onSelectionChanged.emit(this.rows.filter(function (row) { return row.selected; }));
        this.allSelected = this.data.every(this.allSelectedCheck.bind(this));
    };
    CuiTreeComponent.prototype.allSelectedCheck = function (item) {
        if (
        // if using selectableMix and the item is not selectable
        this.options.selectableMix && !item[this.options.selectableKey] ||
            // or if the checkbox is disabled
            item[this.options.checkboxDisabled]) {
            // skip over items that can't be selected
            return true;
        }
        return item.selected;
    };
    CuiTreeComponent.prototype.sortTree = function (groups) {
        var _this = this;
        if (this.options.sortByKey) {
            forOwn(groups, function (value, key) {
                groups[key] = sortBy(value, _this.options.sortByKey);
            });
        }
    };
    CuiTreeComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-tree',
                    template: "<div [class]=\"options?.wrapperClass\"> <table class=\"table table--highlight\"> <thead *ngIf=\"options?.selectable || options?.showExpandAllBtn\"> <tr> <th *ngIf=\"options?.selectable || options?.selectableMix\"> <label class=\"checkbox\"> <input type=\"checkbox\" [(ngModel)]=\"allSelected\" (click)=\"toggleAllSelected()\"/> <span class=\"checkbox__input\"></span> </label> </th> <th> <a attr.data-auto-id=\"{{options?.dataAutoId + 'toggleExpandAll'}}\" *ngIf=\"options?.showExpandAllBtn && hasChildren\" class=\"link\" (click)=\"toggleExpandAll()\">{{!tableExpanded ? 'Expand All' : 'Collapse All'}}</a> </th> </tr> </thead> <tbody> <tr *ngFor=\"let item of rows | treeShowFilter\"> <td *ngIf=\"options?.selectable || options?.selectableMix\"> <label class=\"checkbox\" *ngIf=\"(!options?.selectableMix || item[options?.selectableKey])\" [ngClass]=\"{ disabled: item[options?.checkboxDisabled] }\"> <ng-container *ngIf=\"options?.checkboxDisabled; else checkboxEnabled\"> <input type=\"checkbox\" [(ngModel)]=\"item.selected\" [disabled]=\"item[options?.checkboxDisabled]\" (ngModelChange)=\"onItemSelectedChange($event)\"/> <span class=\"checkbox__input\"></span> </ng-container> <ng-template #checkboxEnabled> <input type=\"checkbox\" [(ngModel)]=\"item.selected\" (ngModelChange)=\"onItemSelectedChange($event)\"/> <span class=\"checkbox__input\"></span> </ng-template> </label> </td> <td (click)=\"toggleItemExpanded(item, i)\"> <span *ngFor=\"let item of placeholder(item.depth); let i = index; let first = first; let last = last;\" [ngClass]=\"{'cui-tree-pl': true, 'cui-tree-angle-pl': options?.rightAlignChildMarkers ? last : first }\" [style.width.px]=\"options?.placeholderWidth\"></span> <span *ngIf=\"item.isParent\" [ngClass]=\"{ 'icon-expanded': item[options?.expandedKey], 'icon-collapsed': !item[options?.expandedKey] }\"></span> <span class=\"qtr-margin-left\" [ngClass]=\"{ 'row-center-vertical': options.rowElemsVerticallyCentered }\" (click)=\"clickTreeNode(item[options?.idKey])\"> <ng-container *ngIf=\"options?.template\"> <ng-container *ngTemplateOutlet=\"options?.template; context: { 'item': item }\"></ng-container> </ng-container> </span> </td> </tr> </tbody> </table> </div> ",
                    styles: [".cui-tree-pl { display: inline-block; height: 10px; margin-left: 15px; } .cui-tree-handle { display: inline; vertical-align: middle; width: 1.5em; height: 1.5em; } .cui-tree-angle-pl { height: 10px; display: inline-block; border-left: 1px solid #9e9ea2; border-bottom: 1px solid #9e9ea2; margin-bottom: 3px; margin-left: 10px; } .tree-icon-container i { margin-left: 10px; } .cui-tree-item-actions { margin-left: 200px; } .cui-tree-icon, .icon-expanded:after, .icon-collapsed:after { position: relative; top: 4px; } .row-center-vertical { display: inline-flex; align-items: center; } .icon-expanded:after { content: url('data:image/svg+xml;charset=utf-8,<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 56 56\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"> <!-- Generator: Sketch 47 (45396) - http://www.bohemiancoding.com/sketch --> <title>Slice 2</title> <desc>Created with Sketch.</desc> <defs></defs> <g id=\"icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"> <g id=\"chevron-up-circle\" transform=\"translate(28.000000, 28.000000) rotate(-90.000000) translate(-28.000000, -28.000000) translate(4.000000, 4.000000)\" fill=\"#58585b\"> <g id=\"Layer_1\"> <path d=\"M24,0 C10.7,0 0,10.7 0,24 C0,37.3 10.7,48 24,48 C37.3,48 48,37.3 48,24 C48,10.7 37.3,0 24,0 L24,0 Z M21.4,35.4 C21,35.8 20.5,36 20,36 C19.5,36 19,35.8 18.6,35.4 C17.8,34.6 17.8,33.4 18.6,32.6 L27.2,24 L18.6,15.4 C17.8,14.6 17.8,13.4 18.6,12.6 C19.4,11.8 20.6,11.8 21.4,12.6 L32.8,24 L21.4,35.4 L21.4,35.4 Z\" id=\"Shape\"></path> </g> </g> </g> </svg>'); } .icon-collapsed:after { content: url('data:image/svg+xml;charset=utf-8,<svg width=\"24px\" height=\"24px\" viewBox=\"0 0 58 56\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"> <title>Slice 2</title> <defs></defs> <g id=\"icons\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"> <g id=\"down-arrow-outline\" transform=\"translate(29.000000, 27.000000) rotate(90.000000) translate(-29.000000, -27.000000) translate(5.000000, 3.000000)\" fill=\"#58585b\"> <g id=\"Layer_1\"> <g id=\"Group\"> <path d=\"M20,12 C19.488,12 18.977,12.195 18.586,12.586 C17.805,13.367 17.805,14.633 18.586,15.414 L27.172,24 L18.586,32.586 C17.805,33.367 17.805,34.633 18.586,35.414 C18.977,35.805 19.488,36 20,36 C20.512,36 21.023,35.805 21.414,35.414 L32.828,24 L21.414,12.586 C21.023,12.195 20.512,12 20,12 L20,12 Z\" id=\"Shape\"></path> <path d=\"M24,0 C10.745,0 0,10.746 0,24 C0,37.255 10.745,48 24,48 C37.255,48 48,37.255 48,24 C48,10.746 37.255,0 24,0 L24,0 Z M24,44 C12.972,44 4,35.027 4,24 C4,12.972 12.972,4 24,4 C35.028,4 44,12.972 44,24 C44,35.027 35.028,44 24,44 L24,44 Z\" id=\"Shape\"></path> </g> </g> </g> </g> </svg>'); } "],
                },] },
    ];
    /** @nocollapse */
    CuiTreeComponent.ctorParameters = function () { return [
        { type: KeyValueDiffers, },
        { type: IterableDiffers, },
    ]; };
    CuiTreeComponent.propDecorators = {
        "options": [{ type: Input },],
        "data": [{ type: Input },],
        "onToggleExpand": [{ type: Output },],
        "onItemClick": [{ type: Output },],
        "onSelectionChanged": [{ type: Output },],
    };
    return CuiTreeComponent;
}());
export { CuiTreeComponent };
//# sourceMappingURL=cui-tree.component.js.map