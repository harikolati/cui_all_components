import { OnInit } from '@angular/core';
export declare class CuiGaugeComponent implements OnInit {
    /**
     * The percent to show in the gauge
     */
    percentage: number;
    /**
     * Optional alternate value to show in the center of the gauge
     */
    value: string;
    /**
     * Gauge size (medium [default], small, large)
     */
    size: string;
    /**
     * Alternate background color (1)
     */
    alt: number;
    /**
     * Gauge color (info [default], success, warning, danger)
     */
    color: string;
    /**
     * Optional label for below the gauge
     */
    label: string;
    /**
     * Whether to animate the gauge value.
     */
    animated: boolean;
    /**
     * The generated class name for the gauge color
     */
    colorClass: string;
    ngOnInit(): void;
    /**
     * Drops the percentage to zero to start an animation
     */
    animate(): void;
}
