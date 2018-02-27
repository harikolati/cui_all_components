import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiChipsComponent } from './cui-chips.component';
import { CuiButtonModule } from '../cui-button/cui-button.module';
import { CuiLabelsModule } from '../cui-labels/cui-labels.module';
import { CuiIconModule } from '../cui-icon/icon-module';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		CuiButtonModule,
		CuiIconModule,
		CuiLabelsModule,
		FormsModule,
	],
	declarations: [CuiChipsComponent],
	exports: [CuiChipsComponent],
})
export class CuiChipsModule { }
