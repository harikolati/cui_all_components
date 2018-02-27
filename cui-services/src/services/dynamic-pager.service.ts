import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DynamicPagerService {

	constructor(private http: HttpClient) { }

	private serviceUrl = '';

	/**
	 * Sets the base URL of the service to call
	 * @param url The new base URL
	 */
	public setServiceUrl (url: string) {
		this.serviceUrl = url;
	}

	/**
	 * Retrieves a single object from the service
	 * @param [id]     The UID of the element to retrieve
	 * @param [params] Parameters to add to the URL
	 * @return The object retrieved from the service
	 */
	public get (id: string = '', params: any = {}): Promise<any> {
		const url = `${this.serviceUrl}/${id}${this.buildParamsString(params)}`;

		return this.http.get(url)
							.toPromise()
							.catch(Promise.reject);
	}

	/**
	 * Retrieves an array of objects from the service
	 * @param [params] Parameters to add to the URL
	 * @return The objects retrieved from the service
	 */
	public getMultiple (params: any = {}): Promise<any[]> {
		const url = `${this.serviceUrl}${this.buildParamsString(params)}`;

		return this.http.get(url)
							.toPromise()
							.then(response => <any>response)
							.catch(Promise.reject);
	}

	/**
	 * Creates an object through the service
	 * @param  data The data of the object
	 * @return The response returned from the service
	 */
	public create (data: any = {}): Promise<any> {
		const url = `${this.serviceUrl}`;

		return this.http.post(url, data)
							.toPromise()
							.catch(Promise.reject);
	}

	/**
	 * Updates an object through the service
	 * @param [id]   The UID of the element to update
	 * @param [data] The data of the object
	 * @return The response returned from the service
	 */
	public update (id: string = '', data: any = {}): Promise<any> {
		const url = `${this.serviceUrl}/${id}`;

		return this.http.put(url, data)
							.toPromise()
							.catch(Promise.reject);
	}

	/**
	 * Deletes a single object from the service
	 * @param [id]     The UID of the element to delete
	 * @param  [params] Parameters to add to the URL
	 * @return The object retrieved from the service
	 */
	public delete (id: string = '', params: any = {}): Promise<any> {
		const url = `${this.serviceUrl}/${id}${this.buildParamsString(params)}`;

		return this.http.delete(url)
							.toPromise()
							.catch(Promise.reject);
	}

	private buildParamsString (params: any): string {
		let paramsString = ``;
		for (const key in params) {
			if (params.hasOwnProperty(key)) {
				paramsString += `${(paramsString.length ? '&' : '?')}${key}=${params[key]}`;
			}
		}

		return paramsString;
	}
}
