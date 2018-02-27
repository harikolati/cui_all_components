/**
 * @angular
 */
import { PipeTransform } from '@angular/core';
export declare class ProperCasePipe implements PipeTransform {
    /**
     * Converts text to proper case (first letter of each word capitalized)
     * @param   text The text to convert
     * @returns The converted text
     */
    transform(text: string): any;
}
export declare class ProperCasePipeModule {
}
