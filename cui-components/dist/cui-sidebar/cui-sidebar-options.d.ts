/**
 * Options object for the CuiSidebarComponent
 */
export declare class CuiSidebarOptions {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * Optional title for the sidebar.
     */
    title: string;
    /**
     * Optional toolbar buttons.
     */
    toolbarButtons: any[];
    /**
     * The main sidebar drawers and items.
     * A single item has properties: title:string, [icon]:string, [url]:string, [onClick]:function.
     * A drawer has properties: title:string, [icon]:string, items:Array(single item).
     */
    items: any[];
    constructor(options?: any);
}
