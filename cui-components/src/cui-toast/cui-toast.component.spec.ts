import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiToastComponent } from './cui-toast.component';

describe('CuiToastComponent', () => {
	let component: CuiToastComponent;
	let fixture: ComponentFixture<CuiToastComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CuiToastComponent]
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiToastComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display an icon', () => {
		component.addToast('info', 'test', 'test');
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-info'));
		expect(de).toBeTruthy();
	});

	it('should display a title', () => {
		component.addToast('info', 'test', 'test');
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.toast__title'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should display a message', () => {
		component.addToast('info', 'test', 'test');
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.toast__message'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should values passed to toast', () => {
		const toast = component.addToast('info', 'test', 'test');
		expect(toast.title).toEqual('test');
		expect(toast.message).toEqual('test');
		expect(toast.popped).toEqual(true);
	});

	it('should render default values in update function', () => {
		const toast = component.addToast('info', 'test', 'test');

		toast.update(undefined, undefined, undefined);
		expect(toast.title).toEqual('test');
		expect(toast.message).toEqual('test');
		expect(toast.popped).toEqual(true);
	});

	it('should hide the toast', () => {
		const toast = component.addToast('info', 'test', 'test');
		component.removeToast(toast);
		expect(toast.popped).toEqual(false);
	});
});
