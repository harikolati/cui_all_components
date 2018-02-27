/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Service for alerting when the bootstrap breakpoint changes
 */
import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/distinctUntilChanged";
/**
 * @record
 */
export function WindowSize() { }
function WindowSize_tsickle_Closure_declarations() {
    /** @type {?} */
    WindowSize.prototype.width;
    /** @type {?} */
    WindowSize.prototype.height;
}
/**
 * @record
 */
export function Breakpoint() { }
function Breakpoint_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    Breakpoint.prototype.min;
    /** @type {?|undefined} */
    Breakpoint.prototype.max;
}
/**
 * @record
 */
export function BreakpointEvent() { }
function BreakpointEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    BreakpointEvent.prototype.name;
    /** @type {?} */
    BreakpointEvent.prototype.breakpoint;
    /** @type {?} */
    BreakpointEvent.prototype.size;
}
/**
 * @record
 */
export function BreakpointConfig() { }
function BreakpointConfig_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [name: string]: Breakpoint;
    */
}
// Breakpoints come from Bootstrap Grid definitions
// https://v4-alpha.getbootstrap.com/layout/overview/
var /** @type {?} */ defaultBreakpoints = {
    xs: { max: 576 },
    sm: { min: 576, max: 992 },
    md: { min: 768, max: 992 },
    lg: { min: 992, max: 1200 },
    xl: { min: 1200 },
};
var /** @type {?} */ FALLBACK_BREAKPOINT = {
    min: 0, max: Number.MAX_SAFE_INTEGER,
};
var BreakpointsService = (function () {
    function BreakpointsService(ngZone) {
        this.ngZone = ngZone;
        this.lastBreakpoint = null;
        this.breakpoints = defaultBreakpoints;
        this.setBreakpoints(this.breakpoints);
        this.resize = Observable.fromEvent(window, 'resize')
            .map(this.getWindowSize).distinctUntilChanged();
        var /** @type {?} */ initialBreakpoint = this.getBreakpoint(window.innerWidth);
        this.changesSubject =
            new BehaviorSubject(this.getBreakpointEvent(initialBreakpoint));
        this.changes = this.changesSubject.distinctUntilChanged(function (x, y) { return x.name === y.name; });
        this.subscribe();
    }
    /**
     * @return {?}
     */
    BreakpointsService.prototype.unsubscribe = /**
     * @return {?}
     */
    function () {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    };
    /**
     * @return {?}
     */
    BreakpointsService.prototype.subscribe = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.subscription) {
            return;
        }
        // Make sure resize event doesn't trigger change
        // detection by running outside of angular zone
        this.ngZone.runOutsideAngular(function () {
            _this.subscription = _this.resize.subscribe(function (size) {
                var /** @type {?} */ breakpoint = _this.getBreakpoint(size.width);
                if (breakpoint === _this.lastBreakpoint) {
                    return;
                }
                _this.lastBreakpoint = breakpoint;
                // Emitting back in angular zone
                // Emitting back in angular zone
                _this.ngZone.run(function () {
                    _this.changesSubject.next(_this.getBreakpointEvent(breakpoint));
                });
            });
        });
    };
    /**
     * @param {?=} breakpoints
     * @return {?}
     */
    BreakpointsService.prototype.setBreakpoints = /**
     * @param {?=} breakpoints
     * @return {?}
     */
    function (breakpoints) {
        if (breakpoints) {
            this.breakpoints = breakpoints;
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    BreakpointsService.prototype.getBreakpointEvent = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        if (!name) {
            return { name: 'default', breakpoint: FALLBACK_BREAKPOINT, size: this.getWindowSize() };
        }
        return { name: name, breakpoint: this.breakpoints[name], size: this.getWindowSize() };
    };
    /**
     * @return {?}
     */
    BreakpointsService.prototype.getWindowSize = /**
     * @return {?}
     */
    function () {
        return { width: window.innerWidth, height: window.innerHeight };
    };
    /**
     * @param {?} currentSize
     * @return {?}
     */
    BreakpointsService.prototype.getBreakpoint = /**
     * @param {?} currentSize
     * @return {?}
     */
    function (currentSize) {
        var /** @type {?} */ keys = Object.keys(this.breakpoints);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var /** @type {?} */ value = this.breakpoints[key];
            var /** @type {?} */ min = value.min || 0;
            var /** @type {?} */ max = value.max || Number.MAX_SAFE_INTEGER;
            if (currentSize >= min && currentSize < max) {
                return key;
            }
        }
        return null;
    };
    BreakpointsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BreakpointsService.ctorParameters = function () { return [
        { type: NgZone, },
    ]; };
    return BreakpointsService;
}());
export { BreakpointsService };
function BreakpointsService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    BreakpointsService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    BreakpointsService.ctorParameters;
    /** @type {?} */
    BreakpointsService.prototype.lastBreakpoint;
    /** @type {?} */
    BreakpointsService.prototype.breakpoints;
    /** @type {?} */
    BreakpointsService.prototype.changesSubject;
    /** @type {?} */
    BreakpointsService.prototype.subscription;
    /** @type {?} */
    BreakpointsService.prototype.changes;
    /** @type {?} */
    BreakpointsService.prototype.resize;
    /** @type {?} */
    BreakpointsService.prototype.ngZone;
}
//# sourceMappingURL=breakpoints.service.js.map