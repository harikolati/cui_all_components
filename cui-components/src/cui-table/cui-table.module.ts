import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiTableComponent } from './cui-table.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiTableComponent,
	],
	exports: [
		CuiTableComponent,
	],
})

export class CuiTableModule {}
