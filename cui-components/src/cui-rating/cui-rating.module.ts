import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiRatingComponent } from './cui-rating.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiRatingComponent,
	],
	exports: [
		CuiRatingComponent,
	],
})

export class CuiRatingModule {}
