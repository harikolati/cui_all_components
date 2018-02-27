import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { RouterTestingModule } from '@angular/router/testing';

import { CuiFilterComponent } from './cui-filter.component';
import { CuiFilterOptions } from './cui-filter-options';
import { CuiFilterModule } from './cui-filter.module';

class MockActivatedRoute extends ActivatedRoute {
	public queryParams = Observable.of({ sport: 'baseball' });
}

describe('CuiFilterComponent', () => {
	let component: CuiFilterComponent;
	let fixture: ComponentFixture<CuiFilterComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	const filters: any[] = [
		{
			label: 'Sport',
			value: 'sport',
			items: [
				{
					label: 'Baseball',
					value: 'baseball',
				},
				{
					label: 'Basketball',
					value: 'basketball',
				},
				{
					label: 'Cricket',
					value: 'cricket',
				},
				{
					label: 'Football',
					value: 'football',
				},
				{
					label: 'Golf',
					value: 'golf',
				},
			],
		},
		{
			label: 'Network',
			value: 'network',
			items: [
				{
					label: 'ESPN',
					value: 'espn',
				},
				{
					label: 'Fox Sports',
					value: 'foxSports',
				},
				{
					label: 'Golf Channel',
					value: 'golfChannel',
				},
			],
		},
	];
	const activatedRoute = new MockActivatedRoute();

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule, CuiFilterModule],
			providers: [{ provide: ActivatedRoute, useValue: activatedRoute }],
		})
		.compileComponents();
		fixture = TestBed.createComponent(CuiFilterComponent);
		component = fixture.componentInstance;
		component.options = new CuiFilterOptions({ filters, rightToDown: false });
	}));

	it('should create', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('should have filters', () => {
		fixture.detectChanges();
		expect(component.options.filters.length).toEqual(2);
	});

	it('should have filter items', () => {
		fixture.detectChanges();
		expect(component.options.filters[0].items.length).toEqual(5);
	});

	it('should toggle filters off', () => {
		component.options.updateParams = true;
		fixture.detectChanges();
		expect(component.selectedFilters.sport).toEqual(['baseball']);

		de = fixture.debugElement.query(By.css('.checkbox'));
		el = de.nativeElement;
		el.click();

		fixture.detectChanges();
		expect(component.selectedFilters.sport).toBeUndefined();
	});

	it('should toggle filters on', () => {
		fixture.detectChanges();
		expect(component.selectedFilters.sport).toEqual(['baseball']);

		de = fixture.debugElement.query(By.css('.checkbox__label[title="Basketball"]'));
		el = de.nativeElement;
		el.click();

		fixture.detectChanges();
		expect(component.selectedFilters.sport).toEqual(['baseball', 'basketball']);
	});

	it('should clear filters', () => {
		fixture.detectChanges();
		expect(component.selectedFilters.sport).toEqual(['baseball']);

		component.clearFilters(component.options.filters[0]);
		expect(component.selectedFilters.sport).toBeUndefined();
	});

	it('should clear filters', () => {
		fixture.detectChanges();
		expect(component.selectedFilters.sport).toEqual(['baseball']);

		component.clearAllFilters();
		expect(component.selectedFilters.sport).toBeUndefined();
	});

	it('should toggle groups', () => {
		fixture.detectChanges();
		expect(component.options.filters[0].open).toEqual(true);

		component.options.filters[0].toggleOpen();
		expect(component.options.filters[0].open).toEqual(false);
	});

	it('should set a group\'s open state', () => {
		fixture.detectChanges();
		expect(component.options.filters[0].open).toEqual(true);

		component.options.filters[0].setOpen(false);
		expect(component.options.filters[0].open).toEqual(false);
	});
});
