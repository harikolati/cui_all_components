import { Component, OnInit,
	Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { AcceptedFile, RejectedFile, DroppedFiles } from 'ng-file-drop';

import {
	castArray, each, get, has, head, includes,
	isEmpty, isNil, join, map, set, sumBy,
	filter, uniq, uniqBy, unset,
} from 'lodash-es';
import { FileSizePipe, I18nPipe } from '@cisco-ngx/cui-pipes';

/**
 * Component for file upload and dropzone
 *
 * Example
 * <cui-dropzone
 * [(files)]="upload.files"
 * [dropText]="'_DropText_' | i18n"
 * [multipleAllowed]="multipleAllowed"
 * [maxSize]="maxFileSize"
 * [maxTotalSize]="maxTotalSize"
 * [maxFiles]="maxFiles"
 * [invalidPattern]="nameRegex">
 * </cui-dropzone>
 */
@Component({
	selector: 'cui-dropzone',
	templateUrl: './cui-dropzone.component.html',
})
export class CuiDropzoneComponent implements OnInit {

	constructor(
		private i18n: I18nPipe,
		private fileSizePipe: FileSizePipe,
	) {}

	/**
	 * The files array to share with the parent
	 */
	@Input() files: any[] = [];
	@Output() filesChange = new EventEmitter();

	/**
	 * The errors object to share with the parent
	 */
	@Input() error: any = {};
	@Output() errorChange = new EventEmitter();

	/**
	 * The default text for the dropzone
	 */
	@Input() dropText = '';

	/**
	 * Allow single or multi-file upload
	 */
	@Input() multipleAllowed = false;

	/**
	 * Max size (in bytes) for a single file
	 */
	@Input() maxSize = 0;

	/**
	 * Max total size (in bytes) for all files combined
	 */
	@Input() maxTotalSize = 0;

	/**
	 * Max files allowed per single upload
	 */
	@Input() maxFiles = 0;

	/**
	 * Regex pattern to evaluate file names against to look for invalid characters
	 */
	@Input() invalidPattern: RegExp;

	/**
	 * Mime types allowed
	 */
	@Input() allowTypes: string[];

	/**
	 * Extension types allowed
	 */
	@Input() allowExtensions: string[] = [];

	public alert: any = {
		closeButton: false,
	};
	public totalSize = 0;
	private fileTypes = <any> [
		{
			name: 'archive',
			icon: 'icon-file-archive-o',
			extensions: [
				'tar', 'jar', 'cpio', 'zip', 'zipx', 'iso', 'ar', 'gz', 'gzip',
				'bz2', 'apk', 'car', 'cab', 'dmg', 'rar', 'z', 'Z',
			],
		},
		{
			name: 'audio',
			icon: 'icon-file-audio-o',
			extensions: [
				'au', 'aac', 'm4p', 'm4a', 'mp1', 'mp2', 'mp3',
				'mpg', 'mpeg', 'oga', 'ogg', 'wav', 'webm', 'wma',
			],
		},
		{
			name: 'code',
			icon: 'icon-file-code-o',
			extensions: [
				'js', 'css', 'asp', 'aspx', 'jsp', 'htm', 'html', 'php', 'pl',
				'asm', 'java', 'lib', 'o', 'scpt', 'vbs', 'cc', 'sql',
			],
		},
		{
			name: 'image',
			icon: 'icon-file-image-o',
			extensions: [
				'jpg', 'jpeg', 'tif', 'tiff', 'png', 'gif', 'bmp', 'ico', 'icon', 'pic',
			],
		},
		{
			name: 'ms-word',
			icon: 'icon-file-word-o',
			extensions: ['doc', 'dot', 'docx', 'docm', 'dotm'],
		},
		{
			name: 'ms-excel',
			icon: 'icon-file-excel-o',
			extensions: ['xls', 'xlt', 'xla', 'xlsx', 'xltx', 'xlsm', 'xltm', 'xlam', 'xlsb'],
		},
		{
			name: 'ms-powerpoint',
			icon: 'icon-file-powerpoint-o',
			extensions: [
				'ppt', 'pot', 'pps', 'ppa', 'pptx',
				'potx', 'ppsx', 'ppam', 'pptm', 'potm', 'ppsm',
			],
		},
		{
			name: 'pdf',
			icon: 'icon-file-pdf-o',
			extensions: ['pdf'],
		},
		{
			name: 'text',
			icon: 'icon-file-text-o',
			extensions: ['txt', 'text', 'tex', 'log', 'cfg', 'csv'],
		},
		{
			name: 'video',
			icon: 'icon-file-video-o',
			extensions: ['mp4', 'm4v', 'mov', 'flv', 'm3u8', 'ts', '3gp', 'avi', 'wmv'],
		},
	];

	/**
	 * Handler for controller file input open
	 */
	@ViewChild('fileInput') fileInput: ElementRef;
	public openFileDialog (): void {
		const event = new MouseEvent('click', { bubbles: false });
		this.fileInput.nativeElement.dispatchEvent(event);
	}

	/**
	 * Handler for adding files selected from file dialog
	 * @param  {any}    event file input event
	 */
	public onChange (event: any) {
		const files = map(event.target.files, f => f);
		each(files, (fileObj: any) => {
			let file = fileObj;
			if (file.size > this.maxSize && this.maxSize !== 0) {
				set(file, ['error', 'maxSize'], true);
			}
			if (this.allowTypes &&
				this.allowTypes.length && this.allowTypes.indexOf(file.type) === -1) {
				set(file, ['error', 'invalidMime'], true);
			}

			file = this.checkFileExtension(file);
			file = this.checkFileName(file);
		});

		if (!this.multipleAllowed) {
			this.files = castArray(files);
		} else {
			this.files = uniqBy([...this.files, ...files], 'name');
		}

		this.updateSizes();
	}

	/**
	 * Checks the given file name for invalid pattern and sets an error message
	 * @param  {any} file
	 * @return {any}      file
	 */
	private checkFileName (file: any): any {
		if (!isNil(this.invalidPattern) && this.invalidPattern.test(file.name)) {
			set(file, ['error', 'invalidName'], true);

			const match = file.name.match(this.invalidPattern);
			set(file, ['error', 'invalidNamePattern'], head(match));
		}

		return file;
	}

	/**
	 * Returns the extension of a file from its name
	 * @param  {string} filename
	 * @return {string}          extension
	 */
	private getExtension (filename: string): string {
		return filename.substr(filename.lastIndexOf('.') + 1);
	}

	/**
	 * Checks the given file against the allowed extensions and set an error,
	 * will override allowTypes
	 * @param  {any} file
	 * @return {any}      file
	 */
	private checkFileExtension (file: any): any {
		if (this.allowExtensions.length) {
			if (this.allowExtensions.indexOf(`${this.getExtension(file.name)}`) === -1) {
				set(file, ['error', 'invalidMime'], true);
			} else if (file.error === 'invalidMime') {
				unset(file, ['error', 'invalidMime']);
			}
		}

		return file;
	}

	/**
	 * Gets the icon for a file given its name
	 * @param  {string} filename
	 * @return {string}          icon
	 */
	public getIconForFile (filename: string) {
		let icon = 'icon-file-o';
		if (filename.length > 0) {
			each(this.fileTypes, (value: any) => {
				if (includes(value.extensions, this.getExtension(filename))) {
					return icon = value.icon;
				}
			});
		}

		return icon;
	}

	/**
	 * splices a file out of the files array
	 * @param  {any}    $event Event used to stop propagation
	 * @param  {number} index  Index of file in array
	 */
	public removeFile ($event: any, index: number) {
		$event.stopPropagation();
		this.files.splice(index, 1);
		this.updateSizes();
	}

	/**
	 * Handler for ng-file-drop single dropped file success
	 * @param  {AcceptedFile} acceptedFile File
	 */
	public dragFileAccepted (acceptedFile: AcceptedFile) {
		const file = this.checkFileName(acceptedFile.file);
		this.files = castArray(file);
		this.updateSizes();
	}

	/**
	 * Handler for ng-file-drop single dropped file rejected
	 * @param  {RejectedFile} rejectedFile File
	 */
	public dragFileRejected (rejectedFile: RejectedFile) {
		let file = rejectedFile.file;

		if ((file.size > this.maxSize && this.maxSize !== 0) ||
			rejectedFile.rejectionReason === 2) {
			set(file, ['error', 'maxSize'], true);
		}

		if (rejectedFile.rejectionReason === 1) {
			set(file, ['error', 'invalidMime'], true);
		}

		file = this.checkFileExtension(file);
		file = this.checkFileName(file);
		this.files = castArray(file);
		this.updateSizes();
	}

	/**
	 * Handler for ng-file-drop multiple dropped files
	 * @param  {DroppedFiles} files Files
	 */
	public dragFiles (files: DroppedFiles) {
		const rejectedFiles = <any>[];

		each(files.rejected, (rejected: any) => {
			let file = rejected.acceptedFile;
			if ((file.size > this.maxSize && this.maxSize !== 0) || rejected.reason === 2) {
				set(file, ['error', 'maxSize'], true);
			}

			if (rejected.reason === 1) {
				set(file, ['error', 'invalidMime'], true);
			}

			file = this.checkFileExtension(file);
			file = this.checkFileName(file);

			rejectedFiles.push(file);
		});

		this.files = uniqBy(
			[...this.files, ...map(files.accepted, 'acceptedFile'), ...rejectedFiles], 'name');
		this.updateSizes();
	}

	/**
	 * Checks file list for errors and builds the error messages
	 */
	private calculateErrors () {
		each(this.files, (file: any, i: number) => {
			if (get(file, ['error', 'maxFiles']) || !has(file, 'error')) {
				if (this.maxFiles >= this.files.length) {
					unset(file, ['error', 'maxFiles']);
				} else {
					const overflow = this.files.length - this.maxFiles;
					if (i < (this.files.length - overflow)) {
						unset(file, ['error', 'maxFiles']);
					} else {
						set(file, ['error', 'maxFiles'], true);
					}
				}
			}

			if (isEmpty(file.error)) {
				unset(file, 'error');
			}
		});

		const sizeErrors = filter(this.files, { error: { maxSize: true } }).length > 0;
		const maxErrors = filter(this.files, { error: { maxFiles: true } }).length > 0;
		const mimeErrors = filter(this.files, { error: { invalidMime: true } }).length > 0;
		const nameErrors = filter(this.files, { error: { invalidName: true } }).length > 0;

		this.error.invalid =
		(sizeErrors || maxErrors || mimeErrors || nameErrors ||
			(this.totalSize > this.maxTotalSize && this.maxTotalSize !== 0));

		let alertMessage = `${this.i18n.transform('_FileErrors_')}<br><ul>`;
		if (maxErrors || this.files.length > this.maxFiles) {
			alertMessage += `<li>${this.i18n.transform('_MaxFilesError_', this.maxFiles)}</li>`;
		}
		if (sizeErrors || (this.totalSize > this.maxTotalSize && this.maxTotalSize !== 0)) {
			alertMessage += `<li>${this.i18n.transform(
				'_MaxSizeError_',
				this.fileSizePipe.transform(this.maxSize),
				this.fileSizePipe.transform(this.maxTotalSize))}</li>`;
		}
		if (mimeErrors) {
			const fileTypes = this.allowExtensions.length ?
				join(this.allowExtensions, ',') :
				(this.allowTypes && this.allowTypes.length) ? join(this.allowTypes, ',') : '';
			alertMessage += `<li>${this.i18n.transform('_InvalidFileType_', fileTypes)}</li>`;
		}
		if (nameErrors) {
			const invalidNameErrors = uniq(map(filter(
				this.files, { error: { invalidName: true } }), 'error.invalidNamePattern'));
			alertMessage += `<li>${this.i18n.transform(
				'_InvalidFileName_', join(invalidNameErrors, ','))}</li>`;
		}
		if (!this.error.invalid) {
			this.alert.hide();
		} else {
			this.alert.show(alertMessage, 'warning');
		}
		this.errorChange.emit(this.error);
		this.filesChange.emit(this.files);
	}

	/**
	 * Updates the total size value
	 */
	private updateSizes () {
		this.totalSize = sumBy(this.files, 'size');
		this.calculateErrors();
	}

	ngOnInit () {
		if (!this.files) {
			this.files = [];
		}
	}
}
