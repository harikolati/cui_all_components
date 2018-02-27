import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CuiHeaderOptions } from './cui-header-options';
var CuiHeaderComponent = (function () {
    function CuiHeaderComponent() {
        this.menuToggleClicked = new EventEmitter();
        /**
             * Whether a mobile overflow navigation menu is expanded
             */
        this.overflowExpanded = false;
    }
    CuiHeaderComponent.prototype.ngOnInit = function () {
        if (this.options.primaryNav && !this.options.mobileNav) {
            this.options.mobileNav = this.options.primaryNav;
        }
    };
    /**
     * Returns the proper color class for a toolbar button
     * @param button The button object
     * @returns The button color class string
     */
    /**
         * Returns the proper color class for a toolbar button
         * @param button The button object
         * @returns The button color class string
         */
    CuiHeaderComponent.prototype.getToolbarButtonClass = /**
         * Returns the proper color class for a toolbar button
         * @param button The button object
         * @returns The button color class string
         */
    function (button) {
        if (!button['color']) {
            return '';
        }
        return "btn--" + button['color'];
    };
    /**
     * Toggles the mobile overflow menu open/closed
     */
    /**
         * Toggles the mobile overflow menu open/closed
         */
    CuiHeaderComponent.prototype.toggleOverflow = /**
         * Toggles the mobile overflow menu open/closed
         */
    function () {
        this.overflowExpanded = !this.overflowExpanded;
    };
    CuiHeaderComponent.prototype.getMobileTabsForDisplay = function (overflowTabs) {
        if (!overflowTabs) {
            return this.options.mobileNav.filter(function (item, index) { return item && index < 2; });
        }
        return this.options.mobileNav.filter(function (item, index) { return item && index >= 2; });
    };
    CuiHeaderComponent.prototype.overflowTabIsActive = function () {
        return this.getMobileTabsForDisplay(true)
            .filter(function (item) { return item['active']; }).length > 0;
    };
    CuiHeaderComponent.prototype.onMenuButtonClicked = function (event) {
        this.menuToggleClicked.emit(event);
    };
    CuiHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-header',
                    template: "<div> <header class=\"header\" [ngClass]=\"{'header--tall': options.primaryNav}\"> <div class=\"header-bar container\"> <a class=\"btn btn--small btn--icon toggle-menu\" *ngIf=\"options.menuToggleButton\" (click)=\"onMenuButtonClicked($event)\"> <span class=\"icon-list-menu\"></span> </a> <a class=\"header-bar__logo\" [href]=\"options.brandingLink\" [title]=\"options.brandingTitle\" *ngIf=\"options.showBrandingLogo\"> <span class=\"icon-cisco\" *ngIf=\"!options.brandingImage\"></span> <img *ngIf=\"options.brandingImage\" [alt]=\"options.brandingTitle\" [src]=\"options.brandingImage\" /> </a> <div class=\"header-bar__main\"> <div class=\"header-breadcrumbs\" *ngIf=\"options.breadcrumbs\"> <ul class=\"breadcrumb\"> <li *ngFor=\"let breadcrumb of options.breadcrumbs\"> <a [routerLink]=\"breadcrumb.routerUrl\" *ngIf=\"breadcrumb.routerUrl\">{{breadcrumb.label}}</a> <a [href]=\"breadcrumb.url\" *ngIf=\"breadcrumb.url && !breadcrumb.routerUrl\">{{breadcrumb.label}}</a> <span *ngIf=\"!breadcrumb.url && !breadcrumb.routerUrl\">{{breadcrumb.label}}</span> </li> </ul> </div> <div class=\"header-heading\"> <h1 class=\"page-title\" aria-level=\"1\" [innerHtml]=\"options.title\"></h1> <div class=\"header-utilities\" *ngIf=\"options.secondaryNav\"> <span *ngFor=\"let item of options.secondaryNav\"> <a class=\"link\" [href]=\"item.url\" (click)=\"item.onClick()\" *ngIf=\"item.url\"> <span class=\"icon-{{item.icon}}\"></span> </a> <a class=\"link\" (click)=\"item.onClick()\" *ngIf=\"!item.url\"> <span class=\"icon-{{item.icon}}\"></span> </a> </span> </div> </div> <div class=\"header-menus\" *ngIf=\"options.primaryNav\" [ngClass]=\"{'hidden-xs': options.mobileNav}\"> <ul class=\"nav nav-tabs\"> <li *ngFor=\"let item of options.primaryNav\" class=\"tab\" [routerLinkActive]=\"['active']\" [ngClass]=\"{'active': item.active}\"> <a [href]=\"item.url\" (click)=\"item.onClick()\" *ngIf=\"item.url\"> <div class=\"tab__heading\" [title]=\"item.label\">{{item.label}}</div> </a> <a [routerLink]=\"item.routerUrl\" *ngIf=\"item.routerUrl\"> <div class=\"tab__heading\" [title]=\"item.label\">{{item.label}}</div> </a> <a (click)=\"item.onClick()\" *ngIf=\"!item.url  && !item.routerUrl\"> <div class=\"tab__heading\" [title]=\"item.label\">{{item.label}}</div> </a> </li> </ul> </div> </div> <div class=\"header-toolbar\" *ngIf=\"options.username || options.toolbarButtons\"> <a class=\"avatar\" *ngIf=\"options.username\">{{options.username}}</a> <button *ngFor=\"let button of options.toolbarButtons\" class=\"btn btn--small btn--icon {{getToolbarButtonClass(button)}}\" (click)=\"button.onClick()\"> <span class=\"icon-{{button.icon}}\"></span> <span class=\"btn__subtext\" *ngIf=\"button.subtext\">{{button.subtext}}</span> </button> </div> </div> </header> <div class=\"mobile-nav-tabs mobile-nav--top visible-xs\" *ngIf=\"options.mobileNav && options.showMobileNav\"> <ul class=\"tabs list list--inline qtr-margin-left half-margin-top\"> <li *ngFor=\"let item of getMobileTabsForDisplay()\" [ngClass]=\"{'active': item.active}\"> <a class=\"link\" [href]=\"item.url\" (click)=\"item.onClick()\" *ngIf=\"item.url\">{{item.label}}</a> <a class=\"link\" [routerLink]=\"item.routerUrl\" *ngIf=\"item.routerUrl\">{{item.label}}</a> <a class=\"link\" (click)=\"item.onClick()\" *ngIf=\"!item.url  && !item.routerUrl\">{{item.label}}</a> </li> <li class=\"no-underline\" [ngClass]=\"{'active': overflowTabIsActive()}\" style=\"position: relative\" *ngIf=\"getMobileTabsForDisplay(true).length\"> <a (click)=\"toggleOverflow()\"> <span> <span>More</span> <span class=\"text-xsmall icon-chevron-down qtr-margin-left\"></span> </span> </a> <div class=\"panel mobile-nav-tabs__menu\" *ngIf=\"overflowExpanded\"> <ul class=\"list\"> <li *ngFor=\"let item of getMobileTabsForDisplay(true)\"> <a class=\"link\" [href]=\"item.url\" (click)=\"item.onClick()\" *ngIf=\"item.url\">{{item.label}}</a> <a class=\"link\" [routerLink]=\"item.routerUrl\" *ngIf=\"item.routerUrl\">{{item.label}}</a> <a class=\"link\" (click)=\"item.onClick()\" *ngIf=\"!item.url  && !item.routerUrl\">{{item.label}}</a> </li> </ul> </div> </li> </ul> </div> </div> ",
                    styles: [".mobile-nav, .mobile-nav-tabs { border: 0 none; background: #ffffff; margin: 0; padding: 5px 0; height: 60px; z-index: 102; } .mobile-nav > ul, .mobile-nav-tabs > ul { width: 100%; display: inline-flex; } .mobile-nav > ul > li > a, .mobile-nav-tabs > ul > li > a, .mobile-nav > ul > li, .mobile-nav-tabs > ul > li { display: flex; flex: 1 1 auto; text-align: center; flex-direction: column; font-size: 12px; color: #9e9ea2; } .mobile-nav > ul > li > a:hover, .mobile-nav-tabs > ul > li > a:hover, .mobile-nav > ul > li.active > a, .mobile-nav-tabs > ul > li.active > a, .mobile-nav > ul > li:hover, .mobile-nav-tabs > ul > li:hover, .mobile-nav > ul > li.active, .mobile-nav-tabs > ul > li.active { color: #049fd9; } .mobile-nav span[class^=\"icon-\"], .mobile-nav-tabs span[class^=\"icon-\"] { font-size: 18px; } .mobile-nav__menu, .mobile-nav-tabs__menu { z-index: 102; position: absolute; top: 51px; right: 0; min-width: 150px; padding: 0; border-top: 4px solid #049fd9; border-bottom: 1px solid #dfdfdf; border-left: 1px solid #dfdfdf; border-right: none; } .mobile-nav__menu > ul, .mobile-nav-tabs__menu > ul { text-align: left; } .mobile-nav__menu > ul > li, .mobile-nav-tabs__menu > ul > li { line-height: 2rem; padding-left: 10px; } .mobile-nav__menu > ul > li a, .mobile-nav-tabs__menu > ul > li a { width: 100%; } .mobile-nav__menu > ul > li:active, .mobile-nav-tabs__menu > ul > li:active, .mobile-nav__menu > ul > li:focus, .mobile-nav-tabs__menu > ul > li:focus, .mobile-nav__menu > ul > li:hover, .mobile-nav-tabs__menu > ul > li:hover { cursor: pointer; background-color: #049fd9; } .mobile-nav__menu > ul > li:active a, .mobile-nav-tabs__menu > ul > li:active a, .mobile-nav__menu > ul > li:focus a, .mobile-nav-tabs__menu > ul > li:focus a, .mobile-nav__menu > ul > li:hover a, .mobile-nav-tabs__menu > ul > li:hover a { color: #ffffff; } .mobile-nav--bottom { position: fixed; bottom: 0; left: 0; right: 0; border-top: 1px solid #dfdfdf; } .mobile-nav--bottom .mobile-nav__menu, .mobile-nav--bottom .mobile-nav-tabs__menu { bottom: 51px; top: unset; border-bottom: 4px solid #049fd9; border-top: 1px solid #dfdfdf; } .mobile-nav-tabs { height: 40px; } .mobile-nav-tabs__menu { position: fixed; top: 98px; } "],
                },] },
    ];
    /** @nocollapse */
    CuiHeaderComponent.ctorParameters = function () { return []; };
    CuiHeaderComponent.propDecorators = {
        "options": [{ type: Input },],
        "menuToggleClicked": [{ type: Output },],
    };
    return CuiHeaderComponent;
}());
export { CuiHeaderComponent };
//# sourceMappingURL=cui-header.component.js.map