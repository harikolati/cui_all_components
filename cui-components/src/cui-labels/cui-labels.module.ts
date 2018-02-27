import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiLabelsComponent } from './cui-labels.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [CuiLabelsComponent],
	exports: [CuiLabelsComponent],
})
export class CuiLabelsModule { }
