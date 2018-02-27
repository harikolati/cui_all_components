/* tslint:disable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuiSpinnerComponent } from './cui-spinner.component';

describe('MicroSoftwaredownloadsComponent', () => {
	let component: CuiSpinnerComponent;
	let fixture: ComponentFixture<CuiSpinnerComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CuiSpinnerComponent]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CuiSpinnerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should be created', () => {
		expect(component).toBeTruthy();
	});
});
