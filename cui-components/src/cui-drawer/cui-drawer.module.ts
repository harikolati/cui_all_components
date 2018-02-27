import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiDrawerComponent } from './cui-drawer.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CuiDrawerComponent,
	],
	exports: [
		CuiDrawerComponent,
	],
})

export class CuiDrawerModule {}
