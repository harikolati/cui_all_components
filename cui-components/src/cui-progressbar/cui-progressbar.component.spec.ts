import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiProgressbarComponent } from './cui-progressbar.component';


describe('CuiProgressbarComponent', () => {
	let component: CuiProgressbarComponent;
	let fixture: ComponentFixture<CuiProgressbarComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CuiProgressbarComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CuiProgressbarComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display title', () => {
		component.title = 'testing';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.progressbar__header-msg'));
		el = de.nativeElement;
		expect(el.textContent).toContain('testing');
	});

	it('should display subtitle', () => {
		component.subtitle = true;
		component.percentage = 50;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.progressbar__percent-complete-msg'));
		el = de.nativeElement;
		expect(el.textContent).toContain('50');
	});

	it('should not display subtitle', () => {
		component.subtitle = false;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.progressbar__percent-complete-msg'));
		expect(de).toBeNull();
	});

	it('should display percent complete bar', () => {
		component.percentage = 50;
		fixture.detectChanges();

		const compiled = fixture.debugElement.nativeElement;
		const nnm: NamedNodeMap =
			<NamedNodeMap>compiled.querySelector('.progressbar__bar-mask').attributes;
		expect(nnm.getNamedItem('style').value).toContain('50');
	});

});
