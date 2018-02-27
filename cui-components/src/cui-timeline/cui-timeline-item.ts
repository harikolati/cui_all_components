import { TemplateRef, Injectable, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FromNowPipe } from '@cisco-ngx/cui-pipes';
import { assignIn } from 'lodash-es';

/**
 * Default timeline time formats.
 */
export enum CuiTimelineTimeFormat {
	FROM_NOW,
	DATE,
	DATETIME,
}

export class CuiTimelineItem {
	/**
	 * The date of the timeline item.
	 */
	public time: Date;
	/**
	 * A MongoDB GUID to parse time from.
	 */
	public guid: string;
	/**
	 * The format with which to display the time.
	 */
	public timeFormat: any = CuiTimelineTimeFormat.FROM_NOW;
	/**
	 * The formatted time string for display.
	 */
	public formattedTime: string;
	/**
	 * The color for the timeline icon (default, info, success, warning, danger)
	 */
	public color = 'default';
	/**
	 * The generated color class for the icon.
	 */
	public colorClass: string;
	/**
	 * Static content for the timeline item.
	 */
	public content: string;
	/**
	 * TemplateRef for the timeline item content.
	 */
	public template: TemplateRef<any>;
	/**
	 * Data to be used for the timeline item template.
	 */
	public data: any;

	constructor (options: any) {
		try {
			assignIn(this, options);
		} catch (err) {}

		if (this.guid) {
			this.time = this.getGuidTime();
		} else if (!this.time) {
			this.time = new Date();
		}
		this.formatTime();
		this.setColorClass();
	}

	/**
	 * Generates the formattedTime string.
	 */
	formatTime () {
		const nav: any = navigator;
		const datePipe = new DatePipe(nav.userLanguage || nav.language || nav.browserLanguage || nav.systemLanguage);
		switch (this.timeFormat) {
		case CuiTimelineTimeFormat.FROM_NOW:
			const fromNowPipe: FromNowPipe = new FromNowPipe();
			this.formattedTime = fromNowPipe.transform(this.time);
			break;
		case CuiTimelineTimeFormat.DATE:
			this.formattedTime = datePipe.transform(this.time, 'MM/dd/yyyy');
			break;
		case CuiTimelineTimeFormat.DATETIME:
			this.formattedTime = datePipe.transform(this.time, 'MM/dd/yyyy hh:mm:ss');
			break;
		default:
			this.formattedTime = datePipe.transform(this.time, this.timeFormat);
			break;
		}
	}

	/**
	 * Generates the color class string.
	 */
	setColorClass () {
		if (this.color === 'default') {
			this.colorClass = '';
		} else {
			this.colorClass = `timeline--${this.color}`;
		}
	}

	/**
	 * Returns a date object from a MongoDB GUID.
	 * @returns The date the Mongo object was created.
	 */
	getGuidTime () {
		const timestamp: string = this.guid.substring(0, 8);

		return new Date(parseInt(timestamp, 16) * 1000);
	}
}
