import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CuiFooterComponent } from './cui-footer.component';

describe('CuiFooterComponent', () => {
	let component: CuiFooterComponent;
	let fixture: ComponentFixture<CuiFooterComponent>;
	let de: DebugElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [CuiFooterComponent],
		})
		.compileComponents();
		fixture = TestBed.createComponent(CuiFooterComponent);
		component = fixture.componentInstance;
	}));

	it('should create', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('should have default links', () => {
		fixture.detectChanges();
		expect(component.links.length).toEqual(7);
	});

	it('should show and hide legal', () => {
		component.showLegal = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.footer__legal'));
		expect(de).toBeTruthy();
		component.showLegal = false;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('footer__legal'));
		expect(de).toBeFalsy();
	});

	it('should set padding', () => {
		component.padding = 'compressed';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.footer--compressed'));
		expect(de).toBeTruthy();
	});
});
