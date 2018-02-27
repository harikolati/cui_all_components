import { OnDestroy, OnInit } from '@angular/core';
import { CuiAlertService } from './cui-alert.service';
export declare class CuiAlertComponent implements OnInit, OnDestroy {
    private alertService;
    constructor(alertService: CuiAlertService);
    /**
     * Options object for cui-alert
     */
    options: any;
    /**
     * Whether to listen for global alerts from the alert service
     */
    global: boolean;
    alert: any;
    private alertSubscribe;
    /**
     * Returns the color class string for the alert
     * @returns The color class string
     */
    getColorClass(): string;
    /**
     * Returns the class string for the alert's icon
     * @returns The icon string
     */
    getIconClass(): "icon-check" | "icon-exclamation-triangle" | "icon-error" | "icon-info-circle";
    ngOnInit(): void;
    ngOnDestroy(): void;
}
