import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
export declare class DynamicPagerService {
    private http;
    constructor(http: HttpClient);
    private serviceUrl;
    /**
     * Sets the base URL of the service to call
     * @param url The new base URL
     */
    setServiceUrl(url: string): void;
    /**
     * Retrieves a single object from the service
     * @param [id]     The UID of the element to retrieve
     * @param [params] Parameters to add to the URL
     * @return The object retrieved from the service
     */
    get(id?: string, params?: any): Promise<any>;
    /**
     * Retrieves an array of objects from the service
     * @param [params] Parameters to add to the URL
     * @return The objects retrieved from the service
     */
    getMultiple(params?: any): Promise<any[]>;
    /**
     * Creates an object through the service
     * @param  data The data of the object
     * @return The response returned from the service
     */
    create(data?: any): Promise<any>;
    /**
     * Updates an object through the service
     * @param [id]   The UID of the element to update
     * @param [data] The data of the object
     * @return The response returned from the service
     */
    update(id?: string, data?: any): Promise<any>;
    /**
     * Deletes a single object from the service
     * @param [id]     The UID of the element to delete
     * @param  [params] Parameters to add to the URL
     * @return The object retrieved from the service
     */
    delete(id?: string, params?: any): Promise<any>;
    private buildParamsString(params);
}
