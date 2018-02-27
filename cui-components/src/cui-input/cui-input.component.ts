import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	Output,
	ViewChild,
	forwardRef,
} from '@angular/core';
import { Guid } from '@cisco-ngx/cui-utils';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
	CuiInputOptions,
	CuiInputValidation,
} from './cui-input-options';

/**
 * Component for a form input using CiscoUI
 */
@Component({
	selector: 'cui-input',
	templateUrl: './cui-input.component.html',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CuiInputComponent),
			multi: true,
		},
	],
})
export class CuiInputComponent implements AfterViewInit, ControlValueAccessor {
	/**
	 * The value recorded in the input
	 * @Deprecated use ngModel
	 */
	@Input() model: any;
	/**
	 * The type of input (text, textarea, number, switch,
	 * email, password, tel, date, month, week, time)
	 */
	@Input() type = 'text';

	/**
	 * The label to display next to the input
	 */
	@Input() label: string;

	/**
	 * Optional validation options
	 */
	@Input() options: CuiInputOptions = new CuiInputOptions({});

	/**
	 * Available choices for a radio input or checkboxes (name, value)
	 */
	@Input() items: any[] = [];

	/**
	 * Event emitted when the input's value is changed
	 * @Deprecated use ngModelChange
	 */
	@Output() modelChange: EventEmitter<any> = new EventEmitter();

	/**
	 * GUID for the input's id attribute
	 */
	guid: string = Guid.generate();

	error: number;
	errorMessage: string;
	maxLengthString = '';

	@ViewChild('inputFocus') inputElement: any;

	propagateChange: Function = (_: any) => {};
	writeValue (value: any) {
		this.model = value;
	}
	registerOnChange (fn: Function) {
		this.propagateChange = fn;
	}
	registerOnTouched () {}

	ngAfterViewInit () {
		if (this.options.autofocus) {
			this.inputElement.focus();
		}
	}

	/**
	 * Internal onChange function for the input
	 */
	onChange () {
		if (this.type === 'checkbox') {
			this.model = this.items.filter(item => item['selected']).map(item => item ['value']);
		}

		this.error = CuiInputValidation.validate(this.options, this.model);
		this.errorMessage = this.error ? this.getErrorMessage() : null;
		if (this.options && this.model && this.options.maxLength) {
			this.maxLengthString = `${this.model.length} / ${this.options.maxLength}`;
		}

		this.propagateChange(this.model);
		this.modelChange.emit(this.model);
	}

	hasError (error: number) {
		return this.error = error;
	}

	getErrorMessage () {
		switch (this.type) {
		case 'text':
		case 'textarea':
		case 'email':
		case 'tel':
		case 'password':
			break;
		default:
			return;
		}

		const errorMessage: any =
			this.options.errorMessages.find(error => error.type === this.error);

		if (!errorMessage) {
			return null;
		}

		return typeof errorMessage.message === 'function' ?
			errorMessage.message() : errorMessage.message;
	}
}
