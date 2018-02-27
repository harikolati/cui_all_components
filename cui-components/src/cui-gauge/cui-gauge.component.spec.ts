import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiGaugeComponent } from './cui-gauge.component';
import { CuiGaugeModule } from './cui-gauge.module';

describe('CuiGaugeComponent', () => {
	let component: CuiGaugeComponent;
	let fixture: ComponentFixture<CuiGaugeComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [CuiGaugeModule],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiGaugeComponent);
		component = fixture.componentInstance;

	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create the app', () => {
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it('should display percentage', () => {
		component.percentage = 50;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.gauge__percentage'));
		el = de.nativeElement;
		expect(el.textContent).toContain('50');
	});

	it('should display alternate values', () => {
		component.percentage = 50;
		component.value = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.gauge__percentage'));
		el = de.nativeElement;
		expect(el.textContent).toContain('test');
	});

	it('calls this.animate when animated flag is true', () => {
		component.animated = true;
		spyOn(component, 'animate');
		fixture.detectChanges();
		expect(component.animate).toHaveBeenCalled();
	});

	it('should display a label', () => {
		component.label = 'label';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.gauge__label'));
		el = de.nativeElement;
		expect(el.textContent).toContain('label');
	});

	it('should be sizable', () => {
		component.size = 'small';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.gauge--small'));
		expect(de).toBeTruthy();

		component.size = 'large';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.gauge--large'));
		expect(de).toBeTruthy();
	});

	it('should display the alt background', () => {
		component.alt = 1;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.gauge--alt'));
		expect(de).toBeTruthy();
	});

	it('should set percentage to 0', () => {
		component.percentage = 30;
		component.animate();
		fixture.detectChanges();
		expect(component.percentage).toBe(0);
	});

	it('should set colorClass to gauge--test', () => {
		component.color = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.gauge--test'));
		expect(de).toBeTruthy();
	});

});
