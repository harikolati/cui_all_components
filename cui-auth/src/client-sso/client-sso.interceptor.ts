/**
 * Http Interceptor module that adds Authorization token to all Http requests
 */
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import {
	HttpEvent,
	HttpInterceptor,
	HttpHandler,
	HttpRequest,
	HttpErrorResponse,
} from '@angular/common/http';
import { get } from 'lodash-es';
import { ClientSSOService } from './client-sso.service';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class ClientSSOInterceptor implements HttpInterceptor {

	constructor (
		private injector: Injector,
		private windowRef: WindowRefService,
	) {}
	/**
	 * Intercepts angular HttpClient requests and attaches a bearerToken
	 * from the global cisco object.
	 * @param req
	 * @param next
	 * @return Observable<HttpEvent<any>>
	 */
	intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const clientSSOService = this.injector.get(ClientSSOService);
		const bearerToken = get(this, 'windowRef.nativeWindow.cisco.bearerToken', '');
		let dupReq: HttpRequest<any>;
		if (
			req.headers.get('Authorization') === null &&
			clientSSOService.tokenUrl !== req.url
		) {
			dupReq = req.clone({
				headers: req.headers.set('Authorization', bearerToken),
			});
		}


		return next.handle(dupReq || req).pipe(tap(() => {}, async err => {
			if (
				err instanceof HttpErrorResponse && err.status === 401 &&
				clientSSOService.tokenUrl !== req.url
			) {
				// handle 401 errors
				// guard against infinite loop if token request returns 401
				try {
					const token = await clientSSOService.getAuthToken(true);
					if (!token.authenticated) {
						// if not authenticated, redirect to login
						this.windowRef.nativeWindow.location.href = token.loginURL;
					}
				} catch (e) {
					throw new Error(`Token Request Failed: ${e.error}`);
				}
			}
		}));
	}
}
