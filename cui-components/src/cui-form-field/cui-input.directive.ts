import {
	AfterContentChecked,
	Directive,
	ElementRef,
	EventEmitter,
	Host,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Optional,
	SkipSelf,
	Renderer2,
} from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';

@Directive({
	selector: 'input[cuiInput], textarea[cuiInput]',
	exportAs: 'cuiInput',
	host: {
		'[attr.id]': 'id',
		'[attr.maxlength]': 'maxlength',
		'[placeholder]': 'placeholder',
		'[disabled]': 'disabled',
		'[required]': 'required',
		'[readonly]': 'readonly',
		'(blur)': 'focusChanged(false)',
		'(focus)': 'focusChanged(true)',
		'(input)': 'onInput()',
	},
})
export class CuiInputDirective implements OnChanges, OnInit, AfterContentChecked {
	@Input() required: boolean;
	@Input() disabled: boolean;
	@Input() placeholder = '';
	@Input() id: string;
	@Input() readonly: string;
	@Input() maxlength: number;
	@Input() maxHeight: number;
	@Input() ngModel: string;
	@Input() formControl: AbstractControl;
	@Input() formControlName: string;

	public control: AbstractControl;
	public onChanges: EventEmitter<CuiInputDirective> = new EventEmitter<CuiInputDirective>();

	constructor (
		private elementRef: ElementRef,
		private renderer: Renderer2,
		@Optional() @Host() @SkipSelf() public controlContainer: ControlContainer,
	) {}

	focusChanged () {
		this.onChanges.emit(this);
	}

	@HostListener('input', ['$event.target'])
	onInput (): void {
		if (this.elementRef.nativeElement.localName === 'textarea') {
			this.adjust();
		}
	}

	ngOnInit () {
		this.refreshForm();
	}

	refreshForm () {
		if (this.controlContainer && this.formControlName) {
			this.control = this.controlContainer.control.get(this.formControlName);
		} else if (this.formControl) {
			this.control = this.formControl;
		}
	}

	ngOnChanges () {
		this.refreshForm();
		this.onChanges.emit(this);
	}

	ngAfterContentChecked (): void {
		if (this.elementRef.nativeElement.localName === 'textarea') {
			this.adjust();
		}
	}

	adjust (): void {
		const nativeElement = this.elementRef.nativeElement;
		this.maxHeight = this.maxHeight || 500;
		this.renderer.setStyle(nativeElement, 'overflow', 'hidden');
		this.renderer.setStyle(nativeElement, 'height', 'auto');
		if (nativeElement.scrollHeight < this.maxHeight) {
			this.renderer.setStyle(nativeElement, 'height', `${nativeElement.scrollHeight}px`);
		} else {
			this.renderer.setStyle(nativeElement, 'height', `${this.maxHeight}px`);
		}
		this.renderer.setStyle(nativeElement, 'overflow', 'auto');
	}
}
