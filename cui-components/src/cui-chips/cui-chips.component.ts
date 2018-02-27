import {
	AfterViewInit,
	Component,
	ElementRef,
	forwardRef,
	Input,
	Renderer2,
	ViewChild,
} from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	Validator,
} from '@angular/forms';
import { castArray } from 'lodash-es';
const ENTER = 'Enter';

@Component({
	selector: 'cui-chips',
	templateUrl: './cui-chips.component.html',
	styleUrls: ['./cui-chips.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CuiChipsComponent),
			multi: true,
		},
		{
			provide: NG_VALIDATORS,
			useExisting: forwardRef(() => CuiChipsComponent),
			multi: true,
		},
	],
})
export class CuiChipsComponent implements AfterViewInit, ControlValueAccessor, Validator {
	@Input() label: string;
	@Input() required: boolean;
	@Input() max = Number.MAX_VALUE;
	@Input() placeholder = '';
	@Input() allowDuplicates = true;
	@ViewChild('input') inputRef: ElementRef;
	inputText = '';
	chips: string[] = [];
	dupDisable = false;
	propagateChange: Function = (_: any) => {};
	constructor (private renderer: Renderer2) {}

	registerOnTouched () {}
	registerOnChange (fn: Function) {
		this.propagateChange = fn;
	}
	writeValue (value: string[]) {
		this.chips = castArray(value);
	}
	validate (): any {
		return this.required && !this.chips.length ? {
			requiredError: { valid: false },
		} : null;
	}

	onAdd () {
		if (
			this.inputText !== '' &&
			this.chips.length < this.max &&
			// fulfill option to restrict duplicate occurrences
			(this.allowDuplicates || !this.hasDups())
		) {
			this.chips.push(this.inputText);
			this.propagateChange(this.chips);
			this.inputText = '';
			this.checkValidity();
			// keep input focused after clicking Add button
			this.inputRef.nativeElement.focus();
		}
	}

	ngAfterViewInit () {
		this.renderer.listen(this.inputRef.nativeElement, 'keypress', (event: KeyboardEvent) => {
			if (event.key === ENTER) {
				this.onAdd();
			}
		});
		this.renderer.listen(this.inputRef.nativeElement, 'blur', this.checkValidity.bind(this));
	}

	onLabelsChange () {
		this.checkValidity();
		this.propagateChange(this.chips);
	}

	onInputTextChange () {
		if (!this.allowDuplicates) {
			this.dupDisable = this.hasDups();
		}
	}

	checkValidity () {
		if (!this.chips.length && this.required) {
			this.renderer.addClass(this.inputRef.nativeElement, 'ng-invalid');
		} else {
			this.renderer.removeClass(this.inputRef.nativeElement, 'ng-invalid');
		}
	}

	hasDups (): boolean {
		return this.chips.includes(this.inputText);
	}
}
