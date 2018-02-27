# @cisco-ngx/cui-services
[![build status](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services/badges/master/build.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services/commits/master)
[![coverage report](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services/badges/master/coverage.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services/commits/master)

Angular services for use with Cisco UI components and apps

#### Quick links
[Demo and Documentation](http://swtg-rtp-dev-7/angular4/) |
[Cisco Ui Kit](http://cisco-ui.cisco.com/)

### Getting started
#### 1. Install @cisco-ngx/cui-services.
There are two methods for installation, the first is directly from gitlab
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services.git
```
the second is from the swtg npm registry, http://swtg-npm.cisco.com/
```
npm install @cisco-ngx/cui-services@^5.0.0
```

Note: Because of breaking differences between angular 4 and angular 5, the most recent versions of the @cisco-ngx library will not work with angular 4. In order to use these services in an angular 4 app, it is necessary to install the angular 4 compatible versions. In gitlab the "latest" branch for angular 4 compile will be "a4". The releases are also tagged with the major semver version matching the angular version they are compiled for, 4.x.x. 
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services.git#a4
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services.git#4.0.0
```
```
npm install @cisco-ngx/cui-services@^4.0.0
```

Include services in your components:
```TypeScript
import { StaticPagerService } from '@cisco-ngx/cui/services';

@Component({
  selector: 'my-component',
  templateUrl: './my.component.html',
  providers: [
    StaticPagerService
  ]
})
export class MyComponent {
  constructor(private staticPagerService: StaticPagerService) {}
}
```

#### Available services
| Service          | Notes                                                  | Docs      |
|------------------|--------------------------------------------------------| --------- |
| breakpoints      |                                                        |  |
| device           |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/DeviceService) |
| dynamic-pager    |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/DynamicPagerService) |
| file             |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/FileService) |
| log              |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/LogService) |
| sortable-field   |                                                        |  |
| static-pager     |                                                        |  |
