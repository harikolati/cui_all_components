import {
	ChangeDetectorRef,
	Component,
	DoCheck,
	ElementRef,
	EventEmitter,
	forwardRef,
	Input,
	IterableDiffer,
	IterableDiffers,
	OnChanges,
	OnDestroy,
	Output,
	OnInit,
	QueryList,
	Renderer2,
	SimpleChanges,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { CuiSelectPaginatorDirective } from './cui-select-paginator.directive';
import { Guid, Mobile } from '@cisco-ngx/cui-utils';
import {
	filter,
	find as _find,
	invoke,
	isEqual,
	isNil as _isNil,
	map,
	omit,
	remove,
} from 'lodash-es';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'cui-select',
	templateUrl: './cui-select.component.html',
	styleUrls: ['./cui-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CuiSelectComponent),
			multi: true,
		},
	],
})
/**
 * Component for combo box selection.
 */
export class CuiSelectComponent implements DoCheck, OnInit, OnDestroy, OnChanges {
	/**
	 * The items available for selection.
	 */
	@Input() items: any[];
	/**
	 * The currently selected item(s).
	 * @Deprecated Use ngModel
	 */
	@Input() selection: any;
	/**
	 * The display name key for Object items.
	 */
	@Input() optionsKey = 'name';
	/**
	 * Optional value key for Object items.
	 */
	@Input() optionsValue: string;
	/**
	 * Whether the component is disabled.
	 */
	@Input() disabled = false;
	/**
	 * Whether to emit the entire selection or not
	 */
	@Input() emitSelection = false;
	/**
	 * Whether the input is required.
	 */
	@Input() required = false;
	/**
	 * Whether the items are grouped by category.
	 */
	@Input() grouped = false;
	/**
	 * Whether multi-item select is available.
	 */
	@Input() multiSelect = false;
	/**
	 * Whether a select all checkbox is available.
	 */
	@Input() selectAllEnabled = false;
	/**
	 * Optional title text for the component.
	 */
	@Input() title: string;
	/**
	 * Optional label for the input.
	 */
	@Input() label: string;
	/**
	 * Tab index of the input.
	 */
	@Input() tabIndex = -1;
	/**
	 * Whether an empty selection button is available.
	 */
	@Input() empty = false;
	/**
	 * Whether to display the native mobile select element.
	 */
	@Input() mobile = Mobile.isMobile();
	/**
	 * Whether to paginate the select dropdown on scroll
	 */
	@Input() paginate = false;
	/**
	 * The placeholder text of the input element
	 */
	@Input() placeholder = '';
	/**
	 * Event emitted when an item is selected.
	 * @Deprecated Use ngModelChange
	 */
	@Output() selectChange: EventEmitter<any> = new EventEmitter();
	@Output() selectionChange: EventEmitter<any> = new EventEmitter();
	/**
	 * Event emitted when a user types to filter
	 */
	@Output() searchChange: EventEmitter<string> = new EventEmitter<string>();


	@ViewChild('cuiSelectInput') input: ElementRef;
	@ViewChildren(CuiSelectPaginatorDirective)
	paginatorList: QueryList<CuiSelectPaginatorDirective>;

	paginator: CuiSelectPaginatorDirective;
	paginatorSub: Subscription;

	/**
	 * Whether the dropdown element is visible.
	 */
	public dropdownVisible = false;
	/**
	 * Available items in the dropdown, set by the search input.
	 */
	public filteredItems: any[] = [];

	public guid = Guid.generate();
	private mouseInInput = false;
	private mouseInDropdown = false;
	public searchText = '';
	private globalClick: any;
	private selectingItem = false;
	private inputTitle: string;
	private differ: IterableDiffer<any>;

	constructor(
		private cdr: ChangeDetectorRef,
		private differs: IterableDiffers,
		private renderer: Renderer2,
	) {
		this.differ = differs.find([]).create();
	}

	propagateChange: Function = (_: any) => {};
	writeValue (value: any) {
		this.selection = value;
		if (!_isNil(value)) {
			if (!this.multiSelect) {
				const foundItem = this.items.find(
					item => item[this.optionsValue] === this.selection,
				);
				if (!_isNil(foundItem)) {
					this.selectItem(this.optionsValue ? foundItem : this.selection);
				}
			} else {
				if (this.optionsValue) {
					this.selection = map(
						this.selection,
						sel => _find(this.items, { [this.optionsValue]: sel }),
					);
				}
				this.updateMultiSelected();
			}
		}
	}
	registerOnChange (fn: Function) {
		this.propagateChange = fn;
	}
	registerOnTouched () {}

	ngDoCheck () {
		if (this.multiSelect) {
			const changes = this.differ.diff(this.selection);
			if (!_isNil(changes) && this.multiSelect) {
				this.updateMultiSelected();
			}
		}
	}

	ngOnInit () {
		if (!this.items) {
			return;
		}

		if (typeof this.items[0] === 'string') {
			const resolvedItems = [];
			for (const item of this.items) {
				resolvedItems.push({
					name: item,
					value: item,
				});
			}

			this.items = resolvedItems;
			this.optionsValue = 'value';
		} else {
			const multiSelection = [];
			if (this.grouped) {
				for (const group of this.items) {
					for (const item of group.items) {
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
			} else {
				for (const item of this.items) {
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

		this.globalClick = this.renderer.listen('document', 'click', () => {
			this.toggleDropdown();
		});

		this.inputTitle = this.title;

	}

	ngAfterViewInit () {
		this.paginatorSub = this.paginatorList.changes
			.subscribe((updated: QueryList<CuiSelectPaginatorDirective>) => {
				this.paginator = updated.first;
				this.cdr.detectChanges();
			});
	}

	ngOnDestroy () {
		if (this.globalClick) {
			this.globalClick();
		}
		invoke(this, 'paginatorSub.unsubscribe');
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes.selection && changes.selection.currentValue) {
			if (!this.multiSelect) {
				this.selectItem(changes.selection.currentValue);
			} else if (!this.selectingItem) {
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
	}

	setupMultiSelected () {
		this.items.forEach(item => {
			if (this.selection.every((s: any) => (!this.optionsValue &&
			!isEqual(omit(item, 'selected'), omit(s, 'selected'))) ||
			(this.optionsValue &&
			item[this.optionsValue] !== s[this.optionsValue]))) {
				item.selected = false;
			} else {
				item.selected = true;
			}
		});
	}

	updateMultiSelected () {
		if (this.selection) {
			if (this.selection.length) {
				// we want to remove selections that aren't present in the items list
				const badSelections: any[] = [];
				// also want to update selections so that they reference same objects as items list
				const goodSelections: any[] = [];
				this.selection.forEach((sel: any) => {
					let found = false;
					if (!this.grouped) {
						this.items.forEach((item: any) => {
							// match selections to items
							if (
								isEqual(omit(item, 'selected'), omit(sel, 'selected')) ||
								(this.optionsValue &&
								item[this.optionsValue] === sel[this.optionsValue])
							) {
								item.selected = true;
								found = true;
								goodSelections.push(item);
							}
							this.removeUnselected(item);
						});
					} else {
						this.items.forEach((group: any) => {
							group.items.forEach((item: any) => {
								// match selections to items
								if (
									isEqual(omit(item, 'selected'), omit(sel, 'selected')) ||
									(this.optionsValue &&
									 item[this.optionsValue] === sel[this.optionsValue])
								) {
									item.selected = true;
									found = true;
									goodSelections.push(item);
								}
								this.removeUnselected(item);
							});
						});
					}
					if (!found) {
						// if selection is not found in items, remove it
						badSelections.push(sel);
					}
				});
				badSelections.forEach(bad => remove(
					this.selection,
					(sel: any) => isEqual(bad, sel),
				));
				this.selection = goodSelections;
			} else {
				// set selected field to false for all items
				this.items = this.items.map(item => Object.assign({}, item, { selected: false }));
			}
			this.outputSelection();
			if (!this.dropdownVisible) {
				this.searchText = this.getMultiSelectDisplayString();
			}
		}
	}

	removeUnselected (item: any) {
		// check for selections to remove
		if (
			this.selection.every((s: any) => (
				!this.optionsValue &&
					!isEqual(omit(item, 'selected'), omit(s, 'selected'))) ||
					(this.optionsValue &&
					 item[this.optionsValue] !== s[this.optionsValue]),
								)
		) {
			item.selected = false;
		}
	}

	outputSelection () {
		if (this.optionsValue) {
			if (!this.multiSelect) {
				this.propagateChange(this.selection[this.optionsValue]);
			} else {
				this.propagateChange(map(this.selection, this.optionsValue));
			}

			return;
		}
		this.propagateChange(this.multiSelect ? this.selection : this.selection[0]);
		this.selectChange.emit(this.selection);
		this.selectionChange.emit(this.selection);
	}

	private toggleDropdown () {
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
		} else if (this.mouseInInput || !this.mouseInDropdown) {
			this.dropdownVisible = false;
			if (!this.dropdownVisible && this.selection) {
				this.searchText = this.multiSelect
					? this.getMultiSelectDisplayString() : this.selection[this.optionsKey];
			}
		}
	}

	private getItemDisplayName (item: any) {
		return item[this.optionsKey];
	}

	private enterDropdown () {
		this.mouseInDropdown = true;
	}

	private leaveDropdown () {
		this.mouseInDropdown = false;
	}

	private enterInput () {
		this.mouseInInput = true;
	}

	private leaveInput () {
		this.mouseInInput = false;
	}

	private getMultiSelectDisplayString () {
		let displayString = '';
		for (const i of this.selection) {
			if (displayString.length) {
				displayString += ', ';
			}
			displayString += i[this.optionsKey];
		}

		return displayString;
	}

	private onKeydown (event: KeyboardEvent) {
		if (event.key === 'Enter' && this.filteredItems.length) {
			this.selectItem(this.filteredItems[0]);
		}
	}

	private onEnterKey (index: any) {
		this.selectItem(this.filteredItems[index]);
	}

	private onSearchChange () {
		this.filterItems();
		this.dropdownVisible = true;
		this.searchChange.emit(this.searchText);
	}

	private clearSearchText (event: Event) {
		event.stopPropagation();
		this.searchText = '';
		this.filterItems();
		this.dropdownVisible = false;
		if (this.grouped) {
			for (const g of this.items) {
				for (const i of g.items) {
					delete i.selected;
				}
			}
		} else {
			for (const i of this.items) {
				delete i.selected;
			}
		}
		this.selection = null;
		this.outputSelection();
	}

	private filterItems () {
		this.filteredItems = [];
		if (this.grouped) {
			for (const group of this.items) {
				if (
					!this.searchText ||
					!this.searchText.length ||
					(!this.multiSelect && this.selection &&
					this.searchText === this.selection[this.optionsKey])
				) {
					this.filteredItems.push(group);
					continue;
				}

				for (const item of group.items) {
					if (
						item[this.optionsKey].toLowerCase()
					.indexOf(this.searchText.toLocaleLowerCase()) > -1
					) {
						const foundGroup: any = _find(
							this.filteredItems,
							(filteredGroup: any) => group.name === filteredGroup.name,
						);
						if (foundGroup) {
							foundGroup.items.push(item);
						} else {
							this.filteredItems.push({
								name: group.name,
								items: [item],
							});
						}
					}
				}
			}
		} else {
			for (const item of this.items) {
				if (
					!this.searchText ||
					!this.searchText.length ||
					(!this.multiSelect && this.selection &&
					this.searchText === this.selection[this.optionsKey])
				) {
					this.filteredItems.push(item);
					continue;
				}

				if (
					item[this.optionsKey].toLowerCase()
						.indexOf(this.searchText.toLocaleLowerCase()) > -1
				) {
					this.filteredItems.push(item);
				}
			}
		}
	}

	private selectItem (item: any) {
		this.selectingItem = true;
		if (!this.multiSelect) {
			if (this.grouped) {
				for (const g of this.items) {
					for (const i of g.items) {
						delete i.selected;
					}
				}
			} else {
				for (const i of this.items) {
					delete i.selected;
				}
			}
			if (!this.optionsValue || (this.optionsValue && !_isNil(item[this.optionsValue]))) {
				this.selection = item;
				this.selection.selected = true;
				this.searchText = this.selection[this.optionsKey];
				this.propagateChange(
					(this.optionsValue) ?
						this.selection[this.optionsValue] :
						this.selection,
				);
				this.selectChange.emit(
					(this.optionsValue && !this.emitSelection) ?
						this.selection[this.optionsValue] :
						this.selection,
				);
			}
			this.dropdownVisible = false;
			if (_isNil(this.title)) {
				this.inputTitle = this.selection[this.optionsKey];
			}
		} else {
			this.input.nativeElement.focus();
			if (item.selected) {
				this.selection = filter(this.selection, (i: any) => i !== item);
				delete item.selected;
			} else {
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
	}

	private onMobileSelectionChanged () {
		if (this.optionsValue) {
			if (!this.multiSelect) {
				this.propagateChange(this.selection[this.optionsValue]);
				this.selectChange.emit(this.selection[this.optionsValue]);
			} else {
				this.propagateChange(map(this.selection, this.optionsValue));
			}

			return;
		}
		this.propagateChange(this.multiSelect ? this.selection : this.selection[0]);
		this.selectChange.emit(this.multiSelect ? this.selection : this.selection[0]);
	}

	private allSelected (): boolean {
		if (!this.selection || !Array.isArray(this.selection)) {
			return false;
		}

		if (this.grouped) {
			let totalItems = 0;
			for (const group of this.items) {
				totalItems += group.items.length;
			}

			return this.selection.length === totalItems;
		}

		return this.selection.length === this.items.length;
	}

	private toggleSelectAll () {
		if (!this.allSelected()) {
			this.selection = [];
			if (this.grouped) {
				for (const g of this.items) {
					for (const i of g.items) {
						this.selection.push(i);
						i.selected = true;
					}
				}
			} else {
				for (const i of this.items) {
					this.selection.push(i);
					i.selected = true;
				}
			}
		} else {
			this.selection = [];
			if (this.grouped) {
				for (const g of this.items) {
					for (const i of g.items) {
						delete i.selected;
					}
				}
			} else {
				for (const i of this.items) {
					delete i.selected;
				}
			}
		}
		this.filterItems();
		this.outputSelection();
	}
}
