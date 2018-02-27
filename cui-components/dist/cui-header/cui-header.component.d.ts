import { EventEmitter, OnInit } from '@angular/core';
import { CuiHeaderOptions } from './cui-header-options';
export declare class CuiHeaderComponent implements OnInit {
    options: CuiHeaderOptions;
    menuToggleClicked: EventEmitter<any>;
    /**
     * Whether a mobile overflow navigation menu is expanded
     */
    overflowExpanded: boolean;
    ngOnInit(): void;
    /**
     * Returns the proper color class for a toolbar button
     * @param button The button object
     * @returns The button color class string
     */
    getToolbarButtonClass(button: any): String;
    /**
     * Toggles the mobile overflow menu open/closed
     */
    toggleOverflow(): void;
    private getMobileTabsForDisplay(overflowTabs);
    private overflowTabIsActive();
    onMenuButtonClicked(event: Event): void;
}
