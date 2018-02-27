import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CuiIconRegistry } from './icon-registry';
import { iconNames } from './icon-names';
var CuiIconRegistryService = (function () {
    function CuiIconRegistryService(iconRegistry, sanitizer) {
        for (var _i = 0, iconNames_1 = iconNames; _i < iconNames_1.length; _i++) {
            var icon = iconNames_1[_i];
            iconRegistry.addSvgIcon("icon-" + icon, sanitizer.bypassSecurityTrustResourceUrl("assets/" + icon + ".svg"));
        }
    }
    CuiIconRegistryService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    CuiIconRegistryService.ctorParameters = function () { return [
        { type: CuiIconRegistry, },
        { type: DomSanitizer, },
    ]; };
    return CuiIconRegistryService;
}());
export { CuiIconRegistryService };
//# sourceMappingURL=cui-icon-registry.service.js.map