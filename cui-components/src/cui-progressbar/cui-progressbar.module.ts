import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiProgressbarComponent } from './cui-progressbar.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiProgressbarComponent,
	],
	exports: [
		CuiProgressbarComponent,
	],
})

export class CuiProgressbarModule {}
