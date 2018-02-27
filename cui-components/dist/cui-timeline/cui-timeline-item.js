import { DatePipe } from '@angular/common';
import { FromNowPipe } from '@cisco-ngx/cui-pipes';
import { assignIn } from 'lodash-es';
/**
 * Default timeline time formats.
 */
/**
 * Default timeline time formats.
 */
export var CuiTimelineTimeFormat;
/**
 * Default timeline time formats.
 */
(function (CuiTimelineTimeFormat) {
    CuiTimelineTimeFormat[CuiTimelineTimeFormat["FROM_NOW"] = 0] = "FROM_NOW";
    CuiTimelineTimeFormat[CuiTimelineTimeFormat["DATE"] = 1] = "DATE";
    CuiTimelineTimeFormat[CuiTimelineTimeFormat["DATETIME"] = 2] = "DATETIME";
})(CuiTimelineTimeFormat || (CuiTimelineTimeFormat = {}));
var CuiTimelineItem = (function () {
    function CuiTimelineItem(options) {
        /**
             * The format with which to display the time.
             */
        this.timeFormat = CuiTimelineTimeFormat.FROM_NOW;
        /**
             * The color for the timeline icon (default, info, success, warning, danger)
             */
        this.color = 'default';
        try {
            assignIn(this, options);
        }
        catch (err) { }
        if (this.guid) {
            this.time = this.getGuidTime();
        }
        else if (!this.time) {
            this.time = new Date();
        }
        this.formatTime();
        this.setColorClass();
    }
    /**
     * Generates the formattedTime string.
     */
    /**
         * Generates the formattedTime string.
         */
    CuiTimelineItem.prototype.formatTime = /**
         * Generates the formattedTime string.
         */
    function () {
        var nav = navigator;
        var datePipe = new DatePipe(nav.userLanguage || nav.language || nav.browserLanguage || nav.systemLanguage);
        switch (this.timeFormat) {
            case CuiTimelineTimeFormat.FROM_NOW:
                var fromNowPipe = new FromNowPipe();
                this.formattedTime = fromNowPipe.transform(this.time);
                break;
            case CuiTimelineTimeFormat.DATE:
                this.formattedTime = datePipe.transform(this.time, 'MM/dd/yyyy');
                break;
            case CuiTimelineTimeFormat.DATETIME:
                this.formattedTime = datePipe.transform(this.time, 'MM/dd/yyyy hh:mm:ss');
                break;
            default:
                this.formattedTime = datePipe.transform(this.time, this.timeFormat);
                break;
        }
    };
    /**
     * Generates the color class string.
     */
    /**
         * Generates the color class string.
         */
    CuiTimelineItem.prototype.setColorClass = /**
         * Generates the color class string.
         */
    function () {
        if (this.color === 'default') {
            this.colorClass = '';
        }
        else {
            this.colorClass = "timeline--" + this.color;
        }
    };
    /**
     * Returns a date object from a MongoDB GUID.
     * @returns The date the Mongo object was created.
     */
    /**
         * Returns a date object from a MongoDB GUID.
         * @returns The date the Mongo object was created.
         */
    CuiTimelineItem.prototype.getGuidTime = /**
         * Returns a date object from a MongoDB GUID.
         * @returns The date the Mongo object was created.
         */
    function () {
        var timestamp = this.guid.substring(0, 8);
        return new Date(parseInt(timestamp, 16) * 1000);
    };
    return CuiTimelineItem;
}());
export { CuiTimelineItem };
//# sourceMappingURL=cui-timeline-item.js.map