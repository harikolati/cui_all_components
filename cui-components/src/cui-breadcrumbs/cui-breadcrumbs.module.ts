import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CuiBreadcrumbsComponent } from './cui-breadcrumbs.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RouterModule,
	],
	declarations: [
		CuiBreadcrumbsComponent,
	],
	exports: [
		CuiBreadcrumbsComponent,
	],
})

export class CuiBreadcrumbsModule {}
