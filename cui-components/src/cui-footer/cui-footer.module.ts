import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiFooterComponent } from './cui-footer.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiFooterComponent,
	],
	exports: [
		CuiFooterComponent,
	],
})

export class CuiFooterModule {}
