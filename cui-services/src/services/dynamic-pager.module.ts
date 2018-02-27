import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DynamicPagerService } from './dynamic-pager.service';

@NgModule({
	imports: [
		HttpClientModule,
	],
	declarations: [],
	exports: [],
	providers: [
		DynamicPagerService,
	],
})

export class DynamicPagerModule {}
