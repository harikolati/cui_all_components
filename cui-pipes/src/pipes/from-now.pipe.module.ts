import {
	NgModule,
	Pipe,
	PipeTransform,
	NgZone,
	ChangeDetectorRef,
	OnDestroy,
} from '@angular/core';
import { FromNow } from './from-now.class';

@Pipe({
	name: 'fromNow',
	pure: false,
})
export class FromNowPipe implements PipeTransform, OnDestroy {
	fromNow: FromNow = new FromNow(this.changeDetectorRef, this.ngZone);
	constructor(private changeDetectorRef?: ChangeDetectorRef, private ngZone?: NgZone) {}
	transform (value: any, unix?: boolean) {
		return this.fromNow.generate(unix && typeof value === 'number' ? value * 1000 : value);
	}
	ngOnDestroy (): void {
		this.fromNow.removeTimer();
	}
}

@NgModule({
	declarations: [FromNowPipe],
	exports: [FromNowPipe],
	providers: [FromNowPipe],
})

export class FromNowPipeModule {}
