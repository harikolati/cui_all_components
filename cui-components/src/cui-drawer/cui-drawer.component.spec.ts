import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiDrawerComponent } from './cui-drawer.component';
import { CuiDrawerModule } from './cui-drawer.module';

describe('CuiDrawerComponent', () => {
	let component: CuiDrawerComponent;
	let fixture: ComponentFixture<CuiDrawerComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [CuiDrawerModule],
		})
		.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiDrawerComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have a label', () => {
		component.label = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('#label'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('should expand when clicked', () => {
		de = fixture.debugElement.query(By.css('.toggle'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('div.half-margin-top'));
		expect(de).toBeTruthy();
	});

	it('should have chevrons', () => {
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-down'));
		expect(de).toBeTruthy();

		de = fixture.debugElement.query(By.css('.toggle'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-up'));
		expect(de).toBeTruthy();

		component.rightToDown = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-up'));
		expect(de).toBeTruthy();

		de = fixture.debugElement.query(By.css('.toggle'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.icon-chevron-right'));
		expect(de).toBeTruthy();
	});
});
