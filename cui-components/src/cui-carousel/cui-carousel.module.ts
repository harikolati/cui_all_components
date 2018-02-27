import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuiCarouselComponent } from './cui-carousel.component';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		CuiCarouselComponent,
	],
	exports: [
		CuiCarouselComponent,
	],
})

export class CuiCarouselModule {}
