import { TemplateRef } from '@angular/core';
/**
 * Default timeline time formats.
 */
export declare enum CuiTimelineTimeFormat {
    FROM_NOW = 0,
    DATE = 1,
    DATETIME = 2,
}
export declare class CuiTimelineItem {
    /**
     * The date of the timeline item.
     */
    time: Date;
    /**
     * A MongoDB GUID to parse time from.
     */
    guid: string;
    /**
     * The format with which to display the time.
     */
    timeFormat: any;
    /**
     * The formatted time string for display.
     */
    formattedTime: string;
    /**
     * The color for the timeline icon (default, info, success, warning, danger)
     */
    color: string;
    /**
     * The generated color class for the icon.
     */
    colorClass: string;
    /**
     * Static content for the timeline item.
     */
    content: string;
    /**
     * TemplateRef for the timeline item content.
     */
    template: TemplateRef<any>;
    /**
     * Data to be used for the timeline item template.
     */
    data: any;
    constructor(options: any);
    /**
     * Generates the formattedTime string.
     */
    formatTime(): void;
    /**
     * Generates the color class string.
     */
    setColorClass(): void;
    /**
     * Returns a date object from a MongoDB GUID.
     * @returns The date the Mongo object was created.
     */
    getGuidTime(): Date;
}
