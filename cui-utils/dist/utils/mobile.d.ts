/**
 * Utility for determining whether a device is mobile.
 */
export declare class Mobile {
    /**
     * Returns whether the user's device is mobile.
     * @return Whether the device is mobile.
     */
    static isMobile(): boolean;
}
export interface MobileWindow extends Window {
    [key: string]: any;
}
