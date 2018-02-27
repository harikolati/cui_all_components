import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CuiTreeComponent } from './cui-tree.component';
import { CuiTreePipe } from './cui-tree.pipe';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
	],
	declarations: [
		CuiTreeComponent,
		CuiTreePipe,
	],
	exports: [
		CuiTreeComponent,
	],
})

export class CuiTreeModule {}
