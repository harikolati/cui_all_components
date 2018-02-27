import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import {
	CuiHeaderComponent, CuiFooterComponent, CuiSpinnerComponent, CuiAlertComponent,
	CuiToastComponent
} from '@cisco-ngx/cui-components';

@NgModule({
	declarations: [
		AppComponent,
		CuiHeaderComponent,
		CuiFooterComponent,
		CuiSpinnerComponent,
		CuiAlertComponent,
		CuiToastComponent,
	],
	imports: [
		BrowserModule,
		RouterModule,
		HttpClientModule,
		RouterModule.forRoot([]),
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
