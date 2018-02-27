import { ClientSSOGuard } from './client-sso.guard';
import { ClientSSOResolver } from './client-sso.resolver';
import { ClientSSOService } from './client-sso.service';
import { ClientSSOInterceptor } from './client-sso.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ProfileService } from '../auth/profile.service';
import { WindowRefService } from './window-ref.service';

@NgModule({
	imports: [
		HttpClientModule,
	],
	providers: [
		ClientSSOGuard,
		ClientSSOResolver,
		ClientSSOService,
		ProfileService,
		WindowRefService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ClientSSOInterceptor,
			multi: true,
		},
	],
})
export class ClientSSOModule {}
