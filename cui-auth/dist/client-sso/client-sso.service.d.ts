import { HttpClient } from '@angular/common/http';
import { WindowRefService } from './window-ref.service';
import { ProfileService } from '../auth/profile.service';
import { AuthUser } from './auth-user.model';
export declare class ClientSSOService {
    private profile;
    private windowRef;
    private http;
    private env;
    authenticated: boolean;
    bearerToken: string;
    tokenLoaded: boolean;
    tokenUrl: string;
    userLoaded: boolean;
    user: AuthUser;
    private loginUrl;
    private logoutUrl;
    private token;
    constructor(profile: ProfileService, windowRef: WindowRefService, http: HttpClient, env: any);
    getAuthToken(force?: boolean): Promise<any>;
    getAuthUser(): Promise<any>;
}
