import { Observable } from 'rxjs/Observable';
/**
 * Service for alerts
 */
export declare class CuiAlertService {
    private nextAlert;
    postAlert(severity?: string, msg?: string): void;
    getNextAlert(): Observable<any>;
}
