import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CuiHeaderComponent } from './cui-header.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
	],
	declarations: [
		CuiHeaderComponent,
	],
	exports: [
		CuiHeaderComponent,
	],
})

export class CuiHeaderModule {}
