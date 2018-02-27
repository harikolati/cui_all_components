import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiToastComponent } from './cui-toast.component';
import { CuiToasterComponent, CuiToasterService } from './cui-toaster.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CuiToastComponent,
		CuiToasterComponent,
	],
	exports: [
		CuiToastComponent,
		CuiToasterComponent,
	],
	providers: [
		CuiToasterService,
	],
})

export class CuiToastModule {}
