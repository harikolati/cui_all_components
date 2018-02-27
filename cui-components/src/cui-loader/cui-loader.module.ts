import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiLoaderComponent } from './cui-loader.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiLoaderComponent,
	],
	exports: [
		CuiLoaderComponent,
	],
})

export class CuiLoaderModule {}
