import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileDropModule } from 'ng-file-drop';

import { CuiAlertModule } from '../cui-alert/cui-alert.module';
import { CuiDropzoneComponent } from './cui-dropzone.component';
import { FileSizePipeModule, I18nPipeModule, I18nService } from '@cisco-ngx/cui-pipes';
import { dictionary } from '../i18n';

@NgModule({
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
})

export class CuiDropzoneModule {
	constructor(private i18n: I18nService) {
		i18n.injectDictionary(dictionary);
	}
}
