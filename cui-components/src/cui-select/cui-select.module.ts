import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiSelectComponent } from './cui-select.component';
import { CuiSelectPaginatorDirective } from './cui-select-paginator.directive';
import { CuiSelectKeyControlDirective } from './cui-select-key-control.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiSelectComponent,
		CuiSelectKeyControlDirective,
		CuiSelectPaginatorDirective,
	],
	exports: [
		CuiSelectComponent,
	],
})

export class CuiSelectModule {}
