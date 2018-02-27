import { ChangeDetectorRef, Component, ElementRef, EventEmitter, forwardRef, Input, IterableDiffers, Output, QueryList, Renderer2, ViewChild, ViewChildren, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CuiSelectPaginatorDirective } from './cui-select-paginator.directive';
import { Guid, Mobile } from '@cisco-ngx/cui-utils';
import { filter, find as _find, invoke, isEqual, isNil as _isNil, map, omit, remove, } from 'lodash-es';
var CuiSelectComponent = (function () {
    function CuiSelectComponent(cdr, differs, renderer) {
        this.cdr = cdr;
        this.differs = differs;
        this.renderer = renderer;
        /**
             * The display name key for Object items.
             */
        this.optionsKey = 'name';
        /**
             * Whether the component is disabled.
             */
        this.disabled = false;
        /**
             * Whether to emit the entire selection or not
             */
        this.emitSelection = false;
        /**
             * Whether the input is required.
             */
        this.required = false;
        /**
             * Whether the items are grouped by category.
             */
        this.grouped = false;
        /**
             * Whether multi-item select is available.
             */
        this.multiSelect = false;
        /**
             * Whether a select all checkbox is available.
             */
        this.selectAllEnabled = false;
        /**
             * Tab index of the input.
             */
        this.tabIndex = -1;
        /**
             * Whether an empty selection button is available.
             */
        this.empty = false;
        /**
             * Whether to display the native mobile select element.
             */
        this.mobile = Mobile.isMobile();
        /**
             * Whether to paginate the select dropdown on scroll
             */
        this.paginate = false;
        /**
             * The placeholder text of the input element
             */
        this.placeholder = '';
        /**
             * Event emitted when an item is selected.
             * @Deprecated Use ngModelChange
             */
        this.selectChange = new EventEmitter();
        this.selectionChange = new EventEmitter();
        /**
             * Event emitted when a user types to filter
             */
        this.searchChange = new EventEmitter();
        /**
             * Whether the dropdown element is visible.
             */
        this.dropdownVisible = false;
        /**
             * Available items in the dropdown, set by the search input.
             */
        this.filteredItems = [];
        this.guid = Guid.generate();
        this.mouseInInput = false;
        this.mouseInDropdown = false;
        this.searchText = '';
        this.selectingItem = false;
        this.propagateChange = function (_) { };
        this.differ = differs.find([]).create();
    }
    CuiSelectComponent.prototype.writeValue = function (value) {
        var _this = this;
        this.selection = value;
        if (!_isNil(value)) {
            if (!this.multiSelect) {
                var foundItem = this.items.find(function (item) { return item[_this.optionsValue] === _this.selection; });
                if (!_isNil(foundItem)) {
                    this.selectItem(this.optionsValue ? foundItem : this.selection);
                }
            }
            else {
                if (this.optionsValue) {
                    this.selection = map(this.selection, function (sel) {
                        return _find(_this.items, (_a = {}, _a[_this.optionsValue] = sel, _a));
                        var _a;
                    });
                }
                this.updateMultiSelected();
            }
        }
    };
    CuiSelectComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    CuiSelectComponent.prototype.registerOnTouched = function () { };
    CuiSelectComponent.prototype.ngDoCheck = function () {
        if (this.multiSelect) {
            var changes = this.differ.diff(this.selection);
            if (!_isNil(changes) && this.multiSelect) {
                this.updateMultiSelected();
            }
        }
    };
    CuiSelectComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.items) {
            return;
        }
        if (typeof this.items[0] === 'string') {
            var resolvedItems = [];
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var item = _a[_i];
                resolvedItems.push({
                    name: item,
                    value: item,
                });
            }
            this.items = resolvedItems;
            this.optionsValue = 'value';
        }
        else {
            var multiSelection = [];
            if (this.grouped) {
                for (var _b = 0, _c = this.items; _b < _c.length; _b++) {
                    var group = _c[_b];
                    for (var _d = 0, _e = group.items; _d < _e.length; _d++) {
                        var item = _e[_d];
                        if (item.selected) {
                            if (this.multiSelect) {
                                multiSelection.push(item);
                                continue;
                            }
                            this.selection = item;
                            break;
                        }
                    }
                    if (this.selection) {
                        break;
                    }
                }
            }
            else {
                for (var _f = 0, _g = this.items; _f < _g.length; _f++) {
                    var item = _g[_f];
                    if (item.selected) {
                        if (this.multiSelect) {
                            multiSelection.push(item);
                            continue;
                        }
                        this.selection = item;
                        break;
                    }
                }
            }
            if (this.multiSelect && multiSelection.length) {
                this.selection = multiSelection;
            }
            if (this.selection) {
                this.searchText = this.multiSelect
                    ? this.getMultiSelectDisplayString() : this.selection[this.optionsKey];
            }
        }
        this.filterItems();
        this.globalClick = this.renderer.listen('document', 'click', function () {
            _this.toggleDropdown();
        });
        this.inputTitle = this.title;
    };
    CuiSelectComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.paginatorSub = this.paginatorList.changes
            .subscribe(function (updated) {
            _this.paginator = updated.first;
            _this.cdr.detectChanges();
        });
    };
    CuiSelectComponent.prototype.ngOnDestroy = function () {
        if (this.globalClick) {
            this.globalClick();
        }
        invoke(this, 'paginatorSub.unsubscribe');
    };
    CuiSelectComponent.prototype.ngOnChanges = function (changes) {
        if (changes.selection && changes.selection.currentValue) {
            if (!this.multiSelect) {
                this.selectItem(changes.selection.currentValue);
            }
            else if (!this.selectingItem) {
                this.updateMultiSelected();
            }
            this.selectingItem = false;
        }
        if (changes.items) {
            this.filterItems();
        }
        if (changes.multiSelect) {
            this.selection = null;
        }
    };
    CuiSelectComponent.prototype.setupMultiSelected = function () {
        var _this = this;
        this.items.forEach(function (item) {
            if (_this.selection.every(function (s) {
                return (!_this.optionsValue &&
                    !isEqual(omit(item, 'selected'), omit(s, 'selected'))) ||
                    (_this.optionsValue &&
                        item[_this.optionsValue] !== s[_this.optionsValue]);
            })) {
                item.selected = false;
            }
            else {
                item.selected = true;
            }
        });
    };
    CuiSelectComponent.prototype.updateMultiSelected = function () {
        var _this = this;
        if (this.selection) {
            if (this.selection.length) {
                // we want to remove selections that aren't present in the items list
                var badSelections_1 = [];
                // also want to update selections so that they reference same objects as items list
                var goodSelections_1 = [];
                this.selection.forEach(function (sel) {
                    var found = false;
                    if (!_this.grouped) {
                        _this.items.forEach(function (item) {
                            // match selections to items
                            if (isEqual(omit(item, 'selected'), omit(sel, 'selected')) ||
                                (_this.optionsValue &&
                                    item[_this.optionsValue] === sel[_this.optionsValue])) {
                                item.selected = true;
                                found = true;
                                goodSelections_1.push(item);
                            }
                            _this.removeUnselected(item);
                        });
                    }
                    else {
                        _this.items.forEach(function (group) {
                            group.items.forEach(function (item) {
                                // match selections to items
                                if (isEqual(omit(item, 'selected'), omit(sel, 'selected')) ||
                                    (_this.optionsValue &&
                                        item[_this.optionsValue] === sel[_this.optionsValue])) {
                                    item.selected = true;
                                    found = true;
                                    goodSelections_1.push(item);
                                }
                                _this.removeUnselected(item);
                            });
                        });
                    }
                    if (!found) {
                        // if selection is not found in items, remove it
                        // if selection is not found in items, remove it
                        badSelections_1.push(sel);
                    }
                });
                badSelections_1.forEach(function (bad) {
                    return remove(_this.selection, function (sel) { return isEqual(bad, sel); });
                });
                this.selection = goodSelections_1;
            }
            else {
                // set selected field to false for all items
                this.items = this.items.map(function (item) { return Object.assign({}, item, { selected: false }); });
            }
            this.outputSelection();
            if (!this.dropdownVisible) {
                this.searchText = this.getMultiSelectDisplayString();
            }
        }
    };
    CuiSelectComponent.prototype.removeUnselected = function (item) {
        var _this = this;
        // check for selections to remove
        if (this.selection.every(function (s) {
            return (!_this.optionsValue &&
                !isEqual(omit(item, 'selected'), omit(s, 'selected'))) ||
                (_this.optionsValue &&
                    item[_this.optionsValue] !== s[_this.optionsValue]);
        })) {
            item.selected = false;
        }
    };
    CuiSelectComponent.prototype.outputSelection = function () {
        if (this.optionsValue) {
            if (!this.multiSelect) {
                this.propagateChange(this.selection[this.optionsValue]);
            }
            else {
                this.propagateChange(map(this.selection, this.optionsValue));
            }
            return;
        }
        this.propagateChange(this.multiSelect ? this.selection : this.selection[0]);
        this.selectChange.emit(this.selection);
        this.selectionChange.emit(this.selection);
    };
    CuiSelectComponent.prototype.toggleDropdown = function () {
        if (this.disabled) {
            return;
        }
        if (!this.dropdownVisible) {
            if (this.mouseInInput) {
                this.input.nativeElement.focus();
                this.dropdownVisible = true;
                if (this.selection) {
                    this.searchText = '';
                    this.filterItems();
                }
            }
        }
        else if (this.mouseInInput || !this.mouseInDropdown) {
            this.dropdownVisible = false;
            if (!this.dropdownVisible && this.selection) {
                this.searchText = this.multiSelect
                    ? this.getMultiSelectDisplayString() : this.selection[this.optionsKey];
            }
        }
    };
    CuiSelectComponent.prototype.getItemDisplayName = function (item) {
        return item[this.optionsKey];
    };
    CuiSelectComponent.prototype.enterDropdown = function () {
        this.mouseInDropdown = true;
    };
    CuiSelectComponent.prototype.leaveDropdown = function () {
        this.mouseInDropdown = false;
    };
    CuiSelectComponent.prototype.enterInput = function () {
        this.mouseInInput = true;
    };
    CuiSelectComponent.prototype.leaveInput = function () {
        this.mouseInInput = false;
    };
    CuiSelectComponent.prototype.getMultiSelectDisplayString = function () {
        var displayString = '';
        for (var _i = 0, _a = this.selection; _i < _a.length; _i++) {
            var i = _a[_i];
            if (displayString.length) {
                displayString += ', ';
            }
            displayString += i[this.optionsKey];
        }
        return displayString;
    };
    CuiSelectComponent.prototype.onKeydown = function (event) {
        if (event.key === 'Enter' && this.filteredItems.length) {
            this.selectItem(this.filteredItems[0]);
        }
    };
    CuiSelectComponent.prototype.onEnterKey = function (index) {
        this.selectItem(this.filteredItems[index]);
    };
    CuiSelectComponent.prototype.onSearchChange = function () {
        this.filterItems();
        this.dropdownVisible = true;
        this.searchChange.emit(this.searchText);
    };
    CuiSelectComponent.prototype.clearSearchText = function (event) {
        event.stopPropagation();
        this.searchText = '';
        this.filterItems();
        this.dropdownVisible = false;
        if (this.grouped) {
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var g = _a[_i];
                for (var _b = 0, _c = g.items; _b < _c.length; _b++) {
                    var i = _c[_b];
                    delete i.selected;
                }
            }
        }
        else {
            for (var _d = 0, _e = this.items; _d < _e.length; _d++) {
                var i = _e[_d];
                delete i.selected;
            }
        }
        this.selection = null;
        this.outputSelection();
    };
    CuiSelectComponent.prototype.filterItems = function () {
        this.filteredItems = [];
        if (this.grouped) {
            var _loop_1 = function (group) {
                if (!this_1.searchText ||
                    !this_1.searchText.length ||
                    (!this_1.multiSelect && this_1.selection &&
                        this_1.searchText === this_1.selection[this_1.optionsKey])) {
                    this_1.filteredItems.push(group);
                    return "continue";
                }
                for (var _i = 0, _a = group.items; _i < _a.length; _i++) {
                    var item = _a[_i];
                    if (item[this_1.optionsKey].toLowerCase()
                        .indexOf(this_1.searchText.toLocaleLowerCase()) > -1) {
                        var foundGroup = _find(this_1.filteredItems, function (filteredGroup) { return group.name === filteredGroup.name; });
                        if (foundGroup) {
                            foundGroup.items.push(item);
                        }
                        else {
                            this_1.filteredItems.push({
                                name: group.name,
                                items: [item],
                            });
                        }
                    }
                }
            };
            var this_1 = this;
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var group = _a[_i];
                _loop_1(group);
            }
        }
        else {
            for (var _b = 0, _c = this.items; _b < _c.length; _b++) {
                var item = _c[_b];
                if (!this.searchText ||
                    !this.searchText.length ||
                    (!this.multiSelect && this.selection &&
                        this.searchText === this.selection[this.optionsKey])) {
                    this.filteredItems.push(item);
                    continue;
                }
                if (item[this.optionsKey].toLowerCase()
                    .indexOf(this.searchText.toLocaleLowerCase()) > -1) {
                    this.filteredItems.push(item);
                }
            }
        }
    };
    CuiSelectComponent.prototype.selectItem = function (item) {
        this.selectingItem = true;
        if (!this.multiSelect) {
            if (this.grouped) {
                for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                    var g = _a[_i];
                    for (var _b = 0, _c = g.items; _b < _c.length; _b++) {
                        var i = _c[_b];
                        delete i.selected;
                    }
                }
            }
            else {
                for (var _d = 0, _e = this.items; _d < _e.length; _d++) {
                    var i = _e[_d];
                    delete i.selected;
                }
            }
            if (!this.optionsValue || (this.optionsValue && !_isNil(item[this.optionsValue]))) {
                this.selection = item;
                this.selection.selected = true;
                this.searchText = this.selection[this.optionsKey];
                this.propagateChange((this.optionsValue) ?
                    this.selection[this.optionsValue] :
                    this.selection);
                this.selectChange.emit((this.optionsValue && !this.emitSelection) ?
                    this.selection[this.optionsValue] :
                    this.selection);
            }
            this.dropdownVisible = false;
            if (_isNil(this.title)) {
                this.inputTitle = this.selection[this.optionsKey];
            }
        }
        else {
            this.input.nativeElement.focus();
            if (item.selected) {
                this.selection = filter(this.selection, function (i) { return i !== item; });
                delete item.selected;
            }
            else {
                if (!this.selection) {
                    this.selection = [];
                }
                if (!this.optionsValue || (this.optionsValue && !_isNil(item[this.optionsValue]))) {
                    item.selected = true;
                    this.selection.push(item);
                }
            }
            /*ngDoCheck will emit the new selection */
            if (_isNil(this.title)) {
                this.inputTitle = this.getMultiSelectDisplayString();
            }
        }
        this.filterItems();
    };
    CuiSelectComponent.prototype.onMobileSelectionChanged = function () {
        if (this.optionsValue) {
            if (!this.multiSelect) {
                this.propagateChange(this.selection[this.optionsValue]);
                this.selectChange.emit(this.selection[this.optionsValue]);
            }
            else {
                this.propagateChange(map(this.selection, this.optionsValue));
            }
            return;
        }
        this.propagateChange(this.multiSelect ? this.selection : this.selection[0]);
        this.selectChange.emit(this.multiSelect ? this.selection : this.selection[0]);
    };
    CuiSelectComponent.prototype.allSelected = function () {
        if (!this.selection || !Array.isArray(this.selection)) {
            return false;
        }
        if (this.grouped) {
            var totalItems = 0;
            for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                var group = _a[_i];
                totalItems += group.items.length;
            }
            return this.selection.length === totalItems;
        }
        return this.selection.length === this.items.length;
    };
    CuiSelectComponent.prototype.toggleSelectAll = function () {
        if (!this.allSelected()) {
            this.selection = [];
            if (this.grouped) {
                for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
                    var g = _a[_i];
                    for (var _b = 0, _c = g.items; _b < _c.length; _b++) {
                        var i = _c[_b];
                        this.selection.push(i);
                        i.selected = true;
                    }
                }
            }
            else {
                for (var _d = 0, _e = this.items; _d < _e.length; _d++) {
                    var i = _e[_d];
                    this.selection.push(i);
                    i.selected = true;
                }
            }
        }
        else {
            this.selection = [];
            if (this.grouped) {
                for (var _f = 0, _g = this.items; _f < _g.length; _f++) {
                    var g = _g[_f];
                    for (var _h = 0, _j = g.items; _h < _j.length; _h++) {
                        var i = _j[_h];
                        delete i.selected;
                    }
                }
            }
            else {
                for (var _k = 0, _l = this.items; _k < _l.length; _k++) {
                    var i = _l[_k];
                    delete i.selected;
                }
            }
        }
        this.filterItems();
        this.outputSelection();
    };
    CuiSelectComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-select',
                    template: "<div class=\"form-group\"> <div class=\"form-group__text cui-select\" *ngIf=\"!mobile\" (mouseover)=\"enterInput()\" (mouseleave)=\"leaveInput()\" [ngClass]=\"{ 'focused': dropdownVisible }\"> <input #cuiSelectInput type=\"text\" class=\"cui-select-search text-ellipsis\" [ngClass]=\"{'disabled': disabled}\" name=\"select-{{guid}}\" [title]=\"inputTitle\" [(ngModel)]=\"searchText\" [required]=\"required\" [disabled]=\"disabled\" [attr.tabindex]=\"tabIndex\" autocomplete=\"off\" (input)=\"onSearchChange($event)\" [placeholder]=\"placeholder\"> <button type=\"button\" id=\"select-clear-{{guid}}\" class=\"link\" *ngIf=\"searchText && empty\" style=\"position: absolute; top: 5px; right: 20px;\" (click)=\"clearSearchText($event)\"> <span class=\"icon-close\"></span> </button> <label [innerHTML]=\"label\"></label> <div class=\"required-block\" *ngIf=\"required\"> <span class=\"icon-asterisk\"></span> </div> <span class=\"select-caret icon-dropdown\"></span> </div> <div class=\"cui-select-dropdown\" [dropdownPaginator]=\"paginate\" dropdownKeyControl [fullDataset]=\"filteredItems\" (onEnterKey)=\"onEnterKey($event)\" *ngIf=\"dropdownVisible && !grouped\" [(dropdownVisible)]=\"dropdownVisible\" (mouseover)=\"enterDropdown()\" (mouseleave)=\"leaveDropdown()\"> <div class=\"select-all-row\" *ngIf=\"multiSelect && selectAllEnabled\" [ngClass]=\"{'selected': allSelected()}\" (click)=\"toggleSelectAll()\"> <span></span> <i class=\"check icon-check\"></i> <span [innerHTML]=\"multiModelString\"></span> </div> <div class=\"cui-select-dropdown-option\" #dropdownOption *ngFor=\"let item of filteredItems | slice: paginator?.start : paginator?.start + paginator?.size\" (click)=\"selectItem(item, $event)\" [ngClass]=\"{'selected': item.selected}\"> <span *ngIf=\"multiSelect || item.selected\"></span> <i class=\"check icon-check\"></i> <span *ngIf=\"!multiSelect && !item.selected\" style=\"display: none\"></span> <span [innerHTML]=\"getItemDisplayName(item)\"></span> </div> </div> <div class=\"cui-select-dropdown\" *ngIf=\"dropdownVisible && grouped\" [(dropdownVisible)]=\"dropdownVisible\" dropdownKeyControl [fullDataset]=\"filteredItems\" (onEnterKey)=\"onEnterKey($event)\" (mouseover)=\"enterDropdown()\" (mouseleave)=\"leaveDropdown()\"> <div class=\"select-all-row\" *ngIf=\"multiSelect && selectAllEnabled\" [ngClass]=\"{'selected': allSelected()}\" (click)=\"toggleSelectAll()\"> <span></span> <i class=\"check icon-check\"></i> <span [innerHTML]=\"multiModelString\"></span> </div> <div class=\"cui-select-group\" *ngFor=\"let group of filteredItems\"> <span class=\"cui-select-group-header\" [innerHTML]=\"group.name\"></span> <div class=\"cui-select-dropdown-option\" #dropdownOption *ngFor=\"let item of group.items\" (click)=\"selectItem(item, $event)\" [ngClass]=\"{ 'selected': item.selected }\"> <span *ngIf=\"multiSelect || item.selected\"></span> <i class=\"check icon-check\"></i> <span *ngIf=\"!multiSelect && !item.selected\" style=\"display: none\"></span> <span [innerHTML]=\"getItemDisplayName(item)\"></span> </div> </div> </div> <div class=\"form-group__text select\" *ngIf=\"mobile\"> <select class=\"mobile-select\" name=\"select-{{guid}}\" *ngIf=\"!grouped\" (change)=\"onMobileSelectionChanged($event)\" [(ngModel)]=\"selection\" [required]=\"required\" [disabled]=\"disabled\" [multiple]=\"multiSelect\"> <option *ngFor=\"let item of filteredItems\" [value]=\"item\" [innerHTML]=\"getItemDisplayName(item)\"></option> </select> <select class=\"mobile-select\" name=\"select-{{guid}}\" *ngIf=\"grouped\" (change)=\"onMobileSelectionChanged($event)\" [(ngModel)]=\"selection\" [required]=\"required\" [disabled]=\"disabled\"  [multiple]=\"multiSelect\"> <optgroup *ngFor=\"let group of filteredItems\" [label]=\"group.name\"> <option *ngFor=\"let item of group.items\" [value]=\"item\" [innerHTML]=\"getItemDisplayName(item)\"></option> </optgroup> </select> <label *ngIf=\"label\" [innerHTML]=\"label\"></label> <div class=\"required-block\" *ngIf=\"required\"> <span class=\"icon-asterisk\"></span> </div> </div> </div> ",
                    styles: [".full-page { position: fixed; top: 0; right: 0; bottom: 0; left: 0; } .divider--vertical > :after { color: #9e9ea2; content: '|'; margin: 0 5px; padding: 0; } div .cui-select { position: relative; display: flex; transition: all 0.2s ease; /* fixes an issue in firefox where hover state would stick (fix also includes order: 0; in input)*/ flex-direction: row-reverse; } div .cui-select:hover, div .cui-select:focus { color: #049fd9; z-index: 1; } div .cui-select:hover:after, div .cui-select:focus:after { color: #049fd9; } div .cui-select:hover ~ label, div .cui-select:focus ~ label { color: #58585b; } div .cui-select ~ label { color: #9e9ea2; } div .cui-select label:first-of-type { order: 0; cursor: pointer; height: 33px; } div .cui-select label:first-of-type:hover { color: #58585b; } div .cui-select .select-caret { position: absolute; right: 5px; top: 7px; color: #c6c7ca; pointer-events: none; text-align: center; transition: none; } div .cui-select:hover .select-caret { color: #049fd9; } div .cui-select > input:first-of-type { cursor: pointer; order: 0; margin-right: 34px; } div .cui-select > input:first-of-type.placeholder { color: #9e9ea2; font-style: italic; transition: all 0.2s ease; } div .cui-select > input:first-of-type.placeholder:hover { color: #58585b; font-style: normal; } div .cui-select > input:first-of-type.disabled { cursor: not-allowed; } div .cui-select.focused .select-caret { color: #58585b; transition: none; transform: rotate(180deg); } div .cui-select.focused:hover .select-caret { color: #049fd9; } div .cui-select .required-block { order: -1; } .cui-select-dropdown { position: absolute; width: 100%; max-height: 198px; background: #ffffff; border-left: 1px solid #c6c7ca; border-right: 1px solid #c6c7ca; border-bottom: 1px solid #c6c7ca; overflow: auto; z-index: 5000; } @media screen and (max-width: 766px) { .cui-select-dropdown { top: 33px; } } @media screen and (min-width: 766px) { .cui-select-dropdown { top: 36px; } } .cui-select-dropdown .cui-select-group .cui-select-group-header { display: block; padding: 6px; font-weight: 300; color: #9e9ea2; } .cui-select-dropdown .cui-select-group .cui-select-dropdown-option:last-child, .cui-select-dropdown .cui-select-group .select-all-row:last-child { height: 40px; padding-bottom: 0; } .cui-select-dropdown .cui-select-group:last-child .cui-select-dropdown-option:last-child, .cui-select-dropdown .cui-select-group:last-child .select-all-row:last-child { height: 49px; padding-bottom: 22px; } .cui-select-dropdown .cui-select-dropdown-option, .cui-select-dropdown .select-all-row { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position: relative; height: 40px; padding-left: 14px; padding-right: 14px; padding-top: 3px; padding-bottom: 2px; cursor: pointer; color: #58585b; vertical-align: middle; font-size: 14px; } .cui-select-dropdown .cui-select-dropdown-option.active, .cui-select-dropdown .active.select-all-row, .cui-select-dropdown .cui-select-dropdown-option:hover:not([style*=\"background-color\"]), .cui-select-dropdown .select-all-row:hover:not([style*=\"background-color\"]), .cui-select-dropdown .cui-select-dropdown-option.active, .cui-select-dropdown .active.select-all-row { background: #049fd9; color: #ffffff; font-weight: bold; } .cui-select-dropdown .cui-select-dropdown-option.active span:first-child:before, .cui-select-dropdown .active.select-all-row span:first-child:before, .cui-select-dropdown .cui-select-dropdown-option:hover:not([style*=\"background-color\"]) span:first-child:before, .cui-select-dropdown .select-all-row:hover:not([style*=\"background-color\"]) span:first-child:before, .cui-select-dropdown .cui-select-dropdown-option.active span:first-child:before, .cui-select-dropdown .active.select-all-row span:first-child:before { box-shadow: inset 0 0 0 2px #ffffff; } .cui-select-dropdown .cui-select-dropdown-option.active span:first-child + .check, .cui-select-dropdown .active.select-all-row span:first-child + .check, .cui-select-dropdown .cui-select-dropdown-option:hover:not([style*=\"background-color\"]) span:first-child + .check, .cui-select-dropdown .select-all-row:hover:not([style*=\"background-color\"]) span:first-child + .check, .cui-select-dropdown .cui-select-dropdown-option.active span:first-child + .check, .cui-select-dropdown .active.select-all-row span:first-child + .check { color: #ffffff; } .cui-select-dropdown .cui-select-dropdown-option:first-child, .cui-select-dropdown .select-all-row:first-child { margin-top: 1px; } .cui-select-dropdown .cui-select-dropdown-option:last-child, .cui-select-dropdown .select-all-row:last-child { height: 49px; padding-bottom: 22px; } .cui-select-dropdown .cui-select-dropdown-option.selected span:first-child:before, .cui-select-dropdown .selected.select-all-row span:first-child:before { box-shadow: inset 0 0 0 2px #049fd9; } .cui-select-dropdown .cui-select-dropdown-option.selected span:first-child + .check, .cui-select-dropdown .selected.select-all-row span:first-child + .check { display: block; } .cui-select-dropdown .cui-select-dropdown-option.selected:hover:not([style*=\"background-color\"]) span:first-child:before, .cui-select-dropdown .selected.select-all-row:hover:not([style*=\"background-color\"]) span:first-child:before, .cui-select-dropdown .cui-select-dropdown-option.selected.active span:first-child:before, .cui-select-dropdown .selected.active.select-all-row span:first-child:before { box-shadow: inset 0 0 0 2px #ffffff; } .cui-select-dropdown .cui-select-dropdown-option .check, .cui-select-dropdown .select-all-row .check { display: none; } .cui-select-dropdown .cui-select-dropdown-option span:first-child, .cui-select-dropdown .select-all-row span:first-child { display: inline-block; width: 28px; height: 28px; vertical-align: middle; } .cui-select-dropdown .cui-select-dropdown-option span:first-child:before, .cui-select-dropdown .select-all-row span:first-child:before { position: absolute; top: 13px; right: 0; bottom: 0; left: 14px; width: 16px; height: 16px; content: ''; } .cui-select-dropdown .cui-select-dropdown-option span:first-child:before, .cui-select-dropdown .select-all-row span:first-child:before { box-shadow: inset 0 0 0 2px #9e9ea2; } .cui-select-dropdown .cui-select-dropdown-option span:first-child + .check, .cui-select-dropdown .select-all-row span:first-child + .check { display: none; position: absolute; top: 13px; right: 0; bottom: 0; left: 14px; width: 16px; height: 16px; color: #049fd9; font-weight: bold; line-height: 1; padding: 3px; font-size: 10px; } .cui-select-dropdown .cui-select-dropdown-option span:nth-child(3), .cui-select-dropdown .select-all-row span:nth-child(3) { position: absolute; left: 42px; top: 11px; } .cui-select-dropdown .select-all-row { padding-left: 0; padding-right: 0; height: 44px; cursor: pointer; } .cui-select-dropdown .select-all-row:after { height: 1px; background: #c6c7ca; content: \"\"; display: block; margin-top: 12px; } cui-select > .form-group--compressed > .cui-select-dropdown { top: 28px; } cui-select > .form-group--compressed > .cui-select:after { top: 2px; } "],
                    providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return CuiSelectComponent; }),
                            multi: true,
                        },
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiSelectComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
        { type: IterableDiffers, },
        { type: Renderer2, },
    ]; };
    CuiSelectComponent.propDecorators = {
        "items": [{ type: Input },],
        "selection": [{ type: Input },],
        "optionsKey": [{ type: Input },],
        "optionsValue": [{ type: Input },],
        "disabled": [{ type: Input },],
        "emitSelection": [{ type: Input },],
        "required": [{ type: Input },],
        "grouped": [{ type: Input },],
        "multiSelect": [{ type: Input },],
        "selectAllEnabled": [{ type: Input },],
        "title": [{ type: Input },],
        "label": [{ type: Input },],
        "tabIndex": [{ type: Input },],
        "empty": [{ type: Input },],
        "mobile": [{ type: Input },],
        "paginate": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "selectChange": [{ type: Output },],
        "selectionChange": [{ type: Output },],
        "searchChange": [{ type: Output },],
        "input": [{ type: ViewChild, args: ['cuiSelectInput',] },],
        "paginatorList": [{ type: ViewChildren, args: [CuiSelectPaginatorDirective,] },],
    };
    return CuiSelectComponent;
}());
export { CuiSelectComponent };
//# sourceMappingURL=cui-select.component.js.map