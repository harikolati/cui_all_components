import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Guid } from '@cisco-ngx/cui-utils';
import { invoke } from 'lodash-es';
import 'rxjs/add/operator/debounceTime';
var CuiSearchComponent = (function () {
    function CuiSearchComponent(activatedRoute) {
        this.activatedRoute = activatedRoute;
        /**
             * Optional placeholder text for the input
             */
        this.placeholder = '';
        /**
             * The text entered into the input
             */
        this.searchText = '';
        /**
             * Debounce time in milliseconds
             */
        this.debounce = 300;
        /**
             * Event emitted when search text is changed
             */
        this.onUpdate = new EventEmitter();
        this.searchTextChanged = new Subject();
        this.guid = Guid.generate();
    }
    CuiSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.querySubscribe = this.activatedRoute.queryParams.subscribe(function (params) {
            _this.setSearchFromQuery(params);
        });
        this.searchTextChanged
            .debounceTime(this.debounce)
            .subscribe(function (model) {
            _this.searchText = model;
            _this.onUpdate.emit(_this.searchText);
        });
    };
    CuiSearchComponent.prototype.ngOnDestroy = function () {
        invoke(this, 'querySubscribe.unsubscribe');
    };
    CuiSearchComponent.prototype.setSearchFromQuery = function (params) {
        if (params.search) {
            this.searchText = params.search;
        }
    };
    /**
     * Clears text in the input
     */
    /**
         * Clears text in the input
         */
    CuiSearchComponent.prototype.clearSearchText = /**
         * Clears text in the input
         */
    function () {
        this.searchText = '';
        this.onUpdate.emit(this.searchText);
    };
    CuiSearchComponent.prototype.onSearchTextChange = function (text) {
        this.searchTextChanged.next(text);
    };
    CuiSearchComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-search',
                    template: "<div class=\"form-group\"> <div class=\"form-group__text smart-search\"> <button class=\"link\" *ngIf=\"searchText.length\" (click)=\"clearSearchText()\"> <span class=\"icon-close\"></span> </button> <input id=\"search{{guid}}\" type=\"search\" [placeholder]=\"placeholder\" [ngModel]=\"searchText\" (ngModelChange)=\"onSearchTextChange($event)\"> <label for=\"search{{guid}}\"> <span class=\"icon-search\"></span> </label> </div> </div> ",
                    styles: [".smart-search input::-ms-clear, .smart-search input::-ms-reveal { display: none; } .smart-search input::-webkit-search-decoration, .smart-search input::-webkit-search-cancel-button, .smart-search input::-webkit-search-results-button, .smart-search input::-webkit-search-results-decoration { display: none; } "],
                },] },
    ];
    /** @nocollapse */
    CuiSearchComponent.ctorParameters = function () { return [
        { type: ActivatedRoute, },
    ]; };
    CuiSearchComponent.propDecorators = {
        "placeholder": [{ type: Input },],
        "searchText": [{ type: Input },],
        "debounce": [{ type: Input },],
        "onUpdate": [{ type: Output },],
    };
    return CuiSearchComponent;
}());
export { CuiSearchComponent };
//# sourceMappingURL=cui-search.component.js.map