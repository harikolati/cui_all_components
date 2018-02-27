import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../auth/profile.service';
export declare class PreferenceService {
    private http;
    private profileService;
    private headers;
    private preferences;
    constructor(http: HttpClient, profileService: ProfileService);
    /**
     * Retrieves preferences for a user in an environment.
     * @returns The user's preferences
     */
    fetch(): Promise<any>;
    /**
     * Updates a user's preferences for an environment
     * @param preferences The user's preferences
     * @returns The updated user preferences
     */
    update(preferences: any): Promise<any>;
}
