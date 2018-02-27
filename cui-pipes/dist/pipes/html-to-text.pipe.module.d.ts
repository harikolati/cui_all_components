/**
 * @angular
 */
import { PipeTransform } from '@angular/core';
export declare class HtmlToTextPipe implements PipeTransform {
    /**
     * Removes HTML markup from a string
     * @param   text The HTML text
     * @returns The stripped text
     */
    transform(text: string): string;
}
export declare class HtmlToTextPipeModule {
}
