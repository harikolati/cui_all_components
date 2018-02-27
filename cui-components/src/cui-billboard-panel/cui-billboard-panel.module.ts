import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiBillboardPanelComponent } from './cui-billboard-panel.component';
import { BreakpointsService } from '@cisco-ngx/cui-services';

@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [CuiBillboardPanelComponent],
	exports: [CuiBillboardPanelComponent],
	providers: [BreakpointsService],
})

export class CuiBillboardPanelModule { }
