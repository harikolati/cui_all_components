import { EventEmitter } from '@angular/core';
export declare class CuiSortComponent {
    /**
     * Options object for cui-sort
     */
    option: any;
    id: string;
    sortDirection: string;
    options: any;
    optionsLabel: string;
    optionsValue: string;
    sortbyID: string;
    optionSelected: any;
    toggleSortDirUpdate: EventEmitter<{}>;
    optionChange: EventEmitter<{}>;
    toggleSortDir(): void;
}
