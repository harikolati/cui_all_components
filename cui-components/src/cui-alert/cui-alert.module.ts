import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiAlertComponent } from './cui-alert.component';
import { CuiAlertService } from './cui-alert.service';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CuiAlertComponent,
	],
	providers: [
		CuiAlertService,
	],
	exports: [
		CuiAlertComponent,
	],
})

export class CuiAlertModule {}
