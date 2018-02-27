import { CanActivate } from '@angular/router';
import { ProfileService } from '../auth/profile.service';
import { ClientSSOService } from './client-sso.service';
import { WindowRefService } from './window-ref.service';
export declare class ClientSSOGuard implements CanActivate {
    private clientSSOService;
    private profile;
    private windowRef;
    constructor(clientSSOService: ClientSSOService, profile: ProfileService, windowRef: WindowRefService);
    canActivate(): Promise<boolean>;
}
