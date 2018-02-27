import { NgModule } from '@angular/core';
import { ProfileService } from './profile.service';
import { HttpClientModule } from '@angular/common/http';
import { ProperCasePipeModule } from '@cisco-ngx/cui-pipes';

@NgModule({
	imports: [
		HttpClientModule,
		ProperCasePipeModule,
	],
	providers: [
		ProfileService,
	],
})

export class ProfileModule {}
