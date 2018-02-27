/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { get as _get } from 'lodash-es';
var AuthUser = (function () {
    function AuthUser(data) {
        this.firstName = _get(data, 'user.cpr.pf_auth_firstname', '');
        this.lastName = _get(data, 'user.cpr.pf_auth_lastname', '');
        this.accessLevel = _get(data, 'user.cpr.pf_auth_user_level', 0);
        this.email = _get(data, 'user.cpr.pf_auth_email');
        this.displayName = this.firstName + " " + this.lastName;
        this.roles = _get(data, 'user.roles');
        this.anonymous = !_get(data, 'user.cpr.pf_auth_user_level');
        this.employee = (_get(data, 'user.cpr.pf_auth_user_level') === 4);
    }
    return AuthUser;
}());
export { AuthUser };
function AuthUser_tsickle_Closure_declarations() {
    /** @type {?} */
    AuthUser.prototype.accessLevel;
    /** @type {?} */
    AuthUser.prototype.anonymous;
    /** @type {?} */
    AuthUser.prototype.displayName;
    /** @type {?} */
    AuthUser.prototype.email;
    /** @type {?} */
    AuthUser.prototype.employee;
    /** @type {?} */
    AuthUser.prototype.firstName;
    /** @type {?} */
    AuthUser.prototype.lastName;
    /** @type {?} */
    AuthUser.prototype.roles;
}
//# sourceMappingURL=auth-user.model.js.map