/**
 * Enumeration of available device types
 */
export declare const enum DeviceOS {
    WINDOWS_10 = 0,
    WINDOWS_8_1 = 1,
    WINDOWS_8 = 2,
    WINDOWS_7 = 3,
    WINDOWS_VISTA = 4,
    WINDOWS_SERVER_2003 = 5,
    WINDOWS_XP = 6,
    WINDOWS_2000 = 7,
    WINDOWS_ME = 8,
    WINDOWS_98 = 9,
    WINDOWS_95 = 10,
    WINDOWS_NT_4_0 = 11,
    WINDOWS_CE = 12,
    WINDOWS_3_11 = 13,
    ANDROID = 14,
    OPEN_BSD = 15,
    SUN_OS = 16,
    LINUX = 17,
    IOS = 18,
    MAC_OSX = 19,
    MAC_OS = 20,
    QNX = 21,
    UNIX = 22,
    BE_OS = 23,
    OS_2 = 24,
    SEARCH_BOT = 25,
}
export declare class Device {
    os: number;
    displayName: string;
    regex: RegExp;
    version: string;
    mobile: boolean;
    language: string;
    constructor(os: number, displayName: string, regex: RegExp);
}
export declare class DeviceService {
    constructor();
    /**
     * Retrieves information on the user's device
     * @return The user's device details
     */
    getDevice(): Device;
    isMobile(): boolean;
    isWindows(): boolean;
    isMac(): boolean;
    isLinux(): boolean;
}
