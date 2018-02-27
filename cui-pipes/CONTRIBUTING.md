###### Test
After making changes or adding new files, you should always test the components by running
```
npm test
```
any broken karma tests, or insufficient coverage, should be fixed and covered.

###### Code Review
All code must be reviewed using either http://phabricator-swtg.cisco.com/ or via a fork and merge request on gitlab.

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
