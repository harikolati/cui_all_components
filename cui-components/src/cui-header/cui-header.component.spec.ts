import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { } from 'jasmine';

import { CuiHeaderComponent } from './cui-header.component';
import { CuiHeaderOptions } from './cui-header-options';

describe('CuiHeaderComponent', () => {
	let component: CuiHeaderComponent;
	let fixture: ComponentFixture<CuiHeaderComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	const headerOptions = new CuiHeaderOptions({
		title: 'test',
		menuToggleButton: true,
		breadcrumbs: [
			{
				label: 'Home',
				url: '/',
			},
			{
				label: 'Components',
			},
		],
		primaryNav: [
			{
				label: 'Tab 1',
				active: true,
			},
			{
				label: 'Tab 2',
			},
			{
				label: 'Tab 3',
			},
			{
				label: 'Tab 4',
			},
			{
				label: 'Tab 5',
			},
		],
		secondaryNav: [
			{
				icon: 'home',
				url: '/',
				onClick: () => {
					return true;
				},
			},
			{
				icon: 'star',
				onClick: () => {
					return true;
				},
			},
		],
		mobileNav: [
			{
				label: 'Tab 1',
				active: true,
			},
			{
				label: 'Tab 2',
			},
			{
				label: 'Tab 3',
			},
			{
				label: 'Tab 4',
			},
			{
				label: 'Tab 5',
			},
		],
		username: 'John Doe',
		toolbarButtons: [
			{
				icon: 'search',
				onClick: () => {
					return true;
				},
			},
			{
				icon: 'alert',
				color: 'negative',
				subtext: '999+',
				onClick: () => {
					return true;
				},
			},
		],
	});

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [CuiHeaderComponent],
		})
		.compileComponents();
		fixture = TestBed.createComponent(CuiHeaderComponent);
		component = fixture.componentInstance;
		component.options = headerOptions;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display a menu toggle button', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.btn.btn--small.btn--icon.toggle-menu'));
		expect(de).toBeTruthy();
	});

	it('should display a branding logo', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.header-bar__logo .icon-cisco'));
		expect(de).toBeTruthy();
	});

	it('should display breadcrumbs', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.breadcrumb a'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Home');
	});

	it('should display a title', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.page-title'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should display a primary nav', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.breadcrumb a'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Home');
	});

	it('should display a secondary nav', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.nav.nav-tabs .tab__heading'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Tab 1');
	});

	it('should display a mobile nav', () => {
		fixture.detectChanges();
		const deArray: DebugElement[] = fixture.debugElement
			.queryAll(By.css('.mobile-nav-tabs.mobile-nav--top.visible-xs li a'));
		el = deArray[2].nativeElement;
		expect(el.textContent).toContain('More');
	});

	it('should display toolbar buttons', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.header-toolbar .icon-search'));
		expect(de).toBeTruthy();
	});

	it('mobile nav should equal primary nav when no mobile nav is provided', () => {
		component.options.mobileNav = null;
		fixture.detectChanges();
		expect(component.options.primaryNav).toEqual(component.options.mobileNav);
	});

	it('should return btn--rebeccapurple', () => {
		const buttonColor = { color : 'rebeccapurple' };
		fixture.detectChanges();
		expect(component.getToolbarButtonClass(buttonColor)).toBe('btn--rebeccapurple');
	});

	it('should toggle the overflowExpanded flag', () => {
		component.overflowExpanded = true;
		fixture.detectChanges();
		component.toggleOverflow();
		expect(component.overflowExpanded).toBe(false);
	});
});
