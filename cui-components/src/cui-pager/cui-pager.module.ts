import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiPagerComponent } from './cui-pager.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiPagerComponent,
	],
	exports: [
		CuiPagerComponent,
	],
})

export class CuiPagerModule {}
