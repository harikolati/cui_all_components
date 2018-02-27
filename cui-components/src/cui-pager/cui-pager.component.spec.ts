import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiPagerComponent } from './cui-pager.component';

describe('CuiPagerComponent', () => {
	let component: CuiPagerComponent;
	let fixture: ComponentFixture<CuiPagerComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CuiPagerComponent],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiPagerComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display buttons', () => {
		component.page = 0;
		component.limit = 10;
		component.totalItems = 100;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.icon-step-backward'));
		expect(de).toBeTruthy();
		de = fixture.debugElement.query(By.css('.icon-step-prev'));
		expect(de).toBeTruthy();
		de = fixture.debugElement.query(By.css('.icon-step-next'));
		expect(de).toBeTruthy();
		de = fixture.debugElement.query(By.css('.icon-step-forward'));
		expect(de).toBeTruthy();
	});

	it('should display page details', () => {
		component.page = 0;
		component.limit = 10;
		component.totalItems = 100;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('span.text-muted'));
		el = de.nativeElement;
		expect(el.textContent).toContain('1-10 of 100');
	});

	it('should move forward a page', () => {
		component.page = 0;
		component.limit = 10;
		component.totalItems = 100;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.icon-step-next'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.page).toEqual(1);
	});

	it('should move backward a page', () => {
		component.page = 1;
		component.limit = 10;
		component.totalItems = 100;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.icon-step-prev'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.page).toEqual(0);
	});

	it('should move to the last page', () => {
		component.page = 0;
		component.limit = 10;
		component.totalItems = 100;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.icon-step-forward'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.page).toEqual(9);
	});

	it('should move to the first page', () => {
		component.page = 9;
		component.limit = 10;
		component.totalItems = 100;
		fixture.detectChanges();

		de = fixture.debugElement.query(By.css('.icon-step-backward'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.page).toEqual(0);
	});
});
