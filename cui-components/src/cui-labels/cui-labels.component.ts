import {
	Component,
	forwardRef,
	Input,
	OnChanges,
	OnInit,
	SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'cui-labels',
	templateUrl: './cui-labels.component.html',
	styleUrls: ['./cui-labels.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => CuiLabelsComponent),
			multi: true,
		},
	],
})
export class CuiLabelsComponent implements OnInit, OnChanges, ControlValueAccessor {
	@Input() removable = true;
	@Input() raised: boolean;
	@Input() bordered: boolean;
	@Input() size: string;
	@Input() color: string;
	@Input() labelKey: string;
	data: any[];
	labelClasses: any;
	propagateChange: Function = (_: any) => {};
	constructor() { }

	remove (index: number) {
		this.data.splice(index, 1);
		this.propagateChange(this.data);
	}

	ngOnInit () {
		this.labelClasses =  {
			'label--raised': this.raised,
			'label--bordered': this.bordered,
		};
		if (this.color) {
			this.labelClasses[`label--${this.color}`] = true;
		}
		if (this.size) {
			this.labelClasses[`label--${this.size}`] = true;
		}
	}

	ngOnChanges (changes: SimpleChanges) {
		if (changes.color || changes.size) {
			this.labelClasses =  {
				'label--raised': this.raised,
				'label--bordered': this.bordered,
			};
			this.labelClasses[`label--${this.color}`] = true;
			this.labelClasses[`label--${this.size}`] = true;
		}
		if (changes.raised) {
			this.labelClasses['label--raised'] = this.raised;
		}
		if (changes.bordered) {
			this.labelClasses['label--bordered'] = this.bordered;
		}
	}

	writeValue (value: any) {
		this.data = value;
	}
	registerOnChange (fn: Function) {
		this.propagateChange = fn;
	}
	registerOnTouched () {}
}
