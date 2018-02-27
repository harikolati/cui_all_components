import { Component, Input } from '@angular/core';

import { CuiTimelineItem } from './cui-timeline-item';

@Component({
	selector: 'cui-timeline',
	templateUrl: './cui-timeline.component.html',
})
/**
 * Component for a timeline
 */
export class CuiTimelineComponent {
	/**
	 * Items to display in the timeline.
	 */
	@Input() items: CuiTimelineItem[] = [];
	/**
	 * Whether to display timeline items in block width.
	 */
	@Input() block = false;
	/**
	 * Whether to vertically center timeline content.
	 */
	@Input() centered = false;
	/**
	 * Whether to animate timeline items on hover.
	 */
	@Input() animated = true;
}
