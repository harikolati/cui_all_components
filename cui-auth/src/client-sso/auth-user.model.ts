import { get as _get } from 'lodash-es';

export class AuthUser {
	accessLevel: number;
	anonymous: boolean;
	displayName: string;
	email: string;
	employee: boolean;
	firstName: string;
	lastName: string;
	roles: any;
	constructor (data: any) {
		this.firstName = _get(data, 'user.cpr.pf_auth_firstname', '');
		this.lastName = _get(data, 'user.cpr.pf_auth_lastname', '');
		this.accessLevel = _get(data, 'user.cpr.pf_auth_user_level', 0);
		this.email = _get(data, 'user.cpr.pf_auth_email');
		this.displayName = `${this.firstName} ${this.lastName}`;
		this.roles = _get(data, 'user.roles');
		this.anonymous = !_get(data, 'user.cpr.pf_auth_user_level');
		this.employee = (_get(data, 'user.cpr.pf_auth_user_level') === 4);
	}
}

