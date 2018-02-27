import { Component, Input, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { assignIn, cloneDeep, findIndex, get, has, head, isFunction, keys, last, pickBy, set, sortBy, } from 'lodash-es';
var CuiDetailPagerComponent = (function () {
    function CuiDetailPagerComponent(router, location) {
        this.router = router;
        this.location = location;
        this.options = {};
        this.pages = {};
        this.views = [];
        this.view = {};
        this.status = {
            currIdx: 0,
            lastPage: false,
            page: 0,
            pages: 0,
        };
    }
    CuiDetailPagerComponent.prototype.handleKeyboardEvent = function (event) {
        if (this.options.keyEvents) {
            if (event.key === 'ArrowRight' || event.keyCode === 39) {
                this.nextView();
            }
            else if (event.key === 'ArrowLeft' || event.keyCode === 37) {
                this.previousView();
            }
        }
    };
    CuiDetailPagerComponent.prototype.hoverPrev = function () {
        if (this.options.showNavigation && this.options.hoverPrev) {
            if (this.status.currIdx === 0 && this.status.page !== 0) {
                if (has(this.pages, (this.status.page - 1))) {
                    return this.options.hoverPrev(last(this.pages[this.status.page - 1]));
                }
                return this.options.hoverPrev({});
            }
            return this.options.hoverPrev(this.views[this.status.currIdx - 1]);
        }
        return '';
    };
    CuiDetailPagerComponent.prototype.hoverNext = function () {
        if (this.options.showNavigation && this.options.hoverNext) {
            if (this.status.currIdx === (this.views.length - 1) && !this.status.lastPage) {
                if (has(this.pages, (this.status.page + 1))) {
                    return this.options.hoverNext(head(this.pages[this.status.page + 1]));
                }
                return this.options.hoverNext({});
            }
            return this.options.hoverNext(this.views[this.status.currIdx + 1]);
        }
        return '';
    };
    CuiDetailPagerComponent.prototype.previousView = function () {
        if (this.status.currIdx === 0 && this.status.page === 0) {
            return;
        }
        if (!this.options.isLoading) {
            this.options.isLoading = true;
            this.status.currIdx -= 1;
            if (this.status.currIdx === -1) {
                this.status.page -= 1;
                this.options.params.page -= 1;
                this.fetchData({ last: true });
            }
            else {
                this.loadView();
            }
        }
    };
    CuiDetailPagerComponent.prototype.nextView = function () {
        if (this.status.currIdx === (this.views.length - 1) && this.status.lastPage) {
            return;
        }
        if (!this.options.isLoading) {
            this.options.isLoading = true;
            this.status.currIdx += 1;
            if (this.status.currIdx === this.views.length) {
                this.status.page += 1;
                this.options.params.page += 1;
                this.fetchData();
            }
            else {
                this.loadView();
            }
        }
    };
    CuiDetailPagerComponent.prototype.loadView = function () {
        this.view = this.views[this.status.currIdx];
        this.options.onData(this.view);
        if (this.options.editHref) {
            this.location.go(this.router.createUrlTree(["" + this.options.href + get(this.view, this.options.id)], { queryParams: pickBy(cloneDeep(this.options.params), 
                /* tslint:disable-next-line:no-unused */
                /* tslint:disable-next-line:no-unused */
                function (v, k) { return k !== 'page'; }) }).toString());
        }
        this.options.isLoading = false;
    };
    CuiDetailPagerComponent.prototype.fetchPage = function () {
        var _this = this;
        if (isFunction(this.options.page)) {
            return this.options.page(this.options.params, this.options.initial)
                .toPromise()
                .then(function (data) {
                set(_this.options, ['params', 'page'], get(data, 'page', 0));
                set(_this.status, 'page', _this.options.params.page);
            });
        }
        return Promise.resolve()
            .then(function () {
            var page = get(_this.options, ['params', 'page'], 0);
            set(_this.status, 'page', page);
            set(_this.options, ['params', 'page'], page);
        });
    };
    CuiDetailPagerComponent.prototype.fetchData = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        var page = get(this.status, 'page', 0);
        if (get(this.pages, page, []).length > 0) {
            this.views = this.pages[page];
            this.loadData(opt);
        }
        else {
            this.options.read(this.options.params)
                .subscribe(function (data) {
                var _keys = sortBy(keys(_this.pages));
                if (_keys.length + 1 > _this.options.pageLimit) {
                    if (opt.last) {
                        delete _this.pages[last(_keys)];
                    }
                    else {
                        delete _this.pages[head(_keys)];
                    }
                }
                _this.pages[page] = data[_this.options.var];
                _this.views = _this.pages[page];
                set(_this.status, 'pages', get(data, 'totalPages', 0));
                _this.loadData(opt);
            });
        }
    };
    CuiDetailPagerComponent.prototype.loadData = function (opt) {
        var _this = this;
        if (opt === void 0) { opt = {}; }
        this.status.length = this.views.length;
        this.status.lastPage = ((this.status.page + 1) === this.status.pages);
        if (opt.initial) {
            this.status.currIdx = findIndex(this.views, function (o) {
                return get(o, _this.options.id) === _this.options.initial;
            });
        }
        else if (opt.last) {
            this.status.currIdx = this.views.length - 1;
        }
        else {
            this.status.currIdx = 0;
        }
        if (this.status.currIdx === -1) {
            this.status.currIdx = 0;
        }
        this.loadView();
    };
    CuiDetailPagerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.options = assignIn(this.options, {
            showNavigation: true,
            pageLimit: 0,
            editHref: false,
            keyEvents: true,
            getHoverNext: function () {
                return _this.hoverNext();
            },
            getHoverPrev: function () {
                return _this.hoverPrev();
            },
            nextView: function () {
                _this.nextView();
            },
            previousView: function () {
                _this.previousView();
            },
        });
        this.fetchPage()
            .then(function () {
            _this.fetchData({ initial: true });
        });
    };
    CuiDetailPagerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-detail-pager',
                    template: "",
                },] },
    ];
    /** @nocollapse */
    CuiDetailPagerComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: Location, },
    ]; };
    CuiDetailPagerComponent.propDecorators = {
        "options": [{ type: Input },],
        "handleKeyboardEvent": [{ type: HostListener, args: ['document:keydown', ['$event'],] },],
    };
    return CuiDetailPagerComponent;
}());
export { CuiDetailPagerComponent };
//# sourceMappingURL=cui-detail-pager.component.js.map