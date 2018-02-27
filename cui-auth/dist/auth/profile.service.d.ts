import { HttpClient } from '@angular/common/http';
export declare class ProfileService {
    private http;
    private ciscoWindow;
    private CISCO;
    private properCasePipe;
    constructor(http: HttpClient);
    /**
     * Retrieves the cisco object
     */
    /**
     * Manually sets the cicso object
     */
    cisco: any;
    /**
     * Returns the Cisco bearer token
     * @returns The bearer token
     */
    getBearerToken(): string;
    /**
     * Returns the environment params for the app
     * @returns The environment params
     */
    getParams(): any;
    /**
     * Returns information on the logged in user
     * @returns  The user info
     */
    getProfile(): any;
    /**
     * Returns the role of a single environment
     * @param env The environment to retrieve a role from
     * @returns The role or roles
     */
    getProfileRole(env: string): any;
    /**
     * Returns the user's authorization level
     * @returns The authorization level
     */
    getProfileLevel(): number;
    /**
     * Returns the user's case management level
     * @returns The case management level
     */
    getProfileCaseFlag(): number;
    /**
     * Returns the full name of the user
     * @param user Optional user object to derive the name from
     * @returns The user's full name
     */
    getProfileFullname(user?: any): string;
    /**
     * Returns the user's environment account info
     * @returns The account info
     */
    getAccount(): any;
    /**
     * Returns the users CPR information
     * @return CPR Info
     */
    getCpr(): any;
    /**
     * Generates a Gravatar URL based on a supplied email address
     * @param email The user's email
     * @returns The gravatar URL
     */
    getGravatarUrl(email: string): string;
    /**
     * Retrieves or generates a session ID object
     * @returns The session ID
     */
    getSessionId(): any;
    /**
     * Notifies the system that a user's account has been updated
     * @param updateUrl The url of the account service
     * @returns  A promise that resolves when the account is updated
     */
    accountUpdated(updateUrl: string): Promise<any>;
    /**
     * Updates the personnel record of the user
     * @param cpr The new record
     */
    cpr: any;
    /**
     * Updates a cisco user object to have the user's full name
     * @param update The cisco user object to update
     * @returns update object
     */
    updateProfile(update: any): any;
    /**
     * Updates the current cisco user object to have the user's full name
     */
    updateProfileFullname(): void;
    /**
     * Replaces the session ID object
     * @param ids The new ID object
     */
    updateSessionId(ids: any): void;
    /**
     * Updates the account's auto-created status
     * @param status The new status
     */
    updateAccountCreated(status: any): void;
}
export interface CiscoWindow extends Window {
    [key: string]: any;
}
