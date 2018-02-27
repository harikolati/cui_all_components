import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { castArray, each, get, has, head, includes, isEmpty, isNil, join, map, set, sumBy, filter, uniq, uniqBy, unset, } from 'lodash-es';
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
var CuiDropzoneComponent = (function () {
    function CuiDropzoneComponent(i18n, fileSizePipe) {
        this.i18n = i18n;
        this.fileSizePipe = fileSizePipe;
        /**
             * The files array to share with the parent
             */
        this.files = [];
        this.filesChange = new EventEmitter();
        /**
             * The errors object to share with the parent
             */
        this.error = {};
        this.errorChange = new EventEmitter();
        /**
             * The default text for the dropzone
             */
        this.dropText = '';
        /**
             * Allow single or multi-file upload
             */
        this.multipleAllowed = false;
        /**
             * Max size (in bytes) for a single file
             */
        this.maxSize = 0;
        /**
             * Max total size (in bytes) for all files combined
             */
        this.maxTotalSize = 0;
        /**
             * Max files allowed per single upload
             */
        this.maxFiles = 0;
        /**
             * Extension types allowed
             */
        this.allowExtensions = [];
        this.alert = {
            closeButton: false,
        };
        this.totalSize = 0;
        this.fileTypes = [
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
    }
    CuiDropzoneComponent.prototype.openFileDialog = function () {
        var event = new MouseEvent('click', { bubbles: false });
        this.fileInput.nativeElement.dispatchEvent(event);
    };
    /**
     * Handler for adding files selected from file dialog
     * @param  {any}    event file input event
     */
    /**
         * Handler for adding files selected from file dialog
         * @param  {any}    event file input event
         */
    CuiDropzoneComponent.prototype.onChange = /**
         * Handler for adding files selected from file dialog
         * @param  {any}    event file input event
         */
    function (event) {
        var _this = this;
        var files = map(event.target.files, function (f) { return f; });
        each(files, function (fileObj) {
            var file = fileObj;
            if (file.size > _this.maxSize && _this.maxSize !== 0) {
                set(file, ['error', 'maxSize'], true);
            }
            if (_this.allowTypes &&
                _this.allowTypes.length && _this.allowTypes.indexOf(file.type) === -1) {
                set(file, ['error', 'invalidMime'], true);
            }
            file = _this.checkFileExtension(file);
            file = _this.checkFileName(file);
        });
        if (!this.multipleAllowed) {
            this.files = castArray(files);
        }
        else {
            this.files = uniqBy(this.files.concat(files), 'name');
        }
        this.updateSizes();
    };
    /**
     * Checks the given file name for invalid pattern and sets an error message
     * @param  {any} file
     * @return {any}      file
     */
    /**
         * Checks the given file name for invalid pattern and sets an error message
         * @param  {any} file
         * @return {any}      file
         */
    CuiDropzoneComponent.prototype.checkFileName = /**
         * Checks the given file name for invalid pattern and sets an error message
         * @param  {any} file
         * @return {any}      file
         */
    function (file) {
        if (!isNil(this.invalidPattern) && this.invalidPattern.test(file.name)) {
            set(file, ['error', 'invalidName'], true);
            var match = file.name.match(this.invalidPattern);
            set(file, ['error', 'invalidNamePattern'], head(match));
        }
        return file;
    };
    /**
     * Returns the extension of a file from its name
     * @param  {string} filename
     * @return {string}          extension
     */
    /**
         * Returns the extension of a file from its name
         * @param  {string} filename
         * @return {string}          extension
         */
    CuiDropzoneComponent.prototype.getExtension = /**
         * Returns the extension of a file from its name
         * @param  {string} filename
         * @return {string}          extension
         */
    function (filename) {
        return filename.substr(filename.lastIndexOf('.') + 1);
    };
    /**
     * Checks the given file against the allowed extensions and set an error,
     * will override allowTypes
     * @param  {any} file
     * @return {any}      file
     */
    /**
         * Checks the given file against the allowed extensions and set an error,
         * will override allowTypes
         * @param  {any} file
         * @return {any}      file
         */
    CuiDropzoneComponent.prototype.checkFileExtension = /**
         * Checks the given file against the allowed extensions and set an error,
         * will override allowTypes
         * @param  {any} file
         * @return {any}      file
         */
    function (file) {
        if (this.allowExtensions.length) {
            if (this.allowExtensions.indexOf("" + this.getExtension(file.name)) === -1) {
                set(file, ['error', 'invalidMime'], true);
            }
            else if (file.error === 'invalidMime') {
                unset(file, ['error', 'invalidMime']);
            }
        }
        return file;
    };
    /**
     * Gets the icon for a file given its name
     * @param  {string} filename
     * @return {string}          icon
     */
    /**
         * Gets the icon for a file given its name
         * @param  {string} filename
         * @return {string}          icon
         */
    CuiDropzoneComponent.prototype.getIconForFile = /**
         * Gets the icon for a file given its name
         * @param  {string} filename
         * @return {string}          icon
         */
    function (filename) {
        var _this = this;
        var icon = 'icon-file-o';
        if (filename.length > 0) {
            each(this.fileTypes, function (value) {
                if (includes(value.extensions, _this.getExtension(filename))) {
                    return icon = value.icon;
                }
            });
        }
        return icon;
    };
    /**
     * splices a file out of the files array
     * @param  {any}    $event Event used to stop propagation
     * @param  {number} index  Index of file in array
     */
    /**
         * splices a file out of the files array
         * @param  {any}    $event Event used to stop propagation
         * @param  {number} index  Index of file in array
         */
    CuiDropzoneComponent.prototype.removeFile = /**
         * splices a file out of the files array
         * @param  {any}    $event Event used to stop propagation
         * @param  {number} index  Index of file in array
         */
    function ($event, index) {
        $event.stopPropagation();
        this.files.splice(index, 1);
        this.updateSizes();
    };
    /**
     * Handler for ng-file-drop single dropped file success
     * @param  {AcceptedFile} acceptedFile File
     */
    /**
         * Handler for ng-file-drop single dropped file success
         * @param  {AcceptedFile} acceptedFile File
         */
    CuiDropzoneComponent.prototype.dragFileAccepted = /**
         * Handler for ng-file-drop single dropped file success
         * @param  {AcceptedFile} acceptedFile File
         */
    function (acceptedFile) {
        var file = this.checkFileName(acceptedFile.file);
        this.files = castArray(file);
        this.updateSizes();
    };
    /**
     * Handler for ng-file-drop single dropped file rejected
     * @param  {RejectedFile} rejectedFile File
     */
    /**
         * Handler for ng-file-drop single dropped file rejected
         * @param  {RejectedFile} rejectedFile File
         */
    CuiDropzoneComponent.prototype.dragFileRejected = /**
         * Handler for ng-file-drop single dropped file rejected
         * @param  {RejectedFile} rejectedFile File
         */
    function (rejectedFile) {
        var file = rejectedFile.file;
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
    };
    /**
     * Handler for ng-file-drop multiple dropped files
     * @param  {DroppedFiles} files Files
     */
    /**
         * Handler for ng-file-drop multiple dropped files
         * @param  {DroppedFiles} files Files
         */
    CuiDropzoneComponent.prototype.dragFiles = /**
         * Handler for ng-file-drop multiple dropped files
         * @param  {DroppedFiles} files Files
         */
    function (files) {
        var _this = this;
        var rejectedFiles = [];
        each(files.rejected, function (rejected) {
            var file = rejected.acceptedFile;
            if ((file.size > _this.maxSize && _this.maxSize !== 0) || rejected.reason === 2) {
                set(file, ['error', 'maxSize'], true);
            }
            if (rejected.reason === 1) {
                set(file, ['error', 'invalidMime'], true);
            }
            file = _this.checkFileExtension(file);
            file = _this.checkFileName(file);
            rejectedFiles.push(file);
        });
        this.files = uniqBy(this.files.concat(map(files.accepted, 'acceptedFile'), rejectedFiles), 'name');
        this.updateSizes();
    };
    /**
     * Checks file list for errors and builds the error messages
     */
    /**
         * Checks file list for errors and builds the error messages
         */
    CuiDropzoneComponent.prototype.calculateErrors = /**
         * Checks file list for errors and builds the error messages
         */
    function () {
        var _this = this;
        each(this.files, function (file, i) {
            if (get(file, ['error', 'maxFiles']) || !has(file, 'error')) {
                if (_this.maxFiles >= _this.files.length) {
                    unset(file, ['error', 'maxFiles']);
                }
                else {
                    var overflow = _this.files.length - _this.maxFiles;
                    if (i < (_this.files.length - overflow)) {
                        unset(file, ['error', 'maxFiles']);
                    }
                    else {
                        set(file, ['error', 'maxFiles'], true);
                    }
                }
            }
            if (isEmpty(file.error)) {
                unset(file, 'error');
            }
        });
        var sizeErrors = filter(this.files, { error: { maxSize: true } }).length > 0;
        var maxErrors = filter(this.files, { error: { maxFiles: true } }).length > 0;
        var mimeErrors = filter(this.files, { error: { invalidMime: true } }).length > 0;
        var nameErrors = filter(this.files, { error: { invalidName: true } }).length > 0;
        this.error.invalid =
            (sizeErrors || maxErrors || mimeErrors || nameErrors ||
                (this.totalSize > this.maxTotalSize && this.maxTotalSize !== 0));
        var alertMessage = this.i18n.transform('_FileErrors_') + "<br><ul>";
        if (maxErrors || this.files.length > this.maxFiles) {
            alertMessage += "<li>" + this.i18n.transform('_MaxFilesError_', this.maxFiles) + "</li>";
        }
        if (sizeErrors || (this.totalSize > this.maxTotalSize && this.maxTotalSize !== 0)) {
            alertMessage += "<li>" + this.i18n.transform('_MaxSizeError_', this.fileSizePipe.transform(this.maxSize), this.fileSizePipe.transform(this.maxTotalSize)) + "</li>";
        }
        if (mimeErrors) {
            var fileTypes = this.allowExtensions.length ?
                join(this.allowExtensions, ',') :
                (this.allowTypes && this.allowTypes.length) ? join(this.allowTypes, ',') : '';
            alertMessage += "<li>" + this.i18n.transform('_InvalidFileType_', fileTypes) + "</li>";
        }
        if (nameErrors) {
            var invalidNameErrors = uniq(map(filter(this.files, { error: { invalidName: true } }), 'error.invalidNamePattern'));
            alertMessage += "<li>" + this.i18n.transform('_InvalidFileName_', join(invalidNameErrors, ',')) + "</li>";
        }
        if (!this.error.invalid) {
            this.alert.hide();
        }
        else {
            this.alert.show(alertMessage, 'warning');
        }
        this.errorChange.emit(this.error);
        this.filesChange.emit(this.files);
    };
    /**
     * Updates the total size value
     */
    /**
         * Updates the total size value
         */
    CuiDropzoneComponent.prototype.updateSizes = /**
         * Updates the total size value
         */
    function () {
        this.totalSize = sumBy(this.files, 'size');
        this.calculateErrors();
    };
    CuiDropzoneComponent.prototype.ngOnInit = function () {
        if (!this.files) {
            this.files = [];
        }
    };
    CuiDropzoneComponent.decorators = [
        { type: Component, args: [{
                    selector: 'cui-dropzone',
                    template: "<div> <input *ngIf=\"multipleAllowed\" type=\"file\" style=\"display: none\" (change)=\"onChange($event)\" accept=\"{{ allowExtensions.join(',') }}\" multiple #fileInput /> <input *ngIf=\"!multipleAllowed\" type=\"file\" style=\"display: none\" (change)=\"onChange($event)\" accept=\"{{ allowExtensions.join(',') }}\" #fileInput /> <div ng2FileDrop class=\"file-drop\" (click)=\"openFileDialog()\" [ng2FileDropDisableStyles]=\"true\" [ng2FileDropAcceptMultiple]=\"multipleAllowed\" [ng2FileDropMaximumSizeBytes]=\"maxSize\" [ng2FileDropSupportedFileTypes]=\"allowTypes\" (ng2FileDropFileAccepted)=\"dragFileAccepted($event)\" (ng2FileDropFilesDropped)=\"dragFiles($event)\" (ng2FileDropFileRejected)=\"dragFileRejected($event)\"> <div *ngIf=\"!files || !files.length\"> <span class=\"file-drop__icon icon-upload\"></span> <h4 class=\"text-muted\" [innerHTML]=\"dropText\"></h4> </div> <div *ngIf=\"files && files.length\"> <div class=\"file-drop__container container--fluid\"> <div class=\"row\"> <div class=\"file-drop__card\" *ngFor=\"let file of files; let i = index\" [ngClass]=\"{ 'flex-fill': !multipleAllowed, 'col-lg-3 col-md-6 col-sm-6': multipleAllowed }\"> <div class=\"panel panel--ltgray panel--skinny\" [title]=\"file.name\"> <span *ngIf=\"multipleAllowed\" class=\"icon-close pull-right\" (click)=\"removeFile($event, i)\"> </span> <span *ngIf=\"!file.error\" class=\"file-icon text-muted\" [ngClass]=\"getIconForFile(file.name)\"> </span> <span *ngIf=\"file.error\" class=\"icon-error file-icon text-danger\" [title]=\"'_InvalidFile_' | i18n\"> </span> <div class=\"text-ellipsis\" [innerHTML]=\"file.name\"></div> <small [innerHTML]=\"file.size | fileSize\"></small> </div> </div> </div> </div> <div *ngIf=\"multipleAllowed\" class=\"file-drop__filecnt\" innerHTML=\"{{ files.length }} {{ '_Selected_' | i18n }} ({{ '_Total_' | i18n }}: {{ totalSize | fileSize }})\"> </div> </div> </div> <cui-alert [(options)]=\"alert\"></cui-alert> </div> ",
                },] },
    ];
    /** @nocollapse */
    CuiDropzoneComponent.ctorParameters = function () { return [
        { type: I18nPipe, },
        { type: FileSizePipe, },
    ]; };
    CuiDropzoneComponent.propDecorators = {
        "files": [{ type: Input },],
        "filesChange": [{ type: Output },],
        "error": [{ type: Input },],
        "errorChange": [{ type: Output },],
        "dropText": [{ type: Input },],
        "multipleAllowed": [{ type: Input },],
        "maxSize": [{ type: Input },],
        "maxTotalSize": [{ type: Input },],
        "maxFiles": [{ type: Input },],
        "invalidPattern": [{ type: Input },],
        "allowTypes": [{ type: Input },],
        "allowExtensions": [{ type: Input },],
        "fileInput": [{ type: ViewChild, args: ['fileInput',] },],
    };
    return CuiDropzoneComponent;
}());
export { CuiDropzoneComponent };
//# sourceMappingURL=cui-dropzone.component.js.map