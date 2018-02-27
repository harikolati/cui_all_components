import { Component, Input } from '@angular/core';
var CuiFooterComponent = (function () {
    function CuiFooterComponent() {
        /**
             * Whether to show the legal disclaimer in the footer.
             */
        this.showLegal = true;
        /**
             * Padding of the footer (regular, compressed, loose)
             */
        this.padding = '';
        if (!this.links) {
            this.links = CuiFooterComponent.defaultLinks;
        }
    }
    /**
         * Default links to be added to the footer.
         */
    CuiFooterComponent.defaultLinks = [
        {
            url: 'http://www.cisco.com/cisco/web/siteassets/contacts/index.html',
            label: 'Contacts',
        },
        {
            url: 'https://secure.opinionlab.com/ccc01/o.asp?id=jBjOhqOJ',
            label: 'Feedback',
        },
        {
            url: 'http://www.cisco.com/c/en/us/about/sitemap.html',
            label: 'Site Map',
        },
        {
            url: 'http://www.cisco.com/web/siteassets/legal/terms_condition.html',
            label: 'Terms & Conditions',
        },
        {
            url: 'http://www.cisco.com/web/siteassets/legal/privacy_full.html',
            label: 'Privacy Statement',
        },
        {
            url: 'http://www.cisco.com/web/siteassets/legal/privacy_full.html#cookies',
            label: 'Cookie Policy',
        },
        {
            url: 'http://www.cisco.com/web/siteassets/legal/trademark.html',
            label: 'Trademarks',
        },
    ];
    CuiFooterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-footer',
                    template: "<footer class=\"footer footer--new\" [ngClass]=\"{'footer--basic': !showLegal, 'footer--compressed': padding === 'compressed', 'footer--loose': padding === 'loose'}\"> <div class=\"footer__links\"> <ul class=\"list\"> <li *ngFor=\"let link of links\"> <a [href]=\"link['url']\" target=\"_blank\">{{link['label']}}</a> </li> </ul> </div> <div class=\"footer__legal\" *ngIf=\"showLegal\"> <div class=\"footer__logo\"> <a href=\"http://www.cisco.com\" target=\"_blank\"> <span class=\"icon-cisco\"></span> </a> </div> <div class=\"footer__copyright\"> <div>Copyright &copy; 2017 Cisco Systems Inc.</div> <div>All rights reserved.</div> </div> </div> </footer>",
                },] },
    ];
    /** @nocollapse */
    CuiFooterComponent.ctorParameters = function () { return []; };
    CuiFooterComponent.propDecorators = {
        "links": [{ type: Input },],
        "showLegal": [{ type: Input },],
        "padding": [{ type: Input },],
    };
    return CuiFooterComponent;
}());
export { CuiFooterComponent };
//# sourceMappingURL=cui-footer.component.js.map