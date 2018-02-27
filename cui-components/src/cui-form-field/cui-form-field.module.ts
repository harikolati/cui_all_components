import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiFormFieldComponent } from './cui-form-field.component';
import { CuiInputDirective } from './cui-input.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [CuiFormFieldComponent, CuiInputDirective],
	exports: [CuiFormFieldComponent, CuiInputDirective],
})
export class CuiFormFieldModule { }
