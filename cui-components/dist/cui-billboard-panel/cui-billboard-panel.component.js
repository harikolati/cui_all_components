/**
 * CUI DASHBOARD COMPONENT
 * USAGE:
 * <cui-dashboard
 *   [count]="list.length"
 *   link-to="https://optional-link-url/"
 *   panel-styles="indigo hover"
 *   show-billboard="true|false"
 *   title="TitleString"
 *   flipped="true|false"
 * >
 *   ** Your Content HERE **
 * </cui-dashboard>
 */
import { Component, Input, } from '@angular/core';
import { BreakpointsService } from '@cisco-ngx/cui-services';
var CuiBillboardPanelComponent = (function () {
    function CuiBillboardPanelComponent(breakpointService) {
        this.breakpointService = breakpointService;
        this.panelClass = 'panel--indigo';
        this.count = 0;
        this.showBillboard = true;
        this.title = '';
    }
    Object.defineProperty(CuiBillboardPanelComponent.prototype, "setPanelClasses", {
        set: function (panelStyle) {
            this.panelClass = this.panelClasses(panelStyle);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CuiBillboardPanelComponent.prototype, "direction", {
        set: function (flip) {
            this.flipped = flip === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    CuiBillboardPanelComponent.prototype.ngOnInit = function () {
        this.breakPointSubscription = this.getBreakPoint();
        this.billboardClass = this.billboardClasses(this.breakpoint, this.flipped);
    };
    CuiBillboardPanelComponent.prototype.ngOnDestroy = function () {
        this.breakPointSubscription.unsubscribe();
    };
    CuiBillboardPanelComponent.prototype.panelClasses = function (classList) {
        if (classList === void 0) { classList = ''; }
        return classList.split(' ')
            .reduce(function (cur, acc) { return cur + " panel--" + acc; }, '');
    };
    CuiBillboardPanelComponent.prototype.billboardClasses = function (breakpoint, flipped) {
        var direction = flipped ? 'left' : 'right';
        return breakpoint !== 'xs' ?
            "panel--bordered-" + direction + " base-padding-" + direction :
            '';
    };
    CuiBillboardPanelComponent.prototype.getBreakPoint = function () {
        var _this = this;
        return this.breakpointService.changes.subscribe(function (breakpoint) {
            _this.breakpoint = breakpoint.name;
            _this.billboardClass = _this.billboardClasses(breakpoint.name, _this.flipped);
        }, function (err) { return console.log(err); });
    };
    CuiBillboardPanelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-billboard-panel',
                    template: "<div  cui-billboard-panel=\"true\"  class=\"row\" [ngClass]=\"{'flex-row-reverse': flipped}\"> <!--- Billboard --> <div class=\"col-12 col-sm-3\" *ngIf=\"showBillboard\"> <div  [ngClass]=\"billboardClass\"  class=\"base-margin-bottom\"> <div class=\"row no-gutters\"> <div class=\"col-6 col-sm-12\"> <!--- Panel --> <div  class=\"panel text-billboard text-right\"  [ngClass]=\"panelClass\" [innerHTML]=\"count\"></div> </div> <!--- Panel Subtitle --> <div class=\" col-6 col-sm-12 text-billboard-subtitle qtr-margin-top text-center text-left-xs half-padding justify-content-start justify-content-sm-center flex-center-vertical\"> <a *ngIf=\"linkTo\" [href]=\"linkTo\" [innerHTML]=\"title\"></a> <span *ngIf=\"!linkTo\" [innerHTML]=\"title\"></span> </div> </div> </div> </div> <!--- Content --> <div class=\"col-12 col-sm-9\"> <ng-content></ng-content> </div> </div>",
                },] },
    ];
    /** @nocollapse */
    CuiBillboardPanelComponent.ctorParameters = function () { return [
        { type: BreakpointsService, },
    ]; };
    CuiBillboardPanelComponent.propDecorators = {
        "count": [{ type: Input, args: ['count',] },],
        "linkTo": [{ type: Input, args: ['link-to',] },],
        "showBillboard": [{ type: Input, args: ['show-billboard',] },],
        "title": [{ type: Input, args: ['title',] },],
        "setPanelClasses": [{ type: Input, args: ['panel-styles',] },],
        "direction": [{ type: Input, args: ['flipped',] },],
    };
    return CuiBillboardPanelComponent;
}());
export { CuiBillboardPanelComponent };
//# sourceMappingURL=cui-billboard-panel.component.js.map