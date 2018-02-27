import { OnInit, EventEmitter, ElementRef } from '@angular/core';
import { AcceptedFile, RejectedFile, DroppedFiles } from 'ng-file-drop';
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
export declare class CuiDropzoneComponent implements OnInit {
    private i18n;
    private fileSizePipe;
    constructor(i18n: I18nPipe, fileSizePipe: FileSizePipe);
    /**
     * The files array to share with the parent
     */
    files: any[];
    filesChange: EventEmitter<{}>;
    /**
     * The errors object to share with the parent
     */
    error: any;
    errorChange: EventEmitter<{}>;
    /**
     * The default text for the dropzone
     */
    dropText: string;
    /**
     * Allow single or multi-file upload
     */
    multipleAllowed: boolean;
    /**
     * Max size (in bytes) for a single file
     */
    maxSize: number;
    /**
     * Max total size (in bytes) for all files combined
     */
    maxTotalSize: number;
    /**
     * Max files allowed per single upload
     */
    maxFiles: number;
    /**
     * Regex pattern to evaluate file names against to look for invalid characters
     */
    invalidPattern: RegExp;
    /**
     * Mime types allowed
     */
    allowTypes: string[];
    /**
     * Extension types allowed
     */
    allowExtensions: string[];
    alert: any;
    totalSize: number;
    private fileTypes;
    /**
     * Handler for controller file input open
     */
    fileInput: ElementRef;
    openFileDialog(): void;
    /**
     * Handler for adding files selected from file dialog
     * @param  {any}    event file input event
     */
    onChange(event: any): void;
    /**
     * Checks the given file name for invalid pattern and sets an error message
     * @param  {any} file
     * @return {any}      file
     */
    private checkFileName(file);
    /**
     * Returns the extension of a file from its name
     * @param  {string} filename
     * @return {string}          extension
     */
    private getExtension(filename);
    /**
     * Checks the given file against the allowed extensions and set an error,
     * will override allowTypes
     * @param  {any} file
     * @return {any}      file
     */
    private checkFileExtension(file);
    /**
     * Gets the icon for a file given its name
     * @param  {string} filename
     * @return {string}          icon
     */
    getIconForFile(filename: string): string;
    /**
     * splices a file out of the files array
     * @param  {any}    $event Event used to stop propagation
     * @param  {number} index  Index of file in array
     */
    removeFile($event: any, index: number): void;
    /**
     * Handler for ng-file-drop single dropped file success
     * @param  {AcceptedFile} acceptedFile File
     */
    dragFileAccepted(acceptedFile: AcceptedFile): void;
    /**
     * Handler for ng-file-drop single dropped file rejected
     * @param  {RejectedFile} rejectedFile File
     */
    dragFileRejected(rejectedFile: RejectedFile): void;
    /**
     * Handler for ng-file-drop multiple dropped files
     * @param  {DroppedFiles} files Files
     */
    dragFiles(files: DroppedFiles): void;
    /**
     * Checks file list for errors and builds the error messages
     */
    private calculateErrors();
    /**
     * Updates the total size value
     */
    private updateSizes();
    ngOnInit(): void;
}
