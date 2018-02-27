import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CuiRatingComponent } from './cui-rating.component';

describe('CuiRatingComponent', () => {
	let component: CuiRatingComponent;
	let fixture: ComponentFixture<CuiRatingComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [CuiRatingComponent],
		})
		.compileComponents();

		fixture = TestBed.createComponent(CuiRatingComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('have five loading stars', () => {
		const deArray: DebugElement[] = fixture.debugElement.queryAll(By.css('.rating__star'));
		expect(deArray.length).toEqual(5);
	});

	it('should display the correct number of active stars', () => {
		component.rating = 3;
		fixture.detectChanges();
		const deArray: DebugElement[] =
			fixture.debugElement.queryAll(By.css('.rating__star.active'));
		expect(deArray.length).toEqual(3);
	});

	it('should change the rating manually', () => {
		component.rating = 3;
		fixture.detectChanges();
		component.setRating(1);
		expect(component.rating).toEqual(1);
	});
});
