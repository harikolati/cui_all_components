import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ProfileService } from '../auth/profile.service';
import { Token } from './token.model';
import { ClientSSOService } from './client-sso.service';
import { WindowRefService } from './window-ref.service';
import { isNil } from 'lodash-es';

@Injectable()
export class ClientSSOGuard implements CanActivate {
	constructor(
		private clientSSOService: ClientSSOService,
		private profile: ProfileService,
		private windowRef: WindowRefService,
	) {}
	async canActivate (): Promise<boolean> {
		const existingUser = this.profile.getProfile() || this.windowRef.nativeWindow.cisco;
		if (!isNil(existingUser)) {
			return Promise.resolve(true);
		}

		const token: Token = await this.clientSSOService.getAuthToken();
		if (token.authenticated) {
			const user = await this.clientSSOService.getAuthUser();
			if (user) {
				return Promise.resolve(true);
			}
		} else {
			this.windowRef.nativeWindow.location.href = token.loginURL;
		}

		return Promise.resolve(false);
	}
}

