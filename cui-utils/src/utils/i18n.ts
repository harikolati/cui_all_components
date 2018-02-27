import { Language } from './language';
import { find } from 'lodash-es';

export class I18nDictionaryItem {
	constructor(public key: string, public value: string) {}
}

/**
 * Utility for setting and retrieving internationalized strings
 */
export class I18n {
	/**
	 * The currently set language
	 */
	public static language = Language.getPreferred();

	private static dictionary: I18nDictionaryItem[] = [];

	/**
	 * Returns the current dictionary
	 * @returns The dictionary
	 */
	public static getDictionary (): I18nDictionaryItem[] {
		return this.dictionary;
	}

	/**
	 * Retrieves an internationalized string
	 * @param key    The key of the dictionary item to retrieve
	 * @param values Optional values to inject into the result (item must have {x} binding).
	 *   Send an array of values for multiple bindings.
	 * @returns The internationalized string
	 */
	public static get (key: string, values: any = null): string {
		const item: I18nDictionaryItem = find(this.dictionary, (itm: any) => itm.key === key);
		if (!item) {
			return '';
		}

		if (values === null) {
			return item.value;
		}

		if (Array.isArray(values)) {
			let result = item.value.toString();
			for (let i = 0; i < values.length; i += 1) {
				result = result.split(`{${i}}`).join(values[i].toString());
			}

			return result;
		}
		if (typeof values === 'object') {
			return item.value.replace(/\{0\}/, JSON.stringify(values));
		}

		return item.value.replace(/\{0\}/, values);
	}

	/**
	 * Appends and replaces items in the current dictionary
	 * @param newDictionary Array of {key: 'key', value: 'value'} objects to inject
	 */
	public static injectDictionary (newDictionary: any[]) {
		for (const item of newDictionary) {
			if (!item['key'] || !item['value']) {
				continue;
			}

			let match = false;
			for (let i = 0; i < this.dictionary.length; i += 1) {
				if (item['key'] === this.dictionary[i].key) {
					this.dictionary[i] = new I18nDictionaryItem(item['key'], item['value']);
					match = true;
					break;
				}
			}

			if (!match) {
				this.dictionary.push(new I18nDictionaryItem(item['key'], item['value']));
			}
		}
	}

	/**
	 * Rebuilds the dictionary with the provided language
	 * @param language The language of the rebuilt dictionary
	 * @param dictionary Array of {key: 'key', value: 'value'} objects to inject
	 */
	public static buildDictionary (language: string, dictionary: Object[] = null) {
		this.language = language;
		this.dictionary = [];
		if (dictionary) {
			this.injectDictionary(dictionary);
		}
	}
}
