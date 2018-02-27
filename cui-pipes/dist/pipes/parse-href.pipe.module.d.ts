/**
 * @angular
 */
import { PipeTransform } from '@angular/core';
export declare class ParseHrefPipe implements PipeTransform {
    /**
     * Adds or removes a target from anchor tags
     * @param   _text     The text containing anchor tags
     * @param   [target] The target for the anchor
     * @returns The reformatted text
     */
    transform(_text: string, target?: string): string;
}
export declare class ParseHrefPipeModule {
}
