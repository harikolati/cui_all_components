import {
	Component,
	Input,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { CuiAlertService } from './cui-alert.service';
import { get, assignIn, defaultTo } from 'lodash-es';

@Component({
	selector: 'cui-alert',
	templateUrl: './cui-alert.component.html',
})
/**
 * Component for an alert box
 * <cui-alert [(options)]="alert"></cui-alert>
 * public alert: any;
 * this.alert.show(msg, severity);
 * this.alert.hide();
 */
export class CuiAlertComponent implements OnInit, OnDestroy {

	constructor (private alertService: CuiAlertService) {}

	/**
	 * Options object for cui-alert
	 */
	@Input() options: any = {};

	/**
	 * Whether to listen for global alerts from the alert service
	 */
	@Input() global = false;

	public alert: any = {
		msg: '',
		severity: 'info',
		visible: false,
	};

	private alertSubscribe: Subscription =
		this.alertService.getNextAlert()
		.subscribe((alert: any) => {
			if (this.global) {
				this.options.show(alert.msg, alert.severity);
			}
		});

	/**
	 * Returns the color class string for the alert
	 * @returns The color class string
	 */
	public getColorClass (): string {
		const alt = get(this.options, 'alt', 0);
		let altClass = '';
		switch (alt) {
		case 1: altClass = '-alt'; break;
		case 2: altClass = '-alt2'; break;
		default: altClass = ''; break;
		}

		switch (this.alert.severity) {
		case 'success':
			return `alert--success${altClass}`;
		case 'warning':
			return `alert--warning${altClass}`;
		case 'danger':
			return `alert--danger${altClass}`;
		default:
			return `alert--info${altClass}`;
		}
	}

	/**
	 * Returns the class string for the alert's icon
	 * @returns The icon string
	 */
	public getIconClass () {
 		switch (this.alert.severity) {
 		case 'success':
 			return 'icon-check';
 		case 'warning':
 			return 'icon-exclamation-triangle';
 		case 'danger':
 			return 'icon-error';
 		default:
 			return 'icon-info-circle';
 		}
 	}

	ngOnInit () {
		this.options = assignIn(
			this.options,
			{
				show: (msg: string, severity: string) => {
					this.alert.message = msg;
					this.alert.severity = severity;
					this.alert.visible = true;
				},
				hide: () => {
					this.alert.visible = false;
				},
			});

		this.options.alt = defaultTo(this.options.alt, 0);
		this.options.closeButton = defaultTo(this.options.closeButton, true);
	}

	ngOnDestroy () {
		this.alertSubscribe.unsubscribe();
	}
}
