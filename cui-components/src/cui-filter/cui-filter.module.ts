import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiFilterComponent } from './cui-filter.component';
import { CuiSelectModule } from '../cui-select/cui-select.module';
import { CuiLabelsModule } from '../cui-labels/cui-labels.module';
import { CuiLoaderModule } from '../cui-loader/cui-loader.module';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		CuiSelectModule,
		CuiLabelsModule,
		CuiLoaderModule,
	],
	declarations: [
		CuiFilterComponent,
	],
	exports: [
		CuiFilterComponent,
	],
})

export class CuiFilterModule {}
