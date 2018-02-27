import { NgZone, ChangeDetectorRef } from '@angular/core';

export class FromNow {
	private timer: number;
	constructor (private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {}
	generate (value: any) {
		this.removeTimer();
		const d = new Date(value);
		const now = new Date();
		const seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
		const timeToUpdate = this.getSecondsUntilUpdate(seconds) * 1000;
		if (this.ngZone && this.changeDetectorRef) {
			this.timer = this.ngZone.runOutsideAngular(() => {
				if (typeof window !== 'undefined') {
					return window.setTimeout(() => {
						this.ngZone.run(() => this.changeDetectorRef.markForCheck());
					}, timeToUpdate);
				}

				return null;
			});
		}
		const minutes = Math.round(Math.abs(seconds / 60));
		const hours = Math.round(Math.abs(minutes / 60));
		const days = Math.round(Math.abs(hours / 24));
		const months = Math.round(Math.abs(days / 30.416));
		const years = Math.round(Math.abs(days / 365));
		if (!value || isNaN(d.valueOf())) {
			return 'never';
		}
		if (seconds <= 45) {
			return 'a few seconds ago';
		}
		if (seconds <= 90) {
			return 'a minute ago';
		}
		if (minutes <= 45) {
			return `${minutes} minutes ago`;
		}
		if (minutes <= 90) {
			return 'an hour ago';
		}
		if (hours <= 22) {
			return `${hours} hours ago`;
		}
		if (hours <= 36) {
			return 'a day ago';
		}
		if (days <= 25) {
			return `${days} days ago`;
		}
		if (days <= 45) {
			return 'a month ago';
		}
		if (days <= 345) {
			return `${months} months ago`;
		}
		if (days <= 545) {
			return 'a year ago';
		}

		// (days > 545)
		return `${years} years ago`;
	}

	public removeTimer () {
		if (this.timer) {
			window.clearTimeout(this.timer);
			this.timer = null;
		}
	}

	private getSecondsUntilUpdate (seconds: number) {
		const min = 60;
		const hr = min * 60;
		const day = hr * 24;
		if (seconds < min) { // less than 1 min, update ever 2 secs
			return 2;
		}
		if (seconds < hr) { // less than an hour, update every 30 secs
			return 30;
		}
		if (seconds < day) { // less then a day, update every 5 mins
			return 300;
		}

		return 3600;
	}
}
