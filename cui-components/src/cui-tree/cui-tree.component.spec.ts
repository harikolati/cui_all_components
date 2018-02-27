import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiTreeComponent } from './cui-tree.component';
import { CuiTreeOptions } from './cui-tree-options';
import { CuiTreePipe } from './cui-tree.pipe';

describe('CuiTreeComponent', () => {
	let component: CuiTreeComponent;
	let fixture: ComponentFixture<CuiTreeComponent>;
	let de: DebugElement | DebugElement[];
	let el: HTMLElement;

	const treeOptions = new CuiTreeOptions({});
	const data = [
		{ id: '1', name: 'test1', expanded: true },
		{ id: '2', name: 'test2', parent: '1' },
		{ id: '3', name: 'test3', parent: '2' },
		{ id: '4', name: 'test4' },
		{ id: '5', name: 'test5', parent: '4' },
		{ id: '6', name: 'test6', parent: '4' },
	];
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [CuiTreeComponent, CuiTreePipe],
		})
		.compileComponents();
		fixture = TestBed.createComponent(CuiTreeComponent);
		component = fixture.componentInstance;
		component.options = treeOptions;
		component.data = data;
		fixture.detectChanges();
	});
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should show 3 nodes', () => {
		de = fixture.debugElement.queryAll(By.css('tbody > tr'));
		expect(de.length).toBe(3);
	});
	it('should expand/collapse a node', () => {
		de = fixture.debugElement.query(By.css('tbody > tr:last-child > td'));
		const rowElem = de.nativeElement;
		rowElem.click();
		fixture.detectChanges();
		de = fixture.debugElement.queryAll(By.css('tbody > tr'));
		expect(de.length).toBe(5);
		rowElem.click();
		fixture.detectChanges();
		de = fixture.debugElement.queryAll(By.css('tbody > tr'));
		expect(de.length).toBe(3);
	});
	it('should expand all nodes', () => {
		de = fixture.debugElement.query(By.css('[data-auto-id=cui-tree--toggleExpandAll]'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.queryAll(By.css('tbody > tr'));
		expect(de.length).toBe(6);
	});
	it('should collapse all nodes', () => {
		de = fixture.debugElement.query(By.css('[data-auto-id=cui-tree--toggleExpandAll]'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.queryAll(By.css('tbody > tr'));
		expect(de.length).toBe(2);
		de = fixture.debugElement.query(By.css('[data-auto-id=cui-tree--toggleExpandAll]'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.queryAll(By.css('tbody > tr'));
		expect(de.length).toBe(6);
	});
	it('should not allow duplicates', () => {
		component.data[0].id = '2';
		component.ngOnChanges({
			data: new SimpleChange(null, component.data, true),
		});
		fixture.detectChanges();
		expect(component.rows.length).toBe(0);
		component.data[0].id = '1';
	});
	it('should select an item', () => {
		component.options.selectable = true;
		component.ngOnChanges({
			options: new SimpleChange(null, component.options, true),
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('tbody tr input'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.rows[0].selected).toBe(true);
		el.click();
		fixture.detectChanges();
		expect(component.rows[0].selected).toBe(false);
	});
	it('should select/deselect all', () => {
		component.options.selectable = true;
		component.ngOnChanges({
			options: new SimpleChange(null, component.options, true),
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('thead tr input'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.rows.every(row => row.selected)).toBe(true);
		el.click();
		fixture.detectChanges();
		expect(component.rows.every(row => row.selected)).toBe(false);
	});
});
