const fs = require('fs');
const path = require('path');
const glob = require('glob');
const { argv } = require('yargs');
// const ngc = require('../node_modules/@angular/compiler-cli/src/main').main;
const { exec, execSync } = require('child_process');

const inlineResources = require('./inline-resources-scss');

const rootFolder = path.join(__dirname, '../');
const compilationFolder = path.join(rootFolder, 'out-tsc');
const srcFolder = path.join(rootFolder, 'src');
const distFolder = path.join(rootFolder, 'dist');
const tempLibFolder = path.join(compilationFolder, 'tmp-inlining');
const es2015OutputFolder = path.join(compilationFolder, '');

/**
 * Recursively create a directory
 * @param {string} dir
 */
function _recursiveMkDir (dir) {
	if (!fs.existsSync(dir)) {
		_recursiveMkDir(path.dirname(dir));
		fs.mkdirSync(dir);
	}
}

/**
 * Copy files maintaining relative paths.
 * @param {string} fileGlob
 * @param {string} from
 * @param {string} to
 * @return {Promise}
 */
function _relativeCopy (fileGlob, from, to) {
	return new Promise((resolve, reject) => {
		glob(fileGlob, { cwd: from, nodir: true }, (err, files) => {
			if (err) reject(err);
			for (let file of files) {
				const origin = path.join(from, file);
				const dest = path.join(to, file);
				const data = fs.readFileSync(origin, 'utf-8');
				_recursiveMkDir(path.dirname(dest));
				fs.writeFileSync(dest, data);
			}
			resolve();
		});
	});
}

const build = async () => {
	try {
		await exec(`rm -rf ${distFolder}`);
		await exec(`mkdir ${distFolder}`);
		// Copy library to temporary folder and inline html/css.
		await _relativeCopy('**/*', srcFolder, tempLibFolder);
		await inlineResources(tempLibFolder);
		console.log('Inlining succeeded.');
		// Compile to ES2015.
		if (argv.cui) {
			await execSync(`cd ${tempLibFolder}; ../../../node_modules/.bin/ngc -p tsconfig.aot.json`);
		} else {
			await execSync(`cd ${tempLibFolder}; ../../node_modules/.bin/ngc -p tsconfig.aot.json`);
		}
		console.log('ES2015 compilation succeeded.');
		await exec(`rm -rf ${tempLibFolder}`);
		console.log('Temp folder deleted');
		// Copy .d.ts, .js, .metadata.json, and js.map to `dist/` folder.
		await _relativeCopy('**/*.d.ts', es2015OutputFolder, distFolder);
		await _relativeCopy('**/*.js', es2015OutputFolder, distFolder);
		await _relativeCopy('**/*.js.map', es2015OutputFolder, distFolder);
		await _relativeCopy('**/*.metadata.json', es2015OutputFolder, distFolder);
		// await _relativeCopy('cui-select.scss', es2015OutputFolder, distFolder);
		console.log('Typings and metadata copy succeeded.');
		await exec(`rm -rf ${compilationFolder}`);
		console.log('Temp folder deleted');
		process.exit(0);
	} catch (error) {
		console.error('Build failed. See below for errors.\n');
		console.error(error);
		process.exit(1);
	}
};

build();
