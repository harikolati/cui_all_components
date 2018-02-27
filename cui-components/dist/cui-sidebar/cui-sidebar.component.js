import { Component, Input } from '@angular/core';
import { CuiSidebarOptions } from './cui-sidebar-options';
var CuiSidebarComponent = (function () {
    function CuiSidebarComponent() {
        /**
             * Options for the display of the sidebar.
             */
        this.options = new CuiSidebarOptions();
        /**
             * Whether the sidebar is visible.
             */
        this.visible = true;
    }
    CuiSidebarComponent.prototype.toggleDrawer = function (item) {
        if (item.subItems && !item.disabled) {
            item.open = !item.open;
        }
    };
    CuiSidebarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-sidebar',
                    template: "<nav class=\"sidebar\" [ngClass]=\"{'sidebar--visible': visible}\"> <div class=\"sidebar__header\" *ngIf=\"options.title || options.toolbarButtons\"> <div class=\"sidebar__header-title\" *ngIf=\"options.title\">{{options.title}}</div> <div class=\"sidebar__header-toolbar\" *ngIf=\"options.toolbarButtons\"> <button class=\"btn btn--icon btn--primary\" *ngFor=\"let button of options.toolbarButtons\" (click)=\"button.onClick(button)\"> <span class=\"{{button.icon}}\"></span> </button> </div> </div> <ul *ngIf=\"options.items\"> <li *ngFor=\"let item of options.items\" [ngClass]=\"{'sidebar__item': item.url || item.onClick, 'sidebar__drawer': item.subItems, 'sidebar__drawer--opened': item.subItems && item.open, 'sidebar__item--selected': item.active, 'disabled': item.disabled}\" (click)=\"toggleDrawer(item)\"> <a *ngIf=\"item.url\" [href]=\"item.url\"> <span *ngIf=\"item.icon\" class=\"{{item.icon}} qtr-margin-right\"></span> <span>{{item.title}}</span> </a> <a *ngIf=\"item.onClick\" (click)=\"item.onClick(item)\"> <span *ngIf=\"item.icon\" class=\"{{item.icon}} qtr-margin-right\"></span> <span>{{item.title}}</span> </a> <a *ngIf=\"item.subItems\"> <span *ngIf=\"item.icon\" class=\"{{item.icon}} qtr-margin-right\"></span> <span>{{item.title}}</span> </a> <ul *ngIf=\"item.subItems\"> <li class=\"sidebar__item\" *ngFor=\"let subItem of item.subItems\" [ngClass]=\"{'sidebar__item--selected': subItem.active, 'disabled': subItem.disabled}\"> <a *ngIf=\"subItem.url\" [href]=\"subItem.url\"> <span *ngIf=\"subItem.icon\" class=\"{{subItem.icon}} qtr-margin-right\"></span> <span>{{subItem.title}}</span> </a> <a *ngIf=\"subItem.onClick\" (click)=\"subItem.onClick(subItem)\"> <span *ngIf=\"subItem.icon\" class=\"{{subItem.icon}} qtr-margin-right\"></span> <span>{{subItem.title}}</span> </a> </li> </ul> </li> </ul> </nav>",
                    styles: [".sidebar { position: relative !important; width: 100% !important; margin-top: 1rem; } @media (min-width: 768px) { .sidebar { position: fixed !important; width: 280px !important; margin-top: 0; left: 0 !important; top: 0; z-index: 1000; -webkit-transform: translateX(-100%) !important; transform: translateX(-100%) !important; transition: transform 150ms linear !important; } .sidebar.sidebar--visible { -webkit-transform: none !important; transform: none !important; transition: transform 150ms linear !important; } } "],
                },] },
    ];
    /** @nocollapse */
    CuiSidebarComponent.ctorParameters = function () { return []; };
    CuiSidebarComponent.propDecorators = {
        "options": [{ type: Input },],
        "visible": [{ type: Input },],
    };
    return CuiSidebarComponent;
}());
export { CuiSidebarComponent };
//# sourceMappingURL=cui-sidebar.component.js.map