import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiLoaderComponent } from './cui-loader.component';

describe('CuiLoaderComponent', () => {
	let component: CuiLoaderComponent;
	let fixture: ComponentFixture<CuiLoaderComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CuiLoaderComponent],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiLoaderComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render text in a h4 tag', () => {
		component.label = 'Loading';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('h4'));
		el = de.nativeElement;
		expect(el.textContent).toContain('Loading');
	});

	it('should have loading dots', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.loading-dots'));
		el = de.nativeElement;
		expect(el.textContent).toBeTruthy();
	});

	it('should color loading dots', () => {
		component.color = 'info';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.loading-dots--info'));
		el = de.nativeElement;
		expect(el.textContent).toBeTruthy();
	});

	it('should return "" if color is white', () => {
		component.color = 'white';
		fixture.detectChanges();
		expect(component.getColorClass()).toBe('');
	});
});
