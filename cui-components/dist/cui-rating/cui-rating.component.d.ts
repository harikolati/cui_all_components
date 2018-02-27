import { EventEmitter } from '@angular/core';
export declare class CuiRatingComponent {
    /**
     * The number of stars active
     */
    rating: number;
    /**
     * Event emitted when rating is changed
     */
    onUpdate: EventEmitter<number>;
    /**
     * Sets the rating to a new level
     * @param newRating The new rating.
     */
    setRating(newRating: number): void;
}
