import { Component, Input, OnInit, OnChanges, ElementRef } from '@angular/core';

@Component({
	selector: 'cui-dropdown',
	templateUrl: './cui-dropdown.component.html',
	host: {
		'(document:click)': 'doBlur($event)'
	},
})
/**
 * Component for a guage element
 */
export class CuiDropdownComponent implements OnInit, OnChanges {
	/**
	 * The percent to show in the gauge
	 */
	@Input() label: string;
	/**
	 * The type of button (default, primary, secondary, white, negative, success)
	 */
	@Input() type = 'default';
	/**
	 * Whether the button is small
	 */
	@Input() small = false;
	/**
	 * Whether the button is wide
	 */
	@Input() wide = false;
	/**
	 * Optional alternate value to show in the center of the gauge
	 */
	@Input() actions: any[] = [];

	active = false;
	colorClass = '';
	sizeClass = '';

	constructor(private elementRef: ElementRef) {}

	ngOnInit () {
		this.formatActions();
		this.setClassStrings();
	}

	ngOnChanges () {
		this.formatActions();
		this.setClassStrings();
	}

	public doBlur (event: MouseEvent) {
		if (!this.elementRef.nativeElement.contains(event.target)) {
			this.active = false;
		}
	}

	private setClassStrings () {
		this.colorClass = this.type === 'default' ? '' : `btn--${this.type}`;
		this.sizeClass = `${this.small ? 'btn--small' : ''} ${this.wide ? 'btn--wide' : ''}`;
	}

	private formatActions () {
		if (this.actions[0] && !Array.isArray(this.actions[0])) {
			this.actions = [this.actions];
		}
	}
}
