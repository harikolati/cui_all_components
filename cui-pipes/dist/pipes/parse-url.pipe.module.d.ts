/**
 * @angular
 */
import { PipeTransform } from '@angular/core';
export declare class ParseUrlPipe implements PipeTransform {
    /**
     * Converts text with URLs to anchor tags
     * @param   _text      The text containing URLs
     * @param   [target]  The target for the anchors
     * @param   [shorten] Whether to shorten the URL
     * @returns The reformatted text
     */
    transform(_text: string, target?: string, shorten?: boolean): string;
    shortenUrl(url: string): string;
}
export declare class ParseUrlPipeModule {
}
