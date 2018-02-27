/**
 * Utility for retrieving a device's preferred language.
 */
export declare class Language {
    /**
     * Retrieves the user's preferred language.
     * @return The preferred language.
     */
    static getPreferred(): string;
}
export interface LocationNavigator extends Navigator {
    [key: string]: any;
}
