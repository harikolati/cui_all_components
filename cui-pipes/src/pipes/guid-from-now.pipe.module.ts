/**
 * @angular
 */
import { NgModule, Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';
import { FromNow } from './from-now.class';

@Pipe({
	name: 'guidFromNow',
})
export class GuidFromNowPipe implements PipeTransform {
	fromNow: FromNow = new FromNow(this.changeDetectorRef, this.ngZone);
	constructor(private changeDetectorRef?: ChangeDetectorRef, private ngZone?: NgZone) {}
	/**
	 * Retrieves the time from now that a MongoDB object was created
	 * @param   value The _id property from the Mongo object
	 * @returns The time from now
	 */
	transform (value: string) {
		const timestamp: string = value.substring(0, 8);

		return this.fromNow.generate(parseInt(timestamp, 16) * 1000);
	}
	ngOnDestroy (): void {
		this.fromNow.removeTimer();
	}
}

@NgModule({
	declarations: [GuidFromNowPipe],
	exports: [GuidFromNowPipe],
	providers: [GuidFromNowPipe],
})

export class GuidFromNowPipeModule {}
