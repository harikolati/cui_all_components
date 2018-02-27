import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'cui-rating',
	templateUrl: './cui-rating.component.html',
})
/**
 * Component for a five star rating
 */
export class CuiRatingComponent {
	/**
	 * The number of stars active
	 */
	@Input() rating: number;
	/**
	 * Event emitted when rating is changed
	 */
	@Output() onUpdate: EventEmitter<number> = new EventEmitter();

	/**
	 * Sets the rating to a new level
	 * @param newRating The new rating.
	 */
	public setRating (newRating: number) {
		this.rating = newRating;
		this.onUpdate.emit(newRating);
	}
}
