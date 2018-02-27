export declare class I18nDictionaryItem {
    key: string;
    value: string;
    constructor(key: string, value: string);
}
/**
 * Utility for setting and retrieving internationalized strings
 */
export declare class I18n {
    /**
     * The currently set language
     */
    static language: string;
    private static dictionary;
    /**
     * Returns the current dictionary
     * @returns The dictionary
     */
    static getDictionary(): I18nDictionaryItem[];
    /**
     * Retrieves an internationalized string
     * @param key    The key of the dictionary item to retrieve
     * @param values Optional values to inject into the result (item must have {x} binding).
     *   Send an array of values for multiple bindings.
     * @returns The internationalized string
     */
    static get(key: string, values?: any): string;
    /**
     * Appends and replaces items in the current dictionary
     * @param newDictionary Array of {key: 'key', value: 'value'} objects to inject
     */
    static injectDictionary(newDictionary: any[]): void;
    /**
     * Rebuilds the dictionary with the provided language
     * @param language The language of the rebuilt dictionary
     * @param dictionary Array of {key: 'key', value: 'value'} objects to inject
     */
    static buildDictionary(language: string, dictionary?: Object[]): void;
}
