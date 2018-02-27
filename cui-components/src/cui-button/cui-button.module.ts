import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiButtonComponent } from './cui-button.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [CuiButtonComponent],
	exports: [CuiButtonComponent],
})
export class CuiButtonModule { }
