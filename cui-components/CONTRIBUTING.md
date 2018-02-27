###### Fork the repository

(click the "Fork" button at the top of the repository home page) - https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-components

###### Clone the fork you just created

(either hit the "Clone in Desktop" button on your new fork or use command-line 'git clone https://wwwin-gitlab-sjc.cisco.com/{{ your userid }}/cui-components .​'

###### Make changes

###### Test

(run 'npm test' at the command line and ensure that all tests pass)

###### Commit your changes

('git commit -a -m "your change summary"')

###### Submit a merge request

(Click on the "+" dropdown and select "New merge request"). Fill out the info and submit

###### Test
After making changes or adding new files, you should always test the components by running
```
npm test
```
any broken karma tests, or insufficient coverage, should be fixed and covered.

###### Code Review
All code must be reviewed using either http://phabricator-swtg.cisco.com/ or via a fork and merge request on gitlab.

###### Peer Dependencies
All @angular dependencies should be kept out of package.json's "dependencies" field to prevent installing different versions from the main app that's installing cui-components. For testing purposes they must be installed through "devDependencies", but in order to keep the end user informed of what @angular packages are required, they must be listed in "peerDepencies" as well. 

In addition, only the @angular dependencies that are actually needed at runtime should go into peerDependencies. Since "@angular/platform-browser-dynamic" is needed for karma tests only, it should not go into peerDependencies. All non-@angular dependencies that are needed at runtime should still go in "dependencies". 

Example:
```shell
"dependencies": {
    "@cisco-ngx/cui-services": "git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-services.git#a5",
    "@cisco-ngx/cui-utils": "git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-utils.git#a5",
    "@cisco-ngx/cui-pipes": "git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui-ngx/cui-pipes.git#a5",
    "cisco-ui": "git+https://wwwin-gitlab-sjc.cisco.com/cisco-ui/pattern-library.git#1.2.0",
    "ng-file-drop": "^4.0.0",
    "tslerp2": "^2.0.0",
    "lodash-es": "^4.17.4"
},
"peerDependencies": {
    "@angular/animations": "^5.0.0",
    "@angular/cdk": "^5.0.1",
    "@angular/common": "^5.0.0",
    "@angular/core": "^5.0.0",
    "@angular/forms": "^5.0.0",
    "@angular/platform-browser": "^5.0.0",
    "@angular/router": "^5.0.0"
},
"devDependencies": {
    "@angular/animations": "^5.0.0",
    "@angular/cdk": "^5.0.1",
    "@angular/cli": "1.5.0",
    "@angular/common": "^5.0.0",
    "@angular/compiler": "^5.0.0",
    "@angular/compiler-cli": "^5.0.0",
    "@angular/core": "^5.0.0",
    "@angular/forms": "^5.0.0",
    "@angular/platform-browser": "^5.0.0",
    "@angular/platform-browser-dynamic": "^5.0.0",
    "@angular/router": "^5.0.0",
}
```

###### Dist
Once tests are green and code review has been accepted, the dist folder must be pre-compiled before pushing your changes. Because of breaking metadata changes between angular 4 and angular 5, there are two different releases that must be generated. 

#### 1. Default latest release (angular 5).
Merge your changes into the master branch. If your changes have been made directly to the master branch, you may skip this part.
```
git checkout master
git merge branch-where-changes-are-made
```

Update the package.json version. All angular 5 releases use 5.x.x versioning.

Build the dist folder. For consistency's sake, it's best to delete node_modules every time the dist folder is generated to ensure the correct version of @angular is installed prior to compiling.
```
rm -rf dist node_modules
npm install
npm run build
```

Commit and push.
```
git add .
git commit -am "<commit message>"
git push
```

Tag the new release version (for example 5.0.2) and push the new tag.
```
git tag -a 5.0.2 -m "<Changes made in this tag>"
git push origin 5.0.2
```

Publish the module to http://swtg-npm.cisco.com/
```
npm publish
```

Update the a5 branch
```
git checkout a5
git merge master
git push
```

#### 2. Angular 4 legacy release.
After completing step 1 and pushing the angular 5 version of the component, fetch the commit hash for your changes. You can see the list of commits and their hashes by running
```
git log
```

Checkout the a4 branch and cherry pick your specific commit into it. For this example, let's assume the commit hash is a3ac22e52e86595c917e297a850802a8ae81850b.
```
git checkout a4
git cherry-pick a3ac22e52e86595c917e297a850802a8ae81850b
```

Update the package.json version. All angular 4 releases use 4.x.x versioning.

Build the dist folder. For consistency's sake, it's best to delete node_modules every time the dist folder is generated to ensure the correct version of @angular is installed prior to compiling.
```
rm -rf dist node_modules
npm install
npm run build
```

Commit and push.
```
git add .
git commit -am "<commit message>"
git push
```

Tag the new release version (for example 4.0.2) and push the new tag.
```
git tag -a 4.0.2 -m "<Changes made in this tag>"
git push origin 4.0.2
```

Publish the module to http://swtg-npm.cisco.com/
```
npm publish
```
