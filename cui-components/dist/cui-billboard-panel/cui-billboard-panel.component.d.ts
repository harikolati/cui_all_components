/**
 * CUI DASHBOARD COMPONENT
 * USAGE:
 * <cui-dashboard
 *   [count]="list.length"
 *   link-to="https://optional-link-url/"
 *   panel-styles="indigo hover"
 *   show-billboard="true|false"
 *   title="TitleString"
 *   flipped="true|false"
 * >
 *   ** Your Content HERE **
 * </cui-dashboard>
 */
import { OnInit, OnDestroy } from '@angular/core';
import { BreakpointsService } from '@cisco-ngx/cui-services';
export declare class CuiBillboardPanelComponent implements OnInit, OnDestroy {
    private breakpointService;
    flipped: boolean;
    panelClass: string;
    private billboardClass;
    private breakpoint;
    private breakPointSubscription;
    count: number;
    linkTo?: string;
    showBillboard: boolean;
    title: string;
    setPanelClasses: PanelStyle;
    direction: boolean | 'true' | 'false';
    constructor(breakpointService: BreakpointsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    panelClasses(classList?: string): string;
    billboardClasses(breakpoint: string, flipped: any): string;
    private getBreakPoint();
}
export declare type PanelStyle = 'blue' | 'danger' | 'dkblue' | 'dkgray' | 'fluid' | 'gray-ghost' | 'hover' | 'indigo' | 'info' | 'ltgray' | 'mdgray' | 'raised' | 'raised-medium' | 'raised-large' | 'success' | 'warning' | 'well';
