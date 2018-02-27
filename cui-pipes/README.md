[![build status](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-pipes/badges/master/build.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-pipes/commits/master)
[![coverage report](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-pipes/badges/master/coverage.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-pipes/commits/master)

# @cisco-ngx/cui-pipes

#### Angular pipes for use with Cisco UI components, services, and apps

### [Demo and Documentation](http://swtg-rtp-dev-7/angular4/)

### Including cui-pipes in your project

#### Using gitlab directly
```shell
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-pipes.git --save
```

#### Using npm registry http://swtg-npm.cisco.com
```shell
npm install @cisco-ngx/cui-pipes --save
```

In your `app.module.ts`:
```TypeScript
import { FromNowPipeModule } from '@cisco-ngx/cui-pipes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FromNowPipeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

Use the pipes in your HTML:
```html
<div [innerHTML]="timestamp | fromNow"></div>
