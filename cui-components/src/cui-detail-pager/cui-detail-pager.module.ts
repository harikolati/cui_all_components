import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiDetailPagerComponent } from './cui-detail-pager.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CuiDetailPagerComponent,
	],
	exports: [
		CuiDetailPagerComponent,
	],
})

export class CuiDetailPagerModule {}
