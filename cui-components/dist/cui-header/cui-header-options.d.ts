export declare class CuiHeaderOptions {
    /**
     * Index signature
     */
    [key: string]: any;
    /**
     * Main title of the header
     */
    title: String;
    /**
     * Whether to show a branding logo in the left of the header
     */
    showBrandingLogo: Boolean;
    /**
     * URL to redirect to when the branding logo is clicked
     */
    brandingLink: String;
    /**
     * Optional image URL for the branding logo (default is Cisco logo)
     */
    brandingImage: String;
    /**
     * Optional title to display when hovering over the branding logo
     */
    brandingTitle: String;
    /**
     * Array of breadcrumb info objects {label, url}
     */
    breadcrumbs: any[];
    /**
     * Array of main navigation info objects {label, url, active}
     */
    primaryNav: CuiPrimaryNavOption[];
    /**
     * Array of utility navigation info objects {icon, [url], [onClick()]}
     */
    secondaryNav: CuiSecondaryNavOption[];
    /**
     * Optional array of mobile navigation info objects (defaults to primary nav)
     */
    mobileNav: CuiPrimaryNavOption[];
    /**
     * Whether to show the mobile nav when on mobile
     */
    showMobileNav: Boolean;
    /**
     * Optional usernam to display in the right of the header
     */
    username: String;
    /**
     * Array of toolbar buttons to display in the right of
     * the navbar {icon, onClick(), [color], [subtext]}
     */
    toolbarButtons: CuiToolbarButtonOption[];
    /**
     * Whether to display a menu toggle button.
     */
    menuToggleButton: boolean;
    constructor(options: any);
    createPrimaryNav(navOptions: any[]): void;
    createSecondaryNav(navOptions: any[]): void;
    createMobileNav(navOptions: any[]): void;
    createToolbarButtons(options: any[]): void;
}
export declare class CuiPrimaryNavOption {
    /**
     * Index signature
     */
    [key: string]: any;
    label: String;
    url: String;
    active: Boolean;
    onClick: Function;
    constructor(options: any);
}
export declare class CuiSecondaryNavOption {
    /**
     * Index signature
     */
    [key: string]: any;
    icon: String;
    url: String;
    onClick: Function;
    constructor(options: any);
}
export declare class CuiToolbarButtonOption {
    /**
     * Index signature
     */
    [key: string]: any;
    icon: String;
    color: String;
    subtext: String;
    onClick: Function;
    constructor(options: any);
}
