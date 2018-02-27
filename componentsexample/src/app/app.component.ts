import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { I18n, Language } from '@cisco-ngx/cui-utils';
import { CuiHeaderOptions, CuiToastComponent } from '@cisco-ngx/cui-components';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [
		HttpClient,
	],
})
export class AppComponent {
	i18n: any = I18n;
	i18nReady = false;
	alert: any = {};
	headerOptions: CuiHeaderOptions = new CuiHeaderOptions({});

	@ViewChild(CuiToastComponent)
	toast: CuiToastComponent;

	constructor(private http: HttpClient) {
		this.prepareApp();
	}

	/**
	 * Retrieves the localization dictionary from assets and adds it to the I18n utility.
	 */
	async getI18n() {
		try {
			I18n.injectDictionary(await this.http.get(`assets/i18n/${Language.getPreferred()}.json`)
				.toPromise() as any[]);
			this.i18nReady = true;
		} catch (err) {
			I18n.injectDictionary(await this.http.get('assets/i18n/en-US.json')
				.toPromise() as any[]);
			this.i18nReady = true;
		}
	}

	/**
	 * Prepares the app for display.
	 */
	async prepareApp() {
		await this.getI18n();
		this.headerOptions = new CuiHeaderOptions({
			title: I18n.get('_Title_'),
			toolbarButtons: [{
				icon: 'feedback'
			}, {
				icon: 'sign-out'
			}],
			primaryNav: [{
				label: I18n.get('_Home_'),
				active: true,
			}],
		});
	}

	/**
	 * Shows an alert
	 */
	showAlert() {
		this.alert.show(I18n.get('_AlertText_'), 'success');
	}

	/**
	 * Pops a toast
	 */
	popToast() {
		this.toast.addToast('success', I18n.get('_ToastTitle_'), I18n.get('_ToastMessage_'));
	}
}
