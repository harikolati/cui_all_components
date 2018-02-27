import { Injectable } from '@angular/core';
import { AuthUser } from './auth-user.model';
import { Token } from './token.model';
import { Router, Resolve } from '@angular/router';
import { ProfileService } from '../auth/profile.service';
import { WindowRefService } from './window-ref.service';
import { ClientSSOService } from './client-sso.service';

@Injectable()
export class ClientSSOResolver implements Resolve<AuthUser> {
	constructor(
		private clientSSOService: ClientSSOService,
		private profile: ProfileService,
		private router: Router,
		private windowRef: WindowRefService,
	) {}

	async resolve (): Promise<AuthUser> {
		if (this.profile.getProfile() || this.windowRef.nativeWindow.cisco) {
			return Promise.resolve(null);
		}

		const token: Token = await this.clientSSOService.getAuthToken();
		if (token.authenticated) {
			const user = await this.clientSSOService.getAuthUser();
			if (user) {
				return Promise.resolve(user);
			}
		} else {
			this.windowRef.nativeWindow.location.href = token.loginURL;
		}

		return Promise.resolve(null);
	}
}
