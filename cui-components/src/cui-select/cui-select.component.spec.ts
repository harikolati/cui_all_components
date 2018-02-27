import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { CuiSelectComponent } from './cui-select.component';
import { CuiSelectModule } from './cui-select.module';
import { CommonModule } from '@angular/common';

describe('CuiSelectComponent', () => {
	let component: CuiSelectComponent;
	let fixture: ComponentFixture<CuiSelectComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	let items: any[];

	const stringItems: string[] = [
		'One',
		'Two',
		'Three',
	];

	let groupedItems: any[];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [CommonModule, FormsModule, CuiSelectModule],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiSelectComponent);
		component = fixture.componentInstance;
	});

	beforeEach(() => {
		items = [
			{
				name: 'Item One',
				value: 1,
			},
			{
				name: 'Item Two',
				value: 2,
			},
			{
				name: 'Item Three',
				value: 3,
			},
			{
				name: 'Item Four',
				value: 4,
			},
			{
				name: 'Item Five',
				value: 5,
			},
			{
				name: 'Item Six',
				value: 6,
			},
			{
				name: 'Item Seven',
				value: 7,
			},
			{
				name: 'Item Eight',
				value: 8,
			},
		];

		groupedItems = [
			{
				name: 'Group 1',
				items: [
					{
						name: 'Item One',
						value: 1,
					},
					{
						name: 'Item Two',
						value: 2,
					},
					{
						name: 'Item Three',
						value: 3,
					},
				],
			},
			{
				name: 'Group 2',
				items: [
					{
						name: 'Item Four',
						value: 4,
					},
					{
						name: 'Item Five',
						value: 5,
					},
				],
			},
			{
				name: 'Group 3',
				items: [
					{
						name: 'Item Six',
						value: 6,
					},
					{
						name: 'Item Seven',
						value: 7,
					},
					{
						name: 'Item Eight',
						value: 8,
					},
				],
			},
		];
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the dropdown only if items are provided', () => {
		component.dropdownVisible = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option span:last-child'));
		expect(de).toBeFalsy();
	});

	it('should display items', () => {
		component.items = items;
		fixture.detectChanges();
		// the following section opens dropdown and triggers change detection
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		// end section
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option span:last-child'));
		el = de.nativeElement;
		expect(el.innerHTML).toEqual('Item One');
	});

	it('should set a default selection', () => {
		items[0]['selected'] = true;
		component.items = items;
		component.dropdownVisible = true;
		fixture.detectChanges();
		expect(component.selection.value).toEqual(1);
	});

	it('should display grouped items', () => {
		component.items = groupedItems;
		component.grouped = true;
		component.dropdownVisible = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.cui-select-group-header'));
		el = de.nativeElement;
		expect(el.innerHTML).toEqual('Group 1');
	});

	it('should set a default grouped selection', () => {
		groupedItems[0]['items'][0]['selected'] = true;
		component.items = groupedItems;
		component.grouped = true;
		component.dropdownVisible = true;
		fixture.detectChanges();
		expect(component.selection.value).toEqual(1);
	});

	it('should handle string items', () => {
		component.items = stringItems;
		fixture.detectChanges();
		// the following section opens dropdown and triggers change detection
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		// end section
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option span:last-child'));
		el = de.nativeElement;
		expect(el.innerHTML).toEqual('One');
	});

	it('should select items', done => {
		component.items = items;
		component.selectChange.subscribe((selection: any) => {
			expect(selection.name).toEqual('Item One');
			done();
		});
		fixture.detectChanges();
		// the following section opens dropdown and triggers change detection
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		// end section
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option'));
		el = de.nativeElement;
		el.click();
	});

	it('should select grouped items', done => {
		component.items = groupedItems;
		component.grouped = true;
		component.dropdownVisible = true;
		component.selectChange.subscribe((selection: any) => {
			expect(selection.name).toEqual('Item One');
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option'));
		el = de.nativeElement;
		el.click();
	});

	it('should multi-select items', done => {
		component.items = items;
		component.multiSelect = true;
		component.selectChange.subscribe((selection: any) => {
			expect(selection[0].name).toEqual('Item One');
			done();
		});
		fixture.detectChanges();
		// the following section opens dropdown and triggers change detection
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		// end section
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option'));
		el = de.nativeElement;
		el.click();
		component.ngDoCheck();
	});

	it('should multi-unselect items', done => {
		component.items = items;
		component.items[0].selected = true;
		component.selection = [items[0]];
		component.multiSelect = true;
		fixture.detectChanges();
		// the following section opens dropdown and triggers change detection
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el.dispatchEvent(new Event('input'));
		component.selectChange.subscribe((selection: any) => {
			expect(selection.length).toEqual(0);
			done();
		});
		fixture.detectChanges();
		// end section
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option'));
		el = de.nativeElement;
		el.click();
		component.ngDoCheck();
	});

	it('should multi-select grouped items', done => {
		component.items = groupedItems;
		component.grouped = true;
		component.multiSelect = true;
		component.dropdownVisible = true;
		component.selectChange.subscribe((selection: any) => {
			expect(selection[0].name).toEqual('Item One');
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.cui-select-dropdown-option'));
		el = de.nativeElement;
		el.click();
		component.ngDoCheck();
	});

	it('should select all multi-select items', done => {
		component.items = items;
		component.multiSelect = true;
		component.selectAllEnabled = true;
		component.dropdownVisible = true;
		component.selectChange.subscribe((selection: any) => {
			expect(selection.length).toEqual(items.length);
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.select-all-row span'));
		el = de.nativeElement;
		el.click();
	});

	it('should unselect all multi-select items', done => {
		for (const item of items) {
			item['selected'] = true;
		}
		component.items = items;
		component.selection = items;
		component.multiSelect = true;
		component.selectAllEnabled = true;
		component.dropdownVisible = true;
		fixture.detectChanges();
		component.selectChange.subscribe((selection: any) => {
			expect(selection.length).toEqual(0);
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.select-all-row span'));
		el = de.nativeElement;
		el.click();
	});

	it('should select all grouped multi-select items', done => {
		component.items = groupedItems;
		component.grouped = true;
		component.multiSelect = true;
		component.selectAllEnabled = true;
		component.dropdownVisible = true;
		fixture.detectChanges();
		component.selectChange.subscribe((selection: any) => {
			expect(selection.length).toEqual(items.length);
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.select-all-row span'));
		el = de.nativeElement;
		el.click();
	});

	it('should unselect all grouped multi-select items', done => {
		for (const group of groupedItems) {
			for (const item of group['items']) {
				item['selected'] = true;
			}
		}
		component.items = groupedItems;
		component.grouped = true;
		component.multiSelect = true;
		component.selectAllEnabled = true;
		component.dropdownVisible = true;
		fixture.detectChanges();
		component.selectChange.subscribe((selection: any) => {
			expect(selection.length).toEqual(0);
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.select-all-row span'));
		el = de.nativeElement;
		el.click();
	});

	it('should clear all selections when multi-select clear button clicked', done => {
		component.items = items;
		component.items.forEach(item => {
			item.selected = true;
		});
		component.selection = items;
		component.multiSelect = true;
		component.empty = true;
		fixture.detectChanges();
		component.selectChange.subscribe((selection: any) => {
			expect(selection).toEqual(null);
			done();
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css(`#select-clear-${component.guid}`));
		el = de.nativeElement;
		el.click();
	});

	it('should filter items by search', () => {
		component.items = items;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el['value'] = 'One';
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(component.filteredItems.length).toEqual(1);
	});

	it('should filter grouped items by search', () => {
		component.items = groupedItems;
		component.grouped = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el['value'] = 'Item';
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(component.filteredItems[0]['items']['length']).toEqual(3);
	});

	it('should clear the search', () => {
		component.items = items;
		component.empty = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el['value'] = 'One';
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(component.filteredItems.length).toEqual(1);

		de = fixture.debugElement.query(By.css('button'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		expect(component.filteredItems.length).toEqual(items.length);
	});

	it('should clear the search for grouped items', () => {
		component.items = groupedItems;
		component.grouped = true;
		component.empty = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el['value'] = 'One';
		el.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		expect(component.filteredItems.length).toEqual(1);

		de = fixture.debugElement.query(By.css('button'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		expect(component.filteredItems.length).toEqual(groupedItems.length);
	});

	it('should toggle the dropdown', () => {
		let event: Event;
		component.items = items;
		component.dropdownVisible = true;
		component.selection = items[0];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		event = document.createEvent('Events');
		event.initEvent('mouseover', true, false);
		el.dispatchEvent(event);
		fixture.detectChanges();
		el.click();
		fixture.detectChanges();
		expect(component.dropdownVisible).toEqual(false);
		el.click();
		fixture.detectChanges();
		expect(component.dropdownVisible).toEqual(true);

		// mouse hover coverage
		event = document.createEvent('Events');
		event.initEvent('mouseleave', true, false);
		el.dispatchEvent(event);
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.cui-select-dropdown'));
		el = de.nativeElement;
		event = document.createEvent('Events');
		event.initEvent('mouseover', true, false);
		el.dispatchEvent(event);
		fixture.detectChanges();

		event = document.createEvent('Events');
		event.initEvent('mouseleave', true, false);
		el.dispatchEvent(event);
		fixture.detectChanges();
	});
});
