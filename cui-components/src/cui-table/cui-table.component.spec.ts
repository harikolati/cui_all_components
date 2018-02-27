import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CuiTableComponent } from './cui-table.component';
import { CuiTableOptions } from './cui-table-options';
import { TableData } from '../../test-data/table-data';

describe('CuiTableComponent', () => {
	let component: CuiTableComponent;
	let fixture: ComponentFixture<CuiTableComponent>;
	let de: DebugElement;
	let el: HTMLElement;
	const tableData = TableData.data;

	const tableOptions = new CuiTableOptions({
		bordered: false,
		dynamicData: false,
		selectable: true,
		columns: [
			{
				name: 'Name',
				render: item => {
					return `${item.name.last}, ${item.name.first}`;
				},
				sorting: true,
			},
			{
				name: 'Company',
				key: 'company',
			},
			{
				name: 'Email',
				key: 'email',
				width: '100%',
			},
			{
				name: 'Active',
				sortKey: 'isActive',
				render: item => {
					if (item.isActive) {
						return `<span class="icon-check text-success"></span>`;
					}

					return `<span class="icon-close text-muted"></span>`;
				},
			},
		],
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [CuiTableComponent],
		})
		.compileComponents();
		fixture = TestBed.createComponent(CuiTableComponent);
		component = fixture.componentInstance;
		component.options = tableOptions;
		component.data = tableData;
	}));

	it('should create', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('should select all', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('th input'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('td input[ng-reflect-model="true"]'));
		expect(de).toBeTruthy();
	});

	it('should select one', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('td input'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('td input[ng-reflect-model="true"]'));
		expect(de).toBeTruthy();
	});
});
