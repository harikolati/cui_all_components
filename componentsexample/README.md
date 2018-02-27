# ComponentsExample

A basic example of an Angular app using the cui-components.

### Installation and starting

```shell
git clone git@wwwin-gitlab-sjc.cisco.com:cisco-ui-ngx/componentsexample.git
cd componentsexample
npm install
npm start
```

Browse to ```http://localhost:4200``` to see the demo app.

### Configuration notes

* The base Angular app was created with the command ```ng new componentsexample --style=scss```.
* The package.json contains dev dependencies for the cui-components and cisco-ui libraries. The cui-utilities library, used for internationalization, is a dependency of cui-components, so it doesn't need to be explicitly installed.
* The src/styles.scss file imports the cisco-ui cui-standard.scss file.
* The assets/i18n/en-US.json file contains the internationalization key/value pairs. It's copied as part of the Angular webpack compile process. It's retrieved at runtime with the HttpClient service and added to the I18n utility's dictionary.