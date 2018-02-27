/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Md5 } from 'ts-md5/dist/md5';
import { Guid } from '@cisco-ngx/cui-utils';
import { ProperCasePipe } from '@cisco-ngx/cui-pipes';
import { defaultTo, get, head, parseInt, toLower, toString, set, trim } from 'lodash-es';
var /** @type {?} */ _ = { defaultTo: defaultTo, get: get, head: head, parseInt: parseInt, toLower: toLower, toString: toString, set: set, trim: trim };
var ProfileService = (function () {
    function ProfileService(http) {
        this.http = http;
        this.ciscoWindow = window;
        this.CISCO = _.defaultTo(this.ciscoWindow['cisco'], {});
        this.properCasePipe = new ProperCasePipe();
    }
    Object.defineProperty(ProfileService.prototype, "cisco", {
        /**
         * Retrieves the cisco object
         */
        get: /**
         * Retrieves the cisco object
         * @return {?}
         */
        function () {
            return this.CISCO;
        },
        /**
         * Manually sets the cicso object
         */
        set: /**
         * Manually sets the cicso object
         * @param {?} cisco
         * @return {?}
         */
        function (cisco) {
            this.CISCO = cisco;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the Cisco bearer token
     * @return {?} The bearer token
     */
    ProfileService.prototype.getBearerToken = /**
     * Returns the Cisco bearer token
     * @return {?} The bearer token
     */
    function () {
        return this.CISCO.bearerToken;
    };
    /**
     * Returns the environment params for the app
     * @return {?} The environment params
     */
    ProfileService.prototype.getParams = /**
     * Returns the environment params for the app
     * @return {?} The environment params
     */
    function () {
        return this.CISCO.params;
    };
    /**
     * Returns information on the logged in user
     * @return {?} The user info
     */
    ProfileService.prototype.getProfile = /**
     * Returns information on the logged in user
     * @return {?} The user info
     */
    function () {
        return this.CISCO.user;
    };
    /**
     * Returns the role of a single environment
     * @param {?} env The environment to retrieve a role from
     * @return {?} The role or roles
     */
    ProfileService.prototype.getProfileRole = /**
     * Returns the role of a single environment
     * @param {?} env The environment to retrieve a role from
     * @return {?} The role or roles
     */
    function (env) {
        var /** @type {?} */ envStr = /** @type {?} */ (_.defaultTo(env, _.head(this.getAccount().environments)));
        return _.get(this.getProfile(), ['roles', envStr], null);
    };
    /**
     * Returns the user's authorization level
     * @return {?} The authorization level
     */
    ProfileService.prototype.getProfileLevel = /**
     * Returns the user's authorization level
     * @return {?} The authorization level
     */
    function () {
        return _.parseInt(_.get(this.getCpr(), 'pf_auth_user_level', '0'));
    };
    /**
     * Returns the user's case management level
     * @return {?} The case management level
     */
    ProfileService.prototype.getProfileCaseFlag = /**
     * Returns the user's case management level
     * @return {?} The case management level
     */
    function () {
        return _.parseInt(_.get(this.getCpr(), 'pf_auth_casemanagement', '3'));
    };
    /**
     * Returns the full name of the user
     * @param {?=} user Optional user object to derive the name from
     * @return {?} The user's full name
     */
    ProfileService.prototype.getProfileFullname = /**
     * Returns the full name of the user
     * @param {?=} user Optional user object to derive the name from
     * @return {?} The user's full name
     */
    function (user) {
        if (user === void 0) { user = this.getProfile(); }
        if (!user) {
            return '';
        }
        var /** @type {?} */ firstname = _.get(user, 'firstName', _.get(user, ['cpr', 'pf_auth_firstname'], ''));
        var /** @type {?} */ lastname = _.get(user, 'lastName', _.get(user, ['cpr', 'pf_auth_lastname'], ''));
        return (firstname.length > 0 && lastname.length > 0) ?
            this.properCasePipe.transform(firstname + " " + lastname) :
            _.get(user, ['cpr', 'pf_auth_uid'], '');
    };
    /**
     * Returns the user's environment account info
     * @return {?} The account info
     */
    ProfileService.prototype.getAccount = /**
     * Returns the user's environment account info
     * @return {?} The account info
     */
    function () {
        return _.get(this.CISCO, 'account', {});
    };
    /**
     * Returns the users CPR information
     * @return {?} CPR Info
     */
    ProfileService.prototype.getCpr = /**
     * Returns the users CPR information
     * @return {?} CPR Info
     */
    function () {
        return _.get(this.getProfile(), 'cpr', {});
    };
    /**
     * Generates a Gravatar URL based on a supplied email address
     * @param {?} email The user's email
     * @return {?} The gravatar URL
     */
    ProfileService.prototype.getGravatarUrl = /**
     * Generates a Gravatar URL based on a supplied email address
     * @param {?} email The user's email
     * @return {?} The gravatar URL
     */
    function (email) {
        var /** @type {?} */ trimmedEmail = _.toLower(_.trim(email));
        var /** @type {?} */ gravatarHash = _.defaultTo(_.toString(Md5.hashStr(trimmedEmail)), '');
        return "http://www.gravatar.com/avatar/" + gravatarHash + ".jpg?s=80";
    };
    /**
     * Retrieves or generates a session ID object
     * @return {?} The session ID
     */
    ProfileService.prototype.getSessionId = /**
     * Retrieves or generates a session ID object
     * @return {?} The session ID
     */
    function () {
        var /** @type {?} */ guid = _.get(this.CISCO, ['user', 'sessionId']);
        if (!guid) {
            guid = {
                session: Guid.generate(),
            };
            _.set(this.CISCO, ['user', 'sessionId'], guid);
        }
        return guid;
    };
    /**
     * Notifies the system that a user's account has been updated
     * @param {?} updateUrl The url of the account service
     * @return {?} A promise that resolves when the account is updated
     */
    ProfileService.prototype.accountUpdated = /**
     * Notifies the system that a user's account has been updated
     * @param {?} updateUrl The url of the account service
     * @return {?} A promise that resolves when the account is updated
     */
    function (updateUrl) {
        return this.http.post(updateUrl, {})
            .toPromise()
            .catch(Promise.reject);
    };
    Object.defineProperty(ProfileService.prototype, "cpr", {
        /**
         * Updates the personnel record of the user
         * @param cpr The new record
         */
        set: /**
         * Updates the personnel record of the user
         * @param {?} obj
         * @return {?}
         */
        function (obj) {
            _.set(this.CISCO, ['user', 'cpr'], obj);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Updates a cisco user object to have the user's full name
     * @param {?} update The cisco user object to update
     * @return {?} update object
     */
    ProfileService.prototype.updateProfile = /**
     * Updates a cisco user object to have the user's full name
     * @param {?} update The cisco user object to update
     * @return {?} update object
     */
    function (update) {
        update.fullname = this.getProfileFullname(update);
        return update;
    };
    /**
     * Updates the current cisco user object to have the user's full name
     * @return {?}
     */
    ProfileService.prototype.updateProfileFullname = /**
     * Updates the current cisco user object to have the user's full name
     * @return {?}
     */
    function () {
        _.set(this.CISCO, ['user', 'fullname'], this.getProfileFullname());
    };
    /**
     * Replaces the session ID object
     * @param {?} ids The new ID object
     * @return {?}
     */
    ProfileService.prototype.updateSessionId = /**
     * Replaces the session ID object
     * @param {?} ids The new ID object
     * @return {?}
     */
    function (ids) {
        _.set(this.CISCO, ['user', 'sessionId'], ids);
    };
    /**
     * Updates the account's auto-created status
     * @param {?} status The new status
     * @return {?}
     */
    ProfileService.prototype.updateAccountCreated = /**
     * Updates the account's auto-created status
     * @param {?} status The new status
     * @return {?}
     */
    function (status) {
        _.set(this.CISCO, ['account', 'autoCreated'], status);
    };
    ProfileService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ProfileService.ctorParameters = function () { return [
        { type: HttpClient, },
    ]; };
    return ProfileService;
}());
export { ProfileService };
function ProfileService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ProfileService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ProfileService.ctorParameters;
    /** @type {?} */
    ProfileService.prototype.ciscoWindow;
    /** @type {?} */
    ProfileService.prototype.CISCO;
    /** @type {?} */
    ProfileService.prototype.properCasePipe;
    /** @type {?} */
    ProfileService.prototype.http;
}
/**
 * @record
 */
export function CiscoWindow() { }
function CiscoWindow_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [key: string]: any;
    */
}
//# sourceMappingURL=profile.service.js.map