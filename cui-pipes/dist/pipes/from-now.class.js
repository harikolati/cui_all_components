/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FromNow = (function () {
    function FromNow(changeDetectorRef, ngZone) {
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    FromNow.prototype.generate = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this.removeTimer();
        var /** @type {?} */ d = new Date(value);
        var /** @type {?} */ now = new Date();
        var /** @type {?} */ seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
        var /** @type {?} */ timeToUpdate = this.getSecondsUntilUpdate(seconds) * 1000;
        if (this.ngZone && this.changeDetectorRef) {
            this.timer = this.ngZone.runOutsideAngular(function () {
                if (typeof window !== 'undefined') {
                    return window.setTimeout(function () {
                        _this.ngZone.run(function () { return _this.changeDetectorRef.markForCheck(); });
                    }, timeToUpdate);
                }
                return null;
            });
        }
        var /** @type {?} */ minutes = Math.round(Math.abs(seconds / 60));
        var /** @type {?} */ hours = Math.round(Math.abs(minutes / 60));
        var /** @type {?} */ days = Math.round(Math.abs(hours / 24));
        var /** @type {?} */ months = Math.round(Math.abs(days / 30.416));
        var /** @type {?} */ years = Math.round(Math.abs(days / 365));
        if (!value || isNaN(d.valueOf())) {
            return 'never';
        }
        if (seconds <= 45) {
            return 'a few seconds ago';
        }
        if (seconds <= 90) {
            return 'a minute ago';
        }
        if (minutes <= 45) {
            return minutes + " minutes ago";
        }
        if (minutes <= 90) {
            return 'an hour ago';
        }
        if (hours <= 22) {
            return hours + " hours ago";
        }
        if (hours <= 36) {
            return 'a day ago';
        }
        if (days <= 25) {
            return days + " days ago";
        }
        if (days <= 45) {
            return 'a month ago';
        }
        if (days <= 345) {
            return months + " months ago";
        }
        if (days <= 545) {
            return 'a year ago';
        }
        // (days > 545)
        return years + " years ago";
    };
    /**
     * @return {?}
     */
    FromNow.prototype.removeTimer = /**
     * @return {?}
     */
    function () {
        if (this.timer) {
            window.clearTimeout(this.timer);
            this.timer = null;
        }
    };
    /**
     * @param {?} seconds
     * @return {?}
     */
    FromNow.prototype.getSecondsUntilUpdate = /**
     * @param {?} seconds
     * @return {?}
     */
    function (seconds) {
        var /** @type {?} */ min = 60;
        var /** @type {?} */ hr = min * 60;
        var /** @type {?} */ day = hr * 24;
        if (seconds < min) {
            // less than 1 min, update ever 2 secs
            return 2;
        }
        if (seconds < hr) {
            // less than an hour, update every 30 secs
            return 30;
        }
        if (seconds < day) {
            // less then a day, update every 5 mins
            return 300;
        }
        return 3600;
    };
    return FromNow;
}());
export { FromNow };
function FromNow_tsickle_Closure_declarations() {
    /** @type {?} */
    FromNow.prototype.timer;
    /** @type {?} */
    FromNow.prototype.changeDetectorRef;
    /** @type {?} */
    FromNow.prototype.ngZone;
}
//# sourceMappingURL=from-now.class.js.map