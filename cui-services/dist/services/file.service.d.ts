import { LogService } from './log.service';
/**
 * Enumeration of available file types
 */
export declare enum FileType {
    ARCHIVE = 0,
    AUDIO = 1,
    CODE = 2,
    IMAGE = 3,
    MS_WORD = 4,
    MS_EXCEL = 5,
    MS_POWERPOINT = 6,
    PDF = 7,
    TEXT = 8,
    VIDEO = 9,
}
export declare class FileInfo {
    type: number;
    displayName: string;
    icon: string;
    extensions: string[];
    constructor(type: number, displayName: string, icon: string, extensions: string[]);
}
export declare class FileService {
    logService: LogService;
    constructor();
    /**
     * Retrieves information on a file extension
     * @param   extension The file extension to retrieve info on
     * @returns The file info
     */
    getFileInfo(extension: string): FileInfo;
    private createFileAnchor(content, filename?, mimeType?);
    /**
     * Starts the downloading of content as a file
     * @param   content  A raw or base64 encoded string of file contents
     * @param   filename The name of the file to download
     * @param   mimeType The mime type of the file
     */
    triggerDownload(content: string, filename: string, mimeType?: string): void;
    /**
     * Opens file content in another tab
     * @param   content  A raw or base64 encoded string of file contents
     * @param   mimeType The mime type of the file
     */
    triggerOpenFile(content: string, mimeType?: string): void;
    /**
     * Encodes a string to base64
     * @param   data The string to encode
     * @returns The encoded string
     */
    encodeBase64(data: string): string;
    /**
     * Decodes a base64 string
     * @param   data The string to decode
     * @returns The decoded string
     */
    decodeBase64(data: string): string;
    /**
     * Endodes data for opening in a new window or tab
     * @param   data     The file data
     * @param   mimeType The mime type of the file
     * @returns The data URI string
     */
    encodeDataURI(data: string, mimeType?: string): string;
}
