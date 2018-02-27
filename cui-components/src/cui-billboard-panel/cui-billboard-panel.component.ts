/**
 * CUI DASHBOARD COMPONENT
 * USAGE:
 * <cui-dashboard
 *   [count]="list.length"
 *   link-to="https://optional-link-url/"
 *   panel-styles="indigo hover"
 *   show-billboard="true|false"
 *   title="TitleString"
 *   flipped="true|false"
 * >
 *   ** Your Content HERE **
 * </cui-dashboard>
 */

import {
	Component,
	Input,
	OnInit,
	OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BreakpointsService, BreakpointEvent } from '@cisco-ngx/cui-services';

@Component({
	selector: 'cui-billboard-panel',
	templateUrl: './cui-billboard-panel.component.html',
})

export class CuiBillboardPanelComponent implements OnInit, OnDestroy {
	flipped: boolean; // public to make element testable
	panelClass = 'panel--indigo'; // public to make element testable
	private billboardClass: string;
	private breakpoint: string;
	private breakPointSubscription: Subscription;

	@Input('count') count = 0;
	@Input('link-to') linkTo?: string;
	@Input('show-billboard') showBillboard = true;
	@Input('title') title = '';
	@Input('panel-styles')
		set setPanelClasses (panelStyle: PanelStyle) {
			this.panelClass = this.panelClasses(panelStyle);
		}
	@Input('flipped')
		set direction (flip: boolean | 'true' | 'false') {
			this.flipped = flip === 'true' ? true : false;
		}

	constructor (private breakpointService: BreakpointsService) {}

	ngOnInit () {
		this.breakPointSubscription = this.getBreakPoint();
		this.billboardClass = this.billboardClasses(this.breakpoint, this.flipped);
	}

	ngOnDestroy () {
		this.breakPointSubscription.unsubscribe();
	}

	panelClasses (classList: string = '') {
		return classList.split(' ')
		.reduce((cur, acc) => `${cur} panel--${acc}`, '');
	}

	billboardClasses (breakpoint: string, flipped: any): string {
		const direction = flipped ? 'left' : 'right';

		return breakpoint !== 'xs' ?
			`panel--bordered-${direction} base-padding-${direction}` :
			'';
	}

	private getBreakPoint () {
		return this.breakpointService.changes.subscribe(
			(breakpoint: BreakpointEvent) => {
				this.breakpoint = breakpoint.name;
				this.billboardClass = this.billboardClasses(breakpoint.name, this.flipped);
			},
			(err: any) => console.log(err),
		);
	}
}

// Does not add meaningful type safety
// For Documentation Uses only
export type PanelStyle = 'blue' |
	'danger' |
	'dkblue' |
	'dkgray' |
	'fluid' |
	'gray-ghost' |
	'hover' |
	'indigo' |
	'info' |
	'ltgray' |
	'mdgray' |
	'raised' |
	'raised-medium' |
	'raised-large' |
	'success' |
	'warning' |
	'well';
