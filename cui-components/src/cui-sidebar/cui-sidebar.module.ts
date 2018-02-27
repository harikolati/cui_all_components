import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuiSidebarComponent } from './cui-sidebar.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
	],
	declarations: [
		CuiSidebarComponent,
	],
	exports: [
		CuiSidebarComponent,
	],
})

export class CuiSidebarModule {}
