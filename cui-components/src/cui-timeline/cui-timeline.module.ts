import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuiTimelineComponent } from './cui-timeline.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiTimelineComponent,
	],
	exports: [
		CuiTimelineComponent,
	],
})

export class CuiTimelineModule {}
