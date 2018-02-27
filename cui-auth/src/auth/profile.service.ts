import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Guid } from '@cisco-ngx/cui-utils';
import { ProperCasePipe } from '@cisco-ngx/cui-pipes';

import { defaultTo, get, head, parseInt, toLower, toString, set, trim } from 'lodash-es';
const _ = { defaultTo, get, head, parseInt, toLower, toString, set, trim };

@Injectable()
/**
 * Manages profile information within the SWTG environment
 */
export class ProfileService {
	private ciscoWindow: CiscoWindow = window;
	private CISCO = _.defaultTo(this.ciscoWindow['cisco'], {});
	private properCasePipe: ProperCasePipe = new ProperCasePipe();

	constructor(private http: HttpClient) {}

	/**
	 * Manually sets the cicso object
	 */
	set cisco (cisco: any) {
		this.CISCO = cisco;
	}
	/**
	 * Retrieves the cisco object
	 */
	get cisco (): any {
		return this.CISCO;
	}

	/**
	 * Returns the Cisco bearer token
	 * @returns The bearer token
	 */
	public getBearerToken (): string {
		return this.CISCO.bearerToken;
	}

	/**
	 * Returns the environment params for the app
	 * @returns The environment params
	 */
	public getParams (): any {
		return this.CISCO.params;
	}

	/**
	 * Returns information on the logged in user
	 * @returns  The user info
	 */
	public getProfile (): any {
		return this.CISCO.user;
	}

	/**
	 * Returns the role of a single environment
	 * @param env The environment to retrieve a role from
	 * @returns The role or roles
	 */
	public getProfileRole (env: string): any {
		const envStr: string = <string>_.defaultTo(env, _.head(this.getAccount().environments));

		return _.get(this.getProfile(), ['roles', envStr], null);
	}

	/**
	 * Returns the user's authorization level
	 * @returns The authorization level
	 */
	public getProfileLevel (): number {
		return _.parseInt(_.get(this.getCpr(), 'pf_auth_user_level', '0'));
	}

	/**
	 * Returns the user's case management level
	 * @returns The case management level
	 */
	public getProfileCaseFlag (): number {
		return _.parseInt(_.get(this.getCpr(), 'pf_auth_casemanagement', '3'));
	}

	/**
	 * Returns the full name of the user
	 * @param user Optional user object to derive the name from
	 * @returns The user's full name
	 */
	public getProfileFullname (user: any = this.getProfile()): string {
		if (!user) {
			return '';
		}

		const firstname: string = _.get(user,
			'firstName', _.get(user, ['cpr', 'pf_auth_firstname'], ''));
		const lastname: string = _.get(user,
			'lastName', _.get(user, ['cpr', 'pf_auth_lastname'], ''));

		return (firstname.length > 0 && lastname.length > 0) ?
			this.properCasePipe.transform(`${firstname} ${lastname}`) :
			_.get(user, ['cpr', 'pf_auth_uid'], '');
	}

	/**
	 * Returns the user's environment account info
	 * @returns The account info
	 */
	public getAccount (): any {
		return _.get(this.CISCO, 'account', {});
	}

	/**
	 * Returns the users CPR information
	 * @return CPR Info
	 */
	public getCpr (): any {
		return _.get(this.getProfile(), 'cpr', {});
	}

	/**
	 * Generates a Gravatar URL based on a supplied email address
	 * @param email The user's email
	 * @returns The gravatar URL
	 */
	public getGravatarUrl (email: string): string {
		const trimmedEmail = _.toLower(_.trim(email));

		const gravatarHash = _.defaultTo(_.toString(Md5.hashStr(trimmedEmail)), '');

		return `http://www.gravatar.com/avatar/${gravatarHash}.jpg?s=80`;
	}

	/**
	 * Retrieves or generates a session ID object
	 * @returns The session ID
	 */
	public getSessionId (): any {
		let guid = _.get(this.CISCO, ['user', 'sessionId']);

		if (!guid) {
			guid = {
				session: Guid.generate(),
			};
			_.set(this.CISCO, ['user', 'sessionId'], guid);
		}

		return guid;
	}

	/**
	 * Notifies the system that a user's account has been updated
	 * @param updateUrl The url of the account service
	 * @returns  A promise that resolves when the account is updated
	 */
	public accountUpdated (updateUrl: string) {
		return this.http.post(updateUrl, {})
			.toPromise()
			.catch(Promise.reject);
	}

	/**
	 * Updates the personnel record of the user
	 * @param cpr The new record
	 */
	set cpr (obj: any) {
		_.set(this.CISCO, ['user', 'cpr'], obj);
	}

	/**
	 * Updates a cisco user object to have the user's full name
	 * @param update The cisco user object to update
	 * @returns update object
	 */
	public updateProfile (update: any): any {
		update.fullname = this.getProfileFullname(update);

		return update;
	}

	/**
	 * Updates the current cisco user object to have the user's full name
	 */
	public updateProfileFullname () {
		_.set(this.CISCO, ['user', 'fullname'], this.getProfileFullname());
	}

	/**
	 * Replaces the session ID object
	 * @param ids The new ID object
	 */
	public updateSessionId (ids: any) {
		_.set(this.CISCO, ['user', 'sessionId'], ids);
	}

	/**
	 * Updates the account's auto-created status
	 * @param status The new status
	 */
	public updateAccountCreated (status: any) {
		_.set(this.CISCO, ['account', 'autoCreated'], status);
	}
}

export interface CiscoWindow extends Window {
	[key: string]: any; // index signature
}
