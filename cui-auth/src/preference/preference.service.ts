import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ProfileService } from '../auth/profile.service';

const serviceUrl = '/ws/preferences/v1/';

@Injectable()
/**
 * Manages user preferences for an environment
 */
export class PreferenceService {
	private headers: HttpHeaders;
	private preferences: any;

	constructor(private http: HttpClient, private profileService: ProfileService) {
		this.headers = new HttpHeaders()
			.append('Authorization', this.profileService.getBearerToken());
	}

	/**
	 * Retrieves preferences for a user in an environment.
	 * @returns The user's preferences
	 */
	public async fetch () {
		if (this.preferences) {
			return this.preferences;
		}

		this.preferences = await this.http.get(serviceUrl, { headers: this.headers })
			.toPromise();

		return this.preferences;
	}

	/**
	 * Updates a user's preferences for an environment
	 * @param preferences The user's preferences
	 * @returns The updated user preferences
	 */
	public async update (preferences: any) {
		await this.http.put(serviceUrl, preferences, { headers: this.headers })
			.toPromise();
		this.preferences = preferences;

		return this.preferences;
	}
}
