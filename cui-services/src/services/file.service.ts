import { Injectable } from '@angular/core';

import { LogService } from './log.service';

/**
 * Enumeration of available file types
 */
export enum FileType {
	ARCHIVE,
	AUDIO,
	CODE,
	IMAGE,
	MS_WORD,
	MS_EXCEL,
	MS_POWERPOINT,
	PDF,
	TEXT,
	VIDEO,
}

export class FileInfo {
	constructor(
		public type: number,
		public displayName: string,
		public icon: string,
		public extensions: string[],
	) {}
}

const fileInfos: FileInfo[] = [
	new FileInfo(
		FileType.ARCHIVE,
		'archive',
		'icon-file-archive-o',
		['tar', 'jar', 'cpio', 'zip', 'zipx', 'iso', 'ar', 'gz',
			'gzip', 'bz2', 'apk', 'car', 'cab', 'dmg', 'rar', 'z'],
	),
	new FileInfo(
		FileType.AUDIO,
		'audio',
		'icon-file-audio-o',
		['au', 'aac', 'm4p', 'm4a', 'mp1', 'mp2', 'mp3', 'mpg',
			'mpeg', 'oga', 'ogg', 'wav', 'webm', 'wma'],
	),
	new FileInfo(
		FileType.CODE,
		'code',
		'icon-file-code-o',
		['js', 'css', 'asp', 'aspx', 'jsp', 'htm', 'html', 'php',
			'pl', 'asm', 'java', 'lib', 'o', 'scpt', 'vbs', 'cc', 'sql'],
	),
	new FileInfo(
		FileType.IMAGE,
		'image',
		'icon-file-image-o',
		['jpg', 'jpeg', 'tif', 'tiff', 'png', 'gif', 'bmp', 'ico', 'icon', 'pic'],
	),
	new FileInfo(
		FileType.MS_WORD,
		'ms-word',
		'icon-file-word-o',
		['doc', 'dot', 'docx', 'docm', 'dotm'],
	),
	new FileInfo(
		FileType.MS_EXCEL,
		'ms-excel',
		'icon-file-excel-o',
		['xls', 'xlt', 'xla', 'xlsx', 'xltx', 'xlsm', 'xltm', 'xlam', 'xlsb'],
	),
	new FileInfo(
		FileType.MS_POWERPOINT,
		'ms-powerpoint',
		'icon-file-powerpoint-o',
		['ppt', 'pot', 'pps', 'ppa', 'pptx', 'potx', 'ppsx', 'ppam', 'pptm', 'potm', 'ppsm'],
	),
	new FileInfo(
		FileType.PDF,
		'pdf',
		'icon-file-pdf-o',
		['pdf'],
	),
	new FileInfo(
		FileType.TEXT,
		'text',
		'icon-file-text-o',
		['txt', 'text', 'tex', 'log', 'cfg', 'csv'],
	),
	new FileInfo(
		FileType.VIDEO,
		'video',
		'icon-file-video-o',
		['mp4', 'm4v', 'mov', 'flv', 'm3u8', 'ts', '3gp', 'avi', 'wmv'],
	),
];

@Injectable()
export class FileService {
	logService: LogService = new LogService();

	constructor() {}

	/**
	 * Retrieves information on a file extension
	 * @param   extension The file extension to retrieve info on
	 * @returns The file info
	 */
	public getFileInfo (extension: string): FileInfo {
		return fileInfos.find(fileInfo => {
			const foundExtension = fileInfo.extensions
				.find(infoExtension => infoExtension === extension.toLowerCase());

			if (foundExtension) {
				return true;
			}

			return false;
		});
	}

	private createFileAnchor (content: string, filename: string = null,
		mimeType: string = 'data:text/plain;charset=utf-8') {
		try {
			const anchor = document.createElement('a');
			anchor.id = 'downloadAnchor';
			anchor.href = filename ? this.encodeDataURI(content, mimeType)
				: `${mimeType},${encodeURIComponent(content)}`;
			anchor.download = filename || undefined;
			document.body.appendChild(anchor);

			const event: any = document.createEvent('MouseEvents');
			event['initMouseEvent']('click', true, true, window, 0, 0, 0, 0, 0, false, false,
													false, false, 0, null);
			anchor.dispatchEvent(event);

			document.body.removeChild(anchor);
		} catch (err) {
			this.logService.error(err);
		}
	}

	/**
	 * Starts the downloading of content as a file
	 * @param   content  A raw or base64 encoded string of file contents
	 * @param   filename The name of the file to download
	 * @param   mimeType The mime type of the file
	 */
	public triggerDownload (content: string, filename: string,
		mimeType: string = 'data:text/plain;charset=utf-8') {
		this.createFileAnchor(content, filename, mimeType);
	}

	/**
	 * Opens file content in another tab
	 * @param   content  A raw or base64 encoded string of file contents
	 * @param   mimeType The mime type of the file
	 */
	public triggerOpenFile (content: string, mimeType: string = 'data:text/plain;charset=utf-8') {
		this.createFileAnchor(content, null, mimeType);
	}

	/**
	 * Encodes a string to base64
	 * @param   data The string to encode
	 * @returns The encoded string
	 */
	public encodeBase64 (data: string): string {
		try {
			return window.btoa(window['unescape'](window['encodeURIComponent'](data)));
		} catch (err) {
			this.logService.error(err);

			return data;
		}
	}

	/**
	 * Decodes a base64 string
	 * @param   data The string to decode
	 * @returns The decoded string
	 */
	public decodeBase64 (data: string): string {
		try {
			return window.atob(data);
		} catch (err) {
			this.logService.error(err);

			return data;
		}
	}

	/**
	 * Endodes data for opening in a new window or tab
	 * @param   data     The file data
	 * @param   mimeType The mime type of the file
	 * @returns The data URI string
	 */
	public encodeDataURI (data: string, mimeType: string = 'data:text/plain;charset=utf-8')
		: string {
		return `${mimeType};base64,${this.encodeBase64(data)}`;
	}
}
