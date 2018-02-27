export declare class I18nPipe {
    transform(value: string, ...args: any[]): string;
}
export declare class I18nService {
    language: string;
    getPreferredLanguage(): any;
    injectDictionary(dictionaries: any, forceLocale?: string): void;
}
export declare class I18nPipeModule {
}
