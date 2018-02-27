export class CuiHeaderOptions {
	/**
	 * Index signature
	 */
	[key: string]: any;
	/**
	 * Main title of the header
	 */
	public title: String;
	/**
	 * Whether to show a branding logo in the left of the header
	 */
	public showBrandingLogo: Boolean = true;
	/**
	 * URL to redirect to when the branding logo is clicked
	 */
	public brandingLink: String = '#';
	/**
	 * Optional image URL for the branding logo (default is Cisco logo)
	 */
	public brandingImage: String;
	/**
	 * Optional title to display when hovering over the branding logo
	 */
	public brandingTitle: String = '';
	/**
	 * Array of breadcrumb info objects {label, url}
	 */
	public breadcrumbs: any[];
	/**
	 * Array of main navigation info objects {label, url, active}
	 */
	public primaryNav: CuiPrimaryNavOption[];
	/**
	 * Array of utility navigation info objects {icon, [url], [onClick()]}
	 */
	public secondaryNav: CuiSecondaryNavOption[];
	/**
	 * Optional array of mobile navigation info objects (defaults to primary nav)
	 */
	public mobileNav: CuiPrimaryNavOption[];
	/**
	 * Whether to show the mobile nav when on mobile
	 */
	public showMobileNav: Boolean = true;
	/**
	 * Optional usernam to display in the right of the header
	 */
	public username: String;
	/**
	 * Array of toolbar buttons to display in the right of
	 * the navbar {icon, onClick(), [color], [subtext]}
	 */
	public toolbarButtons: CuiToolbarButtonOption[];
	/**
	 * Whether to display a menu toggle button.
	 */
	public menuToggleButton: boolean;

	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				if (key === 'primaryNav') {
					this.createPrimaryNav(options[key]);
					continue;
				}
				if (key === 'secondaryNav') {
					this.createSecondaryNav(options[key]);
					continue;
				}
				if (key === 'mobileNav') {
					this.createMobileNav(options[key]);
					continue;
				}
				if (key === 'toolbarButtons') {
					this.createToolbarButtons(options[key]);
					continue;
				}

				this[key] = options[key];
			}
		}
	}

	public createPrimaryNav (navOptions: any[]) {
		const primaryNav = [];
		for (const item of navOptions) {
			primaryNav.push(new CuiPrimaryNavOption(item));
		}

		this.primaryNav = primaryNav;
	}

	public createSecondaryNav (navOptions: any[]) {
		const secondaryNav = [];
		for (const item of navOptions) {
			secondaryNav.push(new CuiSecondaryNavOption(item));
		}

		this.secondaryNav = secondaryNav;
	}

	public createMobileNav (navOptions: any[]) {
		const mobileNav = [];
		for (const item of navOptions) {
			mobileNav.push(new CuiPrimaryNavOption(item));
		}

		this.mobileNav = mobileNav;
	}

	public createToolbarButtons (options: any[]) {
		const toolbarButtons = [];
		for (const item of options) {
			toolbarButtons.push(new CuiToolbarButtonOption(item));
		}

		this.toolbarButtons = toolbarButtons;
	}
}

export class CuiPrimaryNavOption {
	/**
	 * Index signature
	 */
	[key: string]: any;
	public label: String;
	public url: String;
	public active: Boolean = false;
	public onClick: Function;

	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				this[key] = options[key];
			}
		}
		if (!this.onClick) {
			this.onClick = function() {};
		}
	}
}

export class CuiSecondaryNavOption {
	/**
	 * Index signature
	 */
	[key: string]: any;
	public icon: String;
	public url: String;
	public onClick: Function;

	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				this[key] = options[key];
			}
		}
		if (!this.onClick) {
			this.onClick = function() {};
		}
	}
}

export class CuiToolbarButtonOption {
	/**
	 * Index signature
	 */
	[key: string]: any;
	public icon: String;
	public color: String;
	public subtext: String;
	public onClick: Function;

	constructor(options: any) {
		for (const key in options) {
			if (options.hasOwnProperty(key)) {
				this[key] = options[key];
			}
		}
		if (!this.onClick) {
			this.onClick = function() {};
		}
	}
}
