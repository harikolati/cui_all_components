/**
 * Service for alerting when the bootstrap breakpoint changes
 */
import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
export interface WindowSize {
    width: number;
    height: number;
}
export interface Breakpoint {
    min?: number;
    max?: number;
}
export interface BreakpointEvent {
    name: string;
    breakpoint: Breakpoint;
    size: WindowSize;
}
export interface BreakpointConfig {
    [name: string]: Breakpoint;
}
export declare class BreakpointsService {
    private ngZone;
    private lastBreakpoint;
    private breakpoints;
    private changesSubject;
    private subscription;
    changes: Observable<BreakpointEvent>;
    resize: Observable<WindowSize>;
    constructor(ngZone: NgZone);
    unsubscribe(): void;
    subscribe(): void;
    private setBreakpoints(breakpoints?);
    private getBreakpointEvent(name);
    private getWindowSize();
    private getBreakpoint(currentSize);
}
