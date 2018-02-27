/**
 * @angular
 */
import { PipeTransform } from '@angular/core';
export declare class FileSizePipe implements PipeTransform {
    /**
     * Returns a readable file size from bytes
     * @param  _size The file size in bytes
     * @returns The readable file size
     */
    transform(_size: number): string;
}
export declare class FileSizePipeModule {
}
