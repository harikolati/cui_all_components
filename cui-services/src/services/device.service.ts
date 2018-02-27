import { Injectable } from '@angular/core';

import { Mobile, Language } from '@cisco-ngx/cui-utils';

/**
 * Enumeration of available device types
 */
export const enum DeviceOS {
	WINDOWS_10,
	WINDOWS_8_1,
	WINDOWS_8,
	WINDOWS_7,
	WINDOWS_VISTA,
	WINDOWS_SERVER_2003,
	WINDOWS_XP,
	WINDOWS_2000,
	WINDOWS_ME,
	WINDOWS_98,
	WINDOWS_95,
	WINDOWS_NT_4_0,
	WINDOWS_CE,
	WINDOWS_3_11,
	ANDROID,
	OPEN_BSD,
	SUN_OS,
	LINUX,
	IOS,
	MAC_OSX,
	MAC_OS,
	QNX,
	UNIX,
	BE_OS,
	OS_2,
	SEARCH_BOT,
}

export class Device {
	public version: string;
	public mobile: boolean;
	public language: string;

	constructor(
		public os: number,
		public displayName: string,
		public regex: RegExp,
	) {}
}

const devices: Device[] = [
	new Device(
		DeviceOS.WINDOWS_10,
		'Windows 10',
		/(Windows 10.0|Windows NT 10.0)/,
	),
	new Device(
		DeviceOS.WINDOWS_8_1,
		'Windows 8.1',
		/(Windows 8.1|Windows NT 6.3)/,
	),
	new Device(
		DeviceOS.WINDOWS_8,
		'Windows 8',
		/(Windows 8|Windows NT 6.2)/,
	),
	new Device(
		DeviceOS.WINDOWS_7,
		'Windows 7',
		/(Windows 7|Windows NT 6.1)/,
	),
	new Device(
		DeviceOS.WINDOWS_VISTA,
		'Windows Vista',
		/Windows NT 6.0/,
	),
	new Device(
		DeviceOS.WINDOWS_SERVER_2003,
		'Windows Server 2003',
		/Windows NT 5.2/,
	),
	new Device(
		DeviceOS.WINDOWS_SERVER_2003,
		'Windows Server 2003',
		/Windows NT 5.2/,
	),
	new Device(
		DeviceOS.WINDOWS_XP,
		'Windows XP',
		/(Windows NT 5.1|Windows XP)/,
	),
	new Device(
		DeviceOS.WINDOWS_2000,
		'Windows 2000',
		/(Windows NT 5.0|Windows 2000)/,
	),
	new Device(
		DeviceOS.WINDOWS_ME,
		'Windows ME',
		/(Win 9x 4.90|Windows ME)/,
	),
	new Device(
		DeviceOS.WINDOWS_98,
		'Windows 98',
		/(Windows 98|Win98)/,
	),
	new Device(
		DeviceOS.WINDOWS_95,
		'Windows 95',
		/(Windows 95|Win95|Windows_95)/,
	),
	new Device(
		DeviceOS.WINDOWS_NT_4_0,
		'Windows NT 4.0',
		/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
	),
	new Device(
		DeviceOS.WINDOWS_CE,
		'Windows CE',
		/Windows CE/,
	),
	new Device(
		DeviceOS.WINDOWS_3_11,
		'Windows 3.11',
		/Win16/,
	),
	new Device(
		DeviceOS.ANDROID,
		'Android',
		/Android/,
	),
	new Device(
		DeviceOS.OPEN_BSD,
		'Open BSD',
		/OpenBSD/,
	),
	new Device(
		DeviceOS.SUN_OS,
		'Sun OS',
		/SunOS/,
	),
	new Device(
		DeviceOS.LINUX,
		'Linux',
		/(Linux|X11)/,
	),
	new Device(
		DeviceOS.IOS,
		'iOS',
		/(iPhone|iPad|iPod)/,
	),
	new Device(
		DeviceOS.MAC_OSX,
		'Mac OS X',
		/Mac OS X/,
	),
	new Device(
		DeviceOS.MAC_OS,
		'Mac OS',
		/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/,
	),
	new Device(
		DeviceOS.QNX,
		'QNX',
		/QNX/,
	),
	new Device(
		DeviceOS.UNIX,
		'UNIX',
		/UNIX/,
	),
	new Device(
		DeviceOS.BE_OS,
		'BeOS',
		/BeOS/,
	),
	new Device(
		DeviceOS.OS_2,
		'OS/2',
		/OS\/2/,
	),
	new Device(
		DeviceOS.SEARCH_BOT,
		'Search Bot',
		/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
	),
];

@Injectable()
export class DeviceService {

	constructor() { }

	/**
	 * Retrieves information on the user's device
	 * @return The user's device details
	 */
	public getDevice (): Device {
		const navigatorAgent = window.navigator.userAgent
			|| window.navigator.vendor || window['opera'];
		const navigatorVersion = window.navigator.appVersion;

		const device = devices.find(dvc => dvc.regex.test(navigatorAgent));

		if (/Windows/.test(device.displayName)) {
			device.version = /Windows (.*)/.exec(device.displayName)[1];
		}

		switch (device.os) {
		case DeviceOS.MAC_OSX:
			device.version = /Mac OS X (10[\.\_\d]+)/.exec(navigatorAgent)[1];
			break;
		case DeviceOS.ANDROID:
			device.version = /Android ([\.\_\d]+)/.exec(navigatorAgent)[1];
			break;
		case DeviceOS.IOS:
			const version = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigatorVersion);
			device.version = `${version[1]}.${version[2]}.${parseInt(version[3], 10) || 0}`;
			break;
		}

		device.mobile = this.isMobile();
		device.language = Language.getPreferred();

		return device;
	}

	public isMobile (): boolean {
		return Mobile.isMobile();
	}

	public isWindows (): boolean {
		const device: Device = this.getDevice();

		/* tslint:disable-next-line max-line-length ter-max-len */
		return device.os === DeviceOS.WINDOWS_10 || device.os === DeviceOS.WINDOWS_8_1 || device.os === DeviceOS.WINDOWS_8 || device.os === DeviceOS.WINDOWS_7 || device.os === DeviceOS.WINDOWS_VISTA || device.os === DeviceOS.WINDOWS_SERVER_2003 || device.os === DeviceOS.WINDOWS_XP || device.os === DeviceOS.WINDOWS_2000 || device.os === DeviceOS.WINDOWS_ME || device.os === DeviceOS.WINDOWS_98 || device.os === DeviceOS.WINDOWS_95 || device.os === DeviceOS.WINDOWS_NT_4_0 || device.os === DeviceOS.WINDOWS_CE || device.os === DeviceOS.WINDOWS_3_11;
	}

	public isMac (): boolean {
		const device: Device = this.getDevice();

		return device.os === DeviceOS.MAC_OSX || device.os === DeviceOS.MAC_OS;
	}

	public isLinux (): boolean {
		const device: Device = this.getDevice();

		return device.os === DeviceOS.LINUX || device.os === DeviceOS.ANDROID;
	}
}
