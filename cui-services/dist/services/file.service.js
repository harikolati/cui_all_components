/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from "@angular/core";
import { LogService } from "./log.service";
/** @enum {number} */
var FileType = {
    ARCHIVE: 0,
    AUDIO: 1,
    CODE: 2,
    IMAGE: 3,
    MS_WORD: 4,
    MS_EXCEL: 5,
    MS_POWERPOINT: 6,
    PDF: 7,
    TEXT: 8,
    VIDEO: 9,
};
export { FileType };
FileType[FileType.ARCHIVE] = "ARCHIVE";
FileType[FileType.AUDIO] = "AUDIO";
FileType[FileType.CODE] = "CODE";
FileType[FileType.IMAGE] = "IMAGE";
FileType[FileType.MS_WORD] = "MS_WORD";
FileType[FileType.MS_EXCEL] = "MS_EXCEL";
FileType[FileType.MS_POWERPOINT] = "MS_POWERPOINT";
FileType[FileType.PDF] = "PDF";
FileType[FileType.TEXT] = "TEXT";
FileType[FileType.VIDEO] = "VIDEO";
var FileInfo = (function () {
    function FileInfo(type, displayName, icon, extensions) {
        this.type = type;
        this.displayName = displayName;
        this.icon = icon;
        this.extensions = extensions;
    }
    return FileInfo;
}());
export { FileInfo };
function FileInfo_tsickle_Closure_declarations() {
    /** @type {?} */
    FileInfo.prototype.type;
    /** @type {?} */
    FileInfo.prototype.displayName;
    /** @type {?} */
    FileInfo.prototype.icon;
    /** @type {?} */
    FileInfo.prototype.extensions;
}
var /** @type {?} */ fileInfos = [
    new FileInfo(FileType.ARCHIVE, 'archive', 'icon-file-archive-o', ['tar', 'jar', 'cpio', 'zip', 'zipx', 'iso', 'ar', 'gz',
        'gzip', 'bz2', 'apk', 'car', 'cab', 'dmg', 'rar', 'z']),
    new FileInfo(FileType.AUDIO, 'audio', 'icon-file-audio-o', ['au', 'aac', 'm4p', 'm4a', 'mp1', 'mp2', 'mp3', 'mpg',
        'mpeg', 'oga', 'ogg', 'wav', 'webm', 'wma']),
    new FileInfo(FileType.CODE, 'code', 'icon-file-code-o', ['js', 'css', 'asp', 'aspx', 'jsp', 'htm', 'html', 'php',
        'pl', 'asm', 'java', 'lib', 'o', 'scpt', 'vbs', 'cc', 'sql']),
    new FileInfo(FileType.IMAGE, 'image', 'icon-file-image-o', ['jpg', 'jpeg', 'tif', 'tiff', 'png', 'gif', 'bmp', 'ico', 'icon', 'pic']),
    new FileInfo(FileType.MS_WORD, 'ms-word', 'icon-file-word-o', ['doc', 'dot', 'docx', 'docm', 'dotm']),
    new FileInfo(FileType.MS_EXCEL, 'ms-excel', 'icon-file-excel-o', ['xls', 'xlt', 'xla', 'xlsx', 'xltx', 'xlsm', 'xltm', 'xlam', 'xlsb']),
    new FileInfo(FileType.MS_POWERPOINT, 'ms-powerpoint', 'icon-file-powerpoint-o', ['ppt', 'pot', 'pps', 'ppa', 'pptx', 'potx', 'ppsx', 'ppam', 'pptm', 'potm', 'ppsm']),
    new FileInfo(FileType.PDF, 'pdf', 'icon-file-pdf-o', ['pdf']),
    new FileInfo(FileType.TEXT, 'text', 'icon-file-text-o', ['txt', 'text', 'tex', 'log', 'cfg', 'csv']),
    new FileInfo(FileType.VIDEO, 'video', 'icon-file-video-o', ['mp4', 'm4v', 'mov', 'flv', 'm3u8', 'ts', '3gp', 'avi', 'wmv']),
];
var FileService = (function () {
    function FileService() {
        this.logService = new LogService();
    }
    /**
     * Retrieves information on a file extension
     * @param {?} extension The file extension to retrieve info on
     * @return {?} The file info
     */
    FileService.prototype.getFileInfo = /**
     * Retrieves information on a file extension
     * @param {?} extension The file extension to retrieve info on
     * @return {?} The file info
     */
    function (extension) {
        return fileInfos.find(function (fileInfo) {
            var /** @type {?} */ foundExtension = fileInfo.extensions
                .find(function (infoExtension) { return infoExtension === extension.toLowerCase(); });
            if (foundExtension) {
                return true;
            }
            return false;
        });
    };
    /**
     * @param {?} content
     * @param {?=} filename
     * @param {?=} mimeType
     * @return {?}
     */
    FileService.prototype.createFileAnchor = /**
     * @param {?} content
     * @param {?=} filename
     * @param {?=} mimeType
     * @return {?}
     */
    function (content, filename, mimeType) {
        if (filename === void 0) { filename = null; }
        if (mimeType === void 0) { mimeType = 'data:text/plain;charset=utf-8'; }
        try {
            var /** @type {?} */ anchor = document.createElement('a');
            anchor.id = 'downloadAnchor';
            anchor.href = filename ? this.encodeDataURI(content, mimeType)
                : mimeType + "," + encodeURIComponent(content);
            anchor.download = filename || undefined;
            document.body.appendChild(anchor);
            var /** @type {?} */ event_1 = document.createEvent('MouseEvents');
            event_1['initMouseEvent']('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            anchor.dispatchEvent(event_1);
            document.body.removeChild(anchor);
        }
        catch (/** @type {?} */ err) {
            this.logService.error(err);
        }
    };
    /**
     * Starts the downloading of content as a file
     * @param {?} content  A raw or base64 encoded string of file contents
     * @param {?} filename The name of the file to download
     * @param {?=} mimeType The mime type of the file
     * @return {?}
     */
    FileService.prototype.triggerDownload = /**
     * Starts the downloading of content as a file
     * @param {?} content  A raw or base64 encoded string of file contents
     * @param {?} filename The name of the file to download
     * @param {?=} mimeType The mime type of the file
     * @return {?}
     */
    function (content, filename, mimeType) {
        if (mimeType === void 0) { mimeType = 'data:text/plain;charset=utf-8'; }
        this.createFileAnchor(content, filename, mimeType);
    };
    /**
     * Opens file content in another tab
     * @param {?} content  A raw or base64 encoded string of file contents
     * @param {?=} mimeType The mime type of the file
     * @return {?}
     */
    FileService.prototype.triggerOpenFile = /**
     * Opens file content in another tab
     * @param {?} content  A raw or base64 encoded string of file contents
     * @param {?=} mimeType The mime type of the file
     * @return {?}
     */
    function (content, mimeType) {
        if (mimeType === void 0) { mimeType = 'data:text/plain;charset=utf-8'; }
        this.createFileAnchor(content, null, mimeType);
    };
    /**
     * Encodes a string to base64
     * @param {?} data The string to encode
     * @return {?} The encoded string
     */
    FileService.prototype.encodeBase64 = /**
     * Encodes a string to base64
     * @param {?} data The string to encode
     * @return {?} The encoded string
     */
    function (data) {
        try {
            return window.btoa(window['unescape'](window['encodeURIComponent'](data)));
        }
        catch (/** @type {?} */ err) {
            this.logService.error(err);
            return data;
        }
    };
    /**
     * Decodes a base64 string
     * @param {?} data The string to decode
     * @return {?} The decoded string
     */
    FileService.prototype.decodeBase64 = /**
     * Decodes a base64 string
     * @param {?} data The string to decode
     * @return {?} The decoded string
     */
    function (data) {
        try {
            return window.atob(data);
        }
        catch (/** @type {?} */ err) {
            this.logService.error(err);
            return data;
        }
    };
    /**
     * Endodes data for opening in a new window or tab
     * @param {?} data     The file data
     * @param {?=} mimeType The mime type of the file
     * @return {?} The data URI string
     */
    FileService.prototype.encodeDataURI = /**
     * Endodes data for opening in a new window or tab
     * @param {?} data     The file data
     * @param {?=} mimeType The mime type of the file
     * @return {?} The data URI string
     */
    function (data, mimeType) {
        if (mimeType === void 0) { mimeType = 'data:text/plain;charset=utf-8'; }
        return mimeType + ";base64," + this.encodeBase64(data);
    };
    FileService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FileService.ctorParameters = function () { return []; };
    return FileService;
}());
export { FileService };
function FileService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FileService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FileService.ctorParameters;
    /** @type {?} */
    FileService.prototype.logService;
}
//# sourceMappingURL=file.service.js.map