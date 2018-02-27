import { get as _get } from 'lodash-es';

export class Token {
	authenticated: boolean;
	loginURL: string;
	logoutURL: string;
	tokenString: string;
	type: string;
	expires: number;
	constructor (data: any) {
		this.authenticated = data.loggedIn || false;
		this.loginURL = data.loginUrl;
		this.logoutURL = data.logoutUrl;
		this.tokenString = _get(data, 'token');
		this.type = data.type;
		this.expires = data.expires * 1000;
	}
}
