import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WindowRefService } from './window-ref.service';
import { ProfileService } from '../auth/profile.service';
import { AuthUser } from './auth-user.model';
import { Token } from './token.model';
import { get as _get, isNil } from 'lodash-es';

@Injectable()
export class ClientSSOService {
	public authenticated = false;
	public bearerToken: string;
	public tokenLoaded = false;
	public tokenUrl: string;
	public userLoaded = false;
	public user: AuthUser = new AuthUser({});
	private loginUrl: string;
	private logoutUrl: string;
	private token: Token;

	constructor (
		private profile: ProfileService,
		private windowRef: WindowRefService,
		private http: HttpClient,
		@Optional() @Inject('ENVIRONMENT') private env: any,
	) {}

	public async getAuthToken (force?: boolean): Promise<any> {
		if (isNil(_get(this, 'env.auth.tokenUrl'))) {
			return Promise.reject('No auth.tokenUrl in ENVIRONMENT');
		}
		this.tokenUrl = this.env.auth.tokenUrl;
		if (_get(this, 'token') && !force) {
			return this.token;
		}
		const result = await <any>this.http.get(
			this.env.auth.tokenUrl, { withCredentials: true }).toPromise();
		this.token = new Token(result);
		this.tokenLoaded = true;
		this.authenticated = this.token.authenticated;
		this.bearerToken = this.token.tokenString;
		this.loginUrl = this.token.loginURL;
		this.logoutUrl = this.token.logoutURL;
		this.profile.cisco = { bearerToken: this.bearerToken };
		this.windowRef.nativeWindow.cisco = { bearerToken: this.bearerToken };
		const interval = setInterval(() => {
			this.loginUrl = '';
			clearInterval(interval);
		}, this.token.expires);

		return this.token;
	}

	public async getAuthUser (): Promise<any> {
		if (isNil(_get(this, 'env.auth.accountUrl'))) {
			return Promise.reject('No auth.accountUrl in ENVIRONMENT');
		}
		const result =  await <any>this.http.get(
			this.env.auth.accountUrl, { withCredentials: true }).toPromise();
		this.user = new AuthUser(result);
		this.profile.cisco.user = _get(result, 'user');
		this.profile.cisco.account = _get(result, 'account');
		this.windowRef.nativeWindow.cisco.user = _get(result, 'user');
		this.windowRef.nativeWindow.cisco.account = _get(result, 'account');
		this.userLoaded = true;

		return this.user;
	}
}

