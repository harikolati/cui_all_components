import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiGaugeComponent } from './cui-gauge.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiGaugeComponent,
	],
	exports: [
		CuiGaugeComponent,
	],
})

export class CuiGaugeModule {}
