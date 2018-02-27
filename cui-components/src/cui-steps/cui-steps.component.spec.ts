import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiStepsComponent } from './cui-steps.component';

describe('CuiStepsComponent', () => {
	let component: CuiStepsComponent;
	let fixture: ComponentFixture<CuiStepsComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	const steps: any[] = [
		{
			number: 1,
			label: 'Visited',
			visited: true,
		},
		{
			number: 2,
			label: 'Active',
			active: true,
		},
		{
			number: 3,
			label: 'Next',
		},
		{
			number: 4,
			label: 'Green',
			class: 'step__icon--success',
		},
	];

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CuiStepsComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(CuiStepsComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display steps', () => {
		component.steps = steps;
		fixture.detectChanges();
		const deArray: DebugElement[] = fixture.debugElement.queryAll(By.css('.ui-step'));
		expect(deArray.length).toEqual(4);
	});

	it('should display numbers on steps', () => {
		component.steps = steps;
		fixture.detectChanges();
		const deArray: DebugElement[] = fixture.debugElement.queryAll(By.css('.step__icon'));

		el = deArray[0].nativeElement;
		expect(el.textContent).toContain('1');

		el = deArray[1].nativeElement;
		expect(el.textContent).toContain('2');
	});

	it('should display labels on steps', () => {
		component.steps = steps;
		fixture.detectChanges();
		const deArray: DebugElement[] = fixture.debugElement.queryAll(By.css('.step__label'));

		el = deArray[0].nativeElement;
		expect(el.textContent).toContain('Visited');

		el = deArray[1].nativeElement;
		expect(el.textContent).toContain('Active');
	});

	it('should style steps', () => {
		component.steps = steps;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.step__icon--success'));
		expect(de).toBeTruthy();
	});

	it('should display small steps', () => {
		component.steps = steps;
		component.small = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.step__icon--small'));
		expect(de).toBeTruthy();
	});

	it('should display vertical steps', () => {
		component.steps = steps;
		component.vertical = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.ui-steps--vertical'));
		expect(de).toBeTruthy();
	});
});
