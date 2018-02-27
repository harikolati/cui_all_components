import { NgModule } from '@angular/core';
import { PreferenceService } from './preference.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [
		HttpClientModule,
	],
	providers: [
		PreferenceService,
	],
})

export class PreferenceModule {}
