import { AuthUser } from './auth-user.model';
import { Router, Resolve } from '@angular/router';
import { ProfileService } from '../auth/profile.service';
import { WindowRefService } from './window-ref.service';
import { ClientSSOService } from './client-sso.service';
export declare class ClientSSOResolver implements Resolve<AuthUser> {
    private clientSSOService;
    private profile;
    private router;
    private windowRef;
    constructor(clientSSOService: ClientSSOService, profile: ProfileService, router: Router, windowRef: WindowRefService);
    resolve(): Promise<AuthUser>;
}
