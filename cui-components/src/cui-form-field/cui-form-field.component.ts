import { Component, ContentChild, Input, AfterContentInit, OnDestroy } from '@angular/core';
import { CuiInputDirective } from './cui-input.directive';
import { Subscription } from 'rxjs/Subscription';
import { get, invoke } from 'lodash-es';

@Component({
	selector: 'cui-form-field',
	templateUrl: './cui-form-field.component.html',
	styleUrls: ['./cui-form-field.component.scss'],
})
export class CuiFormFieldComponent implements AfterContentInit, OnDestroy {

	@ContentChild(CuiInputDirective) input: CuiInputDirective;
	@Input() label: string;
	maxlength: number;
	required = false;
	model = '';
	changesSub: Subscription;
	statusChangeSub: Subscription;
	hasError: boolean;
	constructor() { }

	ngAfterContentInit () {
		this.refresh();
		if (this.input) {
			this.changesSub = this.input.onChanges.subscribe(this.refresh.bind(this));
			this.initFormSubs();
		}
	}

	initFormSubs () {
		if (get(this, 'input.control')) {
			this.statusChangeSub = this.input.control.statusChanges.subscribe(
				this.onStatusChange.bind(this),
			);
		}
	}

	refresh (input?: CuiInputDirective) {
		this.maxlength = get(this, 'input.maxlength');
		if (input) {
			this.input = input;
			this.required = input.required;
			this.model = get(this, 'input.ngModel', '');
		} else {
			this.required = get(this, 'input.required');
		}
		if (get(this, 'input.control')) {
			invoke(this, 'statusChangeSub.unsubscribe');
			this.initFormSubs();
		}
	}

	onStatusChange (change: string) {
		this.setError(change === 'VALID');
	}

	setError (valid: boolean) {
		if (!valid) {
			this.hasError = true;
		} else {
			this.hasError = false;
		}
	}

	ngOnDestroy () {
		invoke(this, 'changesSub.unsubscribe');
		invoke(this, 'statusChangeSub.unsubscribe');
	}

}
