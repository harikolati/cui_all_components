import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuiDrawerModule } from '../cui-drawer/cui-drawer.module';
import { CuiDrawersComponent } from './cui-drawers.component';

@NgModule({
	imports: [
		CommonModule,
		CuiDrawerModule,
	],
	declarations: [
		CuiDrawersComponent,
	],
	exports: [
		CuiDrawersComponent,
	],
})

export class CuiDrawersModule {}
