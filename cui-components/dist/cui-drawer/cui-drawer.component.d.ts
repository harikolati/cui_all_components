export declare class CuiDrawerComponent {
    /**
     * Text to display in the drawer header
     */
    label: string;
    /**
     * Content to display when the drawer is expanded
     */
    content: string;
    /**
     * Whether to toggle carets from right (collapsed) to down (expanded)
     */
    rightToDown: boolean;
    /**
     * Whether to start with the drawer expanded
     */
    expanded: boolean;
    /**
     * Whether to put the caret on the left side of the drawer
     */
    caretLeft: boolean;
    /**
     * Whether to use content projection or normal input fields
     */
    projection: boolean;
    /**
     * Custom class to apply to panel div
     */
    panelClass: string;
    /**
     * Whether to allow the drawer to be expanded
     */
    allowExpand: boolean;
    /**
     * Toggles the drawer open/closed
     */
    toggleExpanded(): void;
}
