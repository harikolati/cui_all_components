import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiSidebarComponent } from './cui-sidebar.component';
import { CuiSidebarOptions } from './cui-sidebar-options';

describe('CuiSidebarComponent', () => {
	let component: CuiSidebarComponent;
	let fixture: ComponentFixture<CuiSidebarComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	let triggered = false;

	const sidebarOptions = new CuiSidebarOptions({
		title: 'Test Sidebar',
		toolbarButtons: [
			{
				icon: 'icon-home',
				onClick: () => {
					triggered = true;
				},
			},
		],
		items: [
			{
				title: 'Item',
				onClick: () => {
					triggered = true;
				},
			},
			{
				title: 'Drawer',
				subItems: [
					{
						title: 'Sub Item',
						onClick: () => {
							triggered = true;
						},
					},
				],
			},
		],
	});

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CuiSidebarComponent],
		});
		fixture = TestBed.createComponent(CuiSidebarComponent);
		component = fixture.componentInstance;
		component.options = sidebarOptions;
		triggered = false;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display a title', () => {
		de = fixture.debugElement.query(By.css('.sidebar__header-title'));
		el = de.nativeElement;
		expect(el.innerHTML).toEqual('Test Sidebar');
	});

	it('should display a toolbar buttons', () => {
		de = fixture.debugElement.query(By.css('button'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(triggered).toEqual(true);
	});

	it('should display a single item', () => {
		de = fixture.debugElement.query(By.css('.sidebar__item a span'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(el.innerHTML).toEqual('Item');
		expect(triggered).toEqual(true);
	});

	it('should display a drawer', () => {
		de = fixture.debugElement.query(By.css('.sidebar__drawer'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.sidebar__drawer--opened'));
		expect(de).toBeTruthy();
	});

	it('should display sub items', () => {
		de = fixture.debugElement.query(By.css('.sidebar__drawer'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.sidebar__drawer .sidebar__item a span'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(el.innerHTML).toEqual('Sub Item');
		expect(triggered).toEqual(true);
	});
});
