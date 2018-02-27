var CuiHeaderOptions = (function () {
    function CuiHeaderOptions(options) {
        /**
             * Whether to show a branding logo in the left of the header
             */
        this.showBrandingLogo = true;
        /**
             * URL to redirect to when the branding logo is clicked
             */
        this.brandingLink = '#';
        /**
             * Optional title to display when hovering over the branding logo
             */
        this.brandingTitle = '';
        /**
             * Whether to show the mobile nav when on mobile
             */
        this.showMobileNav = true;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                if (key === 'primaryNav') {
                    this.createPrimaryNav(options[key]);
                    continue;
                }
                if (key === 'secondaryNav') {
                    this.createSecondaryNav(options[key]);
                    continue;
                }
                if (key === 'mobileNav') {
                    this.createMobileNav(options[key]);
                    continue;
                }
                if (key === 'toolbarButtons') {
                    this.createToolbarButtons(options[key]);
                    continue;
                }
                this[key] = options[key];
            }
        }
    }
    CuiHeaderOptions.prototype.createPrimaryNav = function (navOptions) {
        var primaryNav = [];
        for (var _i = 0, navOptions_1 = navOptions; _i < navOptions_1.length; _i++) {
            var item = navOptions_1[_i];
            primaryNav.push(new CuiPrimaryNavOption(item));
        }
        this.primaryNav = primaryNav;
    };
    CuiHeaderOptions.prototype.createSecondaryNav = function (navOptions) {
        var secondaryNav = [];
        for (var _i = 0, navOptions_2 = navOptions; _i < navOptions_2.length; _i++) {
            var item = navOptions_2[_i];
            secondaryNav.push(new CuiSecondaryNavOption(item));
        }
        this.secondaryNav = secondaryNav;
    };
    CuiHeaderOptions.prototype.createMobileNav = function (navOptions) {
        var mobileNav = [];
        for (var _i = 0, navOptions_3 = navOptions; _i < navOptions_3.length; _i++) {
            var item = navOptions_3[_i];
            mobileNav.push(new CuiPrimaryNavOption(item));
        }
        this.mobileNav = mobileNav;
    };
    CuiHeaderOptions.prototype.createToolbarButtons = function (options) {
        var toolbarButtons = [];
        for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
            var item = options_1[_i];
            toolbarButtons.push(new CuiToolbarButtonOption(item));
        }
        this.toolbarButtons = toolbarButtons;
    };
    return CuiHeaderOptions;
}());
export { CuiHeaderOptions };
var CuiPrimaryNavOption = (function () {
    function CuiPrimaryNavOption(options) {
        this.active = false;
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        if (!this.onClick) {
            this.onClick = function () { };
        }
    }
    return CuiPrimaryNavOption;
}());
export { CuiPrimaryNavOption };
var CuiSecondaryNavOption = (function () {
    function CuiSecondaryNavOption(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        if (!this.onClick) {
            this.onClick = function () { };
        }
    }
    return CuiSecondaryNavOption;
}());
export { CuiSecondaryNavOption };
var CuiToolbarButtonOption = (function () {
    function CuiToolbarButtonOption(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                this[key] = options[key];
            }
        }
        if (!this.onClick) {
            this.onClick = function () { };
        }
    }
    return CuiToolbarButtonOption;
}());
export { CuiToolbarButtonOption };
//# sourceMappingURL=cui-header-options.js.map