import { CuiTimelineItem } from './cui-timeline-item';
export declare class CuiTimelineComponent {
    /**
     * Items to display in the timeline.
     */
    items: CuiTimelineItem[];
    /**
     * Whether to display timeline items in block width.
     */
    block: boolean;
    /**
     * Whether to vertically center timeline content.
     */
    centered: boolean;
    /**
     * Whether to animate timeline items on hover.
     */
    animated: boolean;
}
