import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiDropdownComponent } from './cui-dropdown.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiDropdownComponent,
	],
	exports: [
		CuiDropdownComponent,
	],
})

export class CuiDropdownModule {}
