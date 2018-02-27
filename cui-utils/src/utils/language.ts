/**
 * Utility for retrieving a device's preferred language.
 */
export class Language {
	/**
	 * Retrieves the user's preferred language.
	 * @return The preferred language.
	 */
	static getPreferred (): string {
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
					return navigator[location][0];
				}

				return navigator[location];
			}
		}

		return 'en_us';
	}
}

export interface LocationNavigator extends Navigator {
	[key: string]: any; // index signature
}
