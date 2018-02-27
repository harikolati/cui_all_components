/**
 * Http Interceptor module that adds Authorization token to all Http requests
 */
import { Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { WindowRefService } from './window-ref.service';
export declare class ClientSSOInterceptor implements HttpInterceptor {
    private injector;
    private windowRef;
    constructor(injector: Injector, windowRef: WindowRefService);
    /**
     * Intercepts angular HttpClient requests and attaches a bearerToken
     * from the global cisco object.
     * @param req
     * @param next
     * @return Observable<HttpEvent<any>>
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}
