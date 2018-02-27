import { Injectable, Pipe, NgModule } from '@angular/core';
import { get, isEmpty, isNil, reduce } from 'lodash-es';
const _ = { get, isEmpty, isNil, reduce };

interface I18nDictionary {
	[key: string]: string;
}

interface LocationNavigator extends Navigator {
	[key: string]: any;
}

const dictionary: I18nDictionary = {};

@Pipe({
	name: 'i18n',
})
export class I18nPipe {
	transform (value: string, ...args: any[]): string {
		const entry = _.get(dictionary, value, '');
		if (!_.isEmpty(entry)) {
			return _.reduce(args, (memo: any, variable: any, i: number) =>
				memo.replace(new RegExp(`\\{${i}\\}`, 'g'), variable), entry);
		}

		return '';
	}
}

@Injectable()
export class I18nService {
	public language = 'en_us';

	public getPreferredLanguage () {
		const possibleLanguageLocations: string[] = [
			'languages',
			'language',
			'browserLanguage',
			'userLanguage',
			'systemLanguage',
		];
		for (const location of possibleLanguageLocations) {
			const navigator: LocationNavigator = window.navigator;

			if (navigator[location]) {

				if (Array.isArray(navigator[location])) {
					return navigator[location][0].toLowerCase();
				}

				return navigator[location].toLowerCase();
			}
		}

		return 'en-us';
	}

	public injectDictionary (dictionaries: any, forceLocale?: string) {
		const locale = (!_.isNil(forceLocale)) ? forceLocale : this.getPreferredLanguage();
		// always load the english locale into memory first
		// there's no telling what keys might exist or not
		// in the other locales, or what locales might not
		// even exist
		if (locale !== 'en-us') {
			for (const key in dictionaries['en-us']) {
				if (dictionaries[locale].hasOwnProperty(key)) {
					dictionary[key] = dictionaries[locale][key];
				}
			}
		}
		for (const key in dictionaries[locale]) {
			if (dictionaries[locale].hasOwnProperty(key)) {
				dictionary[key] = dictionaries[locale][key];
			}
		}
	}
}

@NgModule({
	declarations: [I18nPipe],
	exports: [I18nPipe],
	providers: [I18nService, I18nPipe],
})

export class I18nPipeModule {}
