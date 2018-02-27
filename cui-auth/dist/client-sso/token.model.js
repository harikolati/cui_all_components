/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { get as _get } from 'lodash-es';
var Token = (function () {
    function Token(data) {
        this.authenticated = data.loggedIn || false;
        this.loginURL = data.loginUrl;
        this.logoutURL = data.logoutUrl;
        this.tokenString = _get(data, 'token');
        this.type = data.type;
        this.expires = data.expires * 1000;
    }
    return Token;
}());
export { Token };
function Token_tsickle_Closure_declarations() {
    /** @type {?} */
    Token.prototype.authenticated;
    /** @type {?} */
    Token.prototype.loginURL;
    /** @type {?} */
    Token.prototype.logoutURL;
    /** @type {?} */
    Token.prototype.tokenString;
    /** @type {?} */
    Token.prototype.type;
    /** @type {?} */
    Token.prototype.expires;
}
//# sourceMappingURL=token.model.js.map