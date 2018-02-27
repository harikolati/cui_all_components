import { EventEmitter, OnInit } from '@angular/core';
export declare class CuiDrawersComponent implements OnInit {
    /**
     * Text to display at the top of the drawer group
     */
    label: string;
    /**
     * Array of drawer components in the group
     */
    drawers: any[];
    drawersChange: EventEmitter<{}>;
    /**
     * Optional alt background for the group header (1)
     */
    alt: number;
    /**
     * Whether to toggle carets from right (collapsed) to down (expanded)
     */
    rightToDown: boolean;
    /**
     * Whether to start with all drawers expanded
     */
    expanded: boolean;
    /**
     * Whether to allow clicking the header to expand/collapse all drawers
     */
    allowExpandAll: boolean;
    /**
     * Whether to put the caret on the left side of the drawer
     */
    caretLeft: boolean;
    /**
     * Whether to use content projection or normal input fields
     */
    projection: boolean;
    /**
     * Generated class string for the header background
     */
    colorClass: string;
    ngOnInit(): void;
    /**
     * Toggles all drawers open/closed
     */
    toggleAllExpanded(): void;
}
