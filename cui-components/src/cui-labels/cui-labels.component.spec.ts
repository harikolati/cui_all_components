import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuiLabelsComponent } from './cui-labels.component';
import { DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CuiLabelsComponent', () => {
	let component: CuiLabelsComponent;
	let fixture: ComponentFixture<CuiLabelsComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CuiLabelsComponent],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiLabelsComponent);
		component = fixture.componentInstance;
		component.size = 'small';
		component.color = 'danger';
		component.data = [
			{ label: 'One', value: 'one' },
			{ label: 'Two', value: 'two' },
			{ label: 'Three', value: 'three' },
			{ label: 'Four', value: 'four' },
		];
		component.labelKey = 'label';
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should remove a label', done => {
		expect(fixture.componentInstance.data.length).toEqual(4);
		de = fixture.debugElement.query(By.css('span:first-child .icon-close'));
		el = de.nativeElement;
		el.click();
		expect(fixture.componentInstance.data.length).toEqual(3);
		done();
	});

	it('should change color', () => {
		component.color = 'warning';
		component.ngOnChanges({
			color: new SimpleChange(null, component.color, true),
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('span:first-child'));
		el = de.nativeElement;

		expect(el.classList.contains('label--warning')).toBe(true);
	});

	it('should change raised and bordered', () => {
		component.raised = true;
		component.bordered = true;
		component.ngOnChanges({
			raised: new SimpleChange(null, component.raised, true),
			bordered: new SimpleChange(null, component.bordered, true),
		});
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('span:first-child'));
		el = de.nativeElement;

		expect(el.classList.contains('label--raised')).toBe(true);
		expect(el.classList.contains('label--bordered')).toBe(true);
	});
});
