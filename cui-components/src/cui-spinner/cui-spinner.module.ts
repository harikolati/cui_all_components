import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiSpinnerComponent } from './cui-spinner.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CuiSpinnerComponent,
	],
	exports: [
		CuiSpinnerComponent,
	],
})

export class CuiSpinnerModule {}
