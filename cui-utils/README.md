# @cisco-ngx/cui-utils
[![build status](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils/badges/master/build.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils/commits/master)
[![coverage report](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils/badges/master/coverage.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils/commits/master)

Angular utilities for use with Cisco UI components, services, and apps

### [Demo and Documentation](http://swtg-rtp-dev-7/angular4/)

#### Quick links
[Demo and Documentation](http://swtg-rtp-dev-7/angular4/) |
[Cisco Ui Kit](http://cisco-ui.cisco.com/)

### Getting started
#### 1. Install @cisco-ngx/cui-utils.
There are two methods for installation, the first is directly from gitlab
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils.git
```
the second is from the swtg npm registry, http://swtg-npm.cisco.com/
```
npm install @cisco-ngx/cui-utils@^5.0.0
```

Note: Because of breaking differences between angular 4 and angular 5, the most recent versions of the @cisco-ngx library will not work with angular 4. In order to use these utils in an angular 4 app, it is necessary to install the angular 4 compatible versions. In gitlab the "latest" branch for angular 4 compile will be "a4". The releases are also tagged with the major semver version matching the angular version they are compiled for, 4.x.x. 
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils.git#a4
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils.git#4.0.0
```
```
npm install @cisco-ngx/cui-utils@^4.0.0
```

Include utilities in your components:
```TypeScript
import { Guid } from '@cisco-ngx/cui-utils';

@Component({
  selector: 'my-component',
  templateUrl: './my.component.html'
})
export class MyComponent {
  guid: string = Guid.generate();
}
```

#### Available utilities
| Utility     | Notes                                                  | Docs      |
|-------------|--------------------------------------------------------| --------- |
| guid        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Guid) |
| i18n        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/i18n) |
| language    |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Language) |
| mobile      |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Mobile) |
