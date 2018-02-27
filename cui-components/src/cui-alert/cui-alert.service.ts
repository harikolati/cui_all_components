import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

/**
 * Service for alerts
 */
@Injectable()
export class CuiAlertService {

	private nextAlert = new Subject<any>();
	public postAlert (severity: string = '', msg: string = '') {
		this.nextAlert.next({ severity, msg });
	}
	public getNextAlert (): Observable<any> {
		return this.nextAlert.asObservable();
	}
}
