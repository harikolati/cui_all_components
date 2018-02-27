import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CuiInputComponent } from './cui-input.component';
import { CuiInputOptions } from './cui-input-options';

describe('CuiInputComponent', () => {
	let component: CuiInputComponent;
	let fixture: ComponentFixture<CuiInputComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule],
			declarations: [CuiInputComponent],
		})
		.compileComponents();
		fixture = TestBed.createComponent(CuiInputComponent);
		component = fixture.componentInstance;
	}));

	it('should create', () => {
		fixture.detectChanges();
		expect(component).toBeTruthy();
	});

	it('should have a label', () => {
		component.label = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('label'));
		el = de.nativeElement;
		expect(el.innerHTML).toEqual('test');
	});

	it('should handle being required', () => {
		component.options = new CuiInputOptions({ required: true });
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.required-block'));
		expect(de).toBeTruthy();
		de = fixture.debugElement.query(By.css('input[required]'));
		expect(de).toBeTruthy();
	});

	it('should handle helper text', () => {
		component.options = new CuiInputOptions({ helperText: 'test' });
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.help-block'));
		expect(de).toBeTruthy();
		el = de.nativeElement;
		expect(el.innerHTML.indexOf('test')).toBeGreaterThan(-1);
	});

	it('should handle switches', () => {
		component.type = 'switch';
		component.label = 'test';
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('.switch__label'));
		el = de.nativeElement;
		expect(el.innerHTML).toEqual('test');
	});

	it('should handle checkboxes', () => {
		component.type = 'checkbox';
		component.items = [{ name: 'Test', value: 1 }];
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('input'));
		el = de.nativeElement;
		el.click();
		fixture.detectChanges();
		expect(component.model).toEqual([1]);
	});
});
