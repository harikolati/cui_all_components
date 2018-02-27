import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiStepsComponent } from './cui-steps.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CuiStepsComponent,
	],
	exports: [
		CuiStepsComponent,
	],
})

export class CuiStepsModule {}
