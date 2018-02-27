# @cisco-ngx/cui-components
[![build status](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components/badges/master/build.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components/commits/master)
[![coverage report](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components/badges/master/coverage.svg)](https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components/commits/master)

Angular components for use with Cisco UI apps

#### Quick links
[Demo and Documentation](http://swtg-rtp-dev-7/angular4/) |
[Cisco Ui Kit](http://cisco-ui.cisco.com/)

### Getting started
#### 1. Install @cisco-ngx/cui-components.
There are two methods for installation, the first is directly from gitlab
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components.git
```
the second is from the swtg npm registry, http://swtg-npm.cisco.com/
```
npm install @cisco-ngx/cui-components@^5.0.0
```

Note: Because of breaking differences between angular 4 and angular 5, the most recent versions of the @cisco-ngx library will not work with angular 4. In order to use these components in an angular 4 app, it is necessary to install the angular 4 compatible versions. In gitlab the "latest" branch for angular 4 compile will be "a4". The releases are also tagged with the major semver version matching the angular version they are compiled for, 4.x.x. 
```
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components.git#a4
npm install git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components.git#4.0.0
```
```
npm install @cisco-ngx/cui-components@^4.0.0
```

#### 2. Including @cisco-ngx/cui-components in your project

In your `app.module.ts`:
```TypeScript
import { CuiAlertComponent } from '@cisco-ngx/cui-components';
// repeat for other component declarations

@NgModule({
  declarations: [
    AppComponent,
    CuiAlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

#### Available components
| Component        | Notes                                                  | Docs      |
|------------------|--------------------------------------------------------| --------- |
| cui-alert        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Alert) |
| cui-billboard-panel |                                                     | |
| cui-breadcrumbs  |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Breadcrumbs) |
| cui-dialog       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Dialog) |
| cui-drawer       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Drawers) |
| cui-dropdown     |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Dropdown) |
| cui-dropzone     |                                                        | |
| cui-filter       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Filter) |
| cui-footer       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Footer) |
| cui-gauge        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Gauge) |
| cui-grid         |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Grid) |
| cui-header       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Header) |
| cui-icon         |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Icon) |
| cui-input        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Input) |
| cui-labels       |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Labels) |
| cui-loader       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Loader) |
| cui-pager        |                                                        | |
| cui-progressbar  |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Progressbar) |
| cui-rating       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Rating) |
| cui-search       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Search) |
| cui-select       |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Select) |
| cui-sidebar      |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Sidebar) |
| cui-sort         |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Sidebar) |
| cui-steps        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Steps) |
| cui-spinner      |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Spinner) |
| cui-table        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Table) |
| cui-toast        |                                                        | [Docs](http://swtg-rtp-dev-7/angular4/example/Toast) |
| cui-tree         |                                                        | [Docs](http://swtg-rtp-dev-7/angular/example/Tree) |