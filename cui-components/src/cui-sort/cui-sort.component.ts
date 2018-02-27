import {
	Component,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';

@Component({
	selector: 'cui-sort',
	templateUrl: './cui-sort.component.html',
	styleUrls: ['./cui-sort.component.scss'],
})
/**
 * Component for an sort
 * <cui-sort [options]="options" (toggleSortDirUpdate)="onToggleSortDirUpdate($event)"
 * (optionChange)="onOptionChange($event)" sortbyID="table" optionSelected="Title"></cui-sort>
 */
export class CuiSortComponent {
	/**
	 * Options object for cui-sort
	 */
	option: any;
	id: string;
	@Input() sortDirection: string = 'asc';
	@Input() options: any = [];
	@Input() optionsLabel: string;
	@Input() optionsValue: string;
	@Input() sortbyID: string;
	@Input() optionSelected: any;
	@Output() toggleSortDirUpdate = new EventEmitter();
	@Output() optionChange = new EventEmitter();
	toggleSortDir () {
		this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
		this.optionSelected = this.optionSelected;
		this.toggleSortDirUpdate
		.emit({ sortDirection: this.sortDirection, sortValue: this.optionSelected });
	}
}
