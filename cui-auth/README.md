# @cisco-ngx/cui-auth
[![build status](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-auth/badges/master/build.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-auth/commits/master)
[![coverage report](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-auth/badges/master/coverage.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-auth/commits/master)

#### Angular auth service for use with the cway.cisco.com environment. Currently has limited or no use outside of this environment. 

#### Quick links
[Demo and Documentation](http://swtg-rtp-dev-7/angular4/) |
[Cisco Ui Kit](http://cisco-ui.cisco.com/)

### Getting started
#### 1. Install @cisco-ngx/cui-auth.
There are two methods for installation, the first is directly from gitlab
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-auth.git
```
the second is from the swtg npm registry, http://swtg-npm.cisco.com/
```
npm install @cisco-ngx/cui-auth@^5.0.0
```

Note: Because of breaking differences between angular 4 and angular 5, the most recent versions of the @cisco-ngx library will not work with angular 4. In order to use this service in an angular 4 app, it is necessary to install the angular 4 compatible versions. In gitlab the "latest" branch for angular 4 compile will be "a4". The releases are also tagged with the major semver version matching the angular version they are compiled for, 4.x.x. 
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-auth.git#a4
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-auth.git#4.0.0
```
```
npm install @cisco-ngx/cui-auth@^4.0.0
```

Include the service in your components:
```typescript
import { ProfileService  } from '@cisco-ngx/cui-auth';

@Component({
  selector: 'my-component',
  templateUrl: './my.component.html',
  providers: [
    ProfileService
  ]
})
export class MyComponent {
  constructor(private profileService: ProfileService) {}
}
```

### Using the ClientSSOModule
First of all, you must include SSO authentication routes in your *client/environments/environment.ts* and provide the environment via app.module.
```typescript
// client/environments/environment.ts
export const environment = {
	"auth": {
		"tokenUrl": "https://swtgdev-apollo-2.cisco.com/ws/oauth/v2/token/cway/<clientId>",
		"accountUrl": "https://swtgdev-apollo-2.cisco.com/ws/account/v2/"
	},
}

// app.module.ts
import { environment } from '../environments/environment';
...
	providers: [
		...,
		{ provide: 'ENVIRONMENT', useValue: environment },
	],
...
```
Add ClientSSOGuard as a guard for each route. Make sure to include the ClientSSOModule.
```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'app/guards';
import { ClientSSOGuard } from 'app/client-sso/client-sso.guard';
import { ClientSSOModule } from 'app/client-sso/client-sso.module';

const routes: Routes = [
	{
		path: 'admin',
		canActivate: [AdminGuard],
		loadChildren: './pages/admin/admin.module#AdminModule',
	},
	{
		path: 'catalog',
		canActivate: [ClientSSOGuard],
		loadChildren: './pages/catalog/catalog.module#CatalogModule',
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		ClientSSOModule,
	],
	providers: [
		AdminGuard,
	],
	exports: [RouterModule],
})
export class AppRoutes {}
```

Notice in the above example that the Admin route is not including the ClientSSOGuard. That's because the AdminGuard is using ClientSSOGuard from within.
```typescript
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ProfileService } from '@cisco-ngx/cui-auth';
import { ClientSSOGuard } from '../client-sso/client-sso.guard';
import { get } from 'lodash-es';

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(
		private profile: ProfileService,
		private clientSSOGuard: ClientSSOGuard,
	) {}
	async canActivate (): Promise<boolean> {
		await this.clientSSOGuard.canActivate();
		// The canActivate method on ClientSSOGuard will initialize the profile service
		if (get(this.profile.getProfile(), 'roles.myApp') === 'admin') {
			return true;
		}

		return false;
	}
}
```

On the backend, the server routes should be authenticated with apolloExpress.authorization.api. 
```javascript
const apolloExpress = require('apollo-express');
...
module.exports = {
	auth: [apolloExpress.authorization.api],
	...
};
```
Also, in app.js you will need to set global.appName to the name of your app. For Attica we use the following:
```javascript
global.appName = 'attica';
```

In order for this to work properly, a record for your application will need to be inserted into the clientId collection in mongo. The \_id of this record is the __\<clientId\>__ you need for the *environment.ts* auth.tokenUrl string

