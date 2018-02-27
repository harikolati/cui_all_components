import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuiFormFieldComponent } from './cui-form-field.component';
import { DebugElement, Component, ViewChild, SimpleChange } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CuiInputDirective } from './cui-input.directive';
import { By } from '@angular/platform-browser';

@Component({
	selector: 'test',
	template: `
	<form [formGroup]="testForm">
	<cui-form-field>
	<input cuiInput [(ngModel)]="model" [required]="required" formControlName="name">
	</cui-form-field>
	</form>
	`,
})
class TestComponent {
	@ViewChild(CuiInputDirective) input: CuiInputDirective;
	testForm: FormGroup;
	model = '';
	required = false;

	constructor (fb: FormBuilder) {
		this.testForm = fb.group({ name: [''] });
	}
}

describe('CuiFormFieldComponent', () => {
	let component: TestComponent;
	let fixture: ComponentFixture<TestComponent>;
	let de: DebugElement;
	let el: HTMLElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [CommonModule, FormsModule, ReactiveFormsModule],
			declarations: [CuiFormFieldComponent, CuiInputDirective, TestComponent],
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TestComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should change required', () => {
		component.required = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('[cuiInput]'));
		de.componentInstance.input.ngOnChanges({
			required: new SimpleChange(null, component.required, true),
		});
		de.componentInstance.input.focusChanged();
		de.componentInstance.input.onInput();
		el = de.nativeElement;
		expect((<any>el).required).toBeTruthy();
	});

	it('should have error', () => {
		component.required = true;
		fixture.detectChanges();
		de = fixture.debugElement.query(By.css('[cuiInput]'));
		de.componentInstance.input.ngOnChanges({
			required: new SimpleChange(null, component.required, true),
		});
		el = de.nativeElement;
		expect((<any>el).required).toBeTruthy();
		component.model = 'test';
		fixture.detectChanges();
		de.componentInstance.input.ngOnChanges({
			ngModel: new SimpleChange(null, component.model, true),
		});
		el = de.nativeElement;
		expect((<any>el).value).toBe('test');
	});
});
