import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileDropModule } from 'ng-file-drop';
import { CuiAlertModule } from '../cui-alert/cui-alert.module';
import { CuiDropzoneComponent } from './cui-dropzone.component';
import { FileSizePipeModule, I18nPipeModule, I18nService } from '@cisco-ngx/cui-pipes';
import { dictionary } from '../i18n';
var CuiDropzoneModule = (function () {
    function CuiDropzoneModule(i18n) {
        this.i18n = i18n;
        i18n.injectDictionary(dictionary);
    }
    CuiDropzoneModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        I18nPipeModule,
                        FileDropModule,
                        FileSizePipeModule,
                        CuiAlertModule,
                    ],
                    declarations: [
                        CuiDropzoneComponent,
                    ],
                    exports: [
                        CuiDropzoneComponent,
                    ],
                },] },
    ];
    /** @nocollapse */
    CuiDropzoneModule.ctorParameters = function () { return [
        { type: I18nService, },
    ]; };
    return CuiDropzoneModule;
}());
export { CuiDropzoneModule };
//# sourceMappingURL=cui-dropzone.module.js.map