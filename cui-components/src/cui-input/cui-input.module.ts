import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiInputComponent } from './cui-input.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiInputComponent,
	],
	exports: [
		CuiInputComponent,
	],
})

export class CuiInputModule {}
