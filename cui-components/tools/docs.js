const fs = require('fs'),
	path = require('path');
	util = require('util');
	rimraf = require('rimraf'),
	ncp = require('ncp'),
	typedocModule = require('typedoc');

const ncpp = util.promisify(ncp),
	typedoc = new typedocModule.Application({
		mode: 'file',
		theme: 'minimal',
		ignoreCompilerErrors: 'true',
		experimentalDecorators: 'true',
		emitDecoratorMetadata: 'true',
		target: 'ES5',
		moduleResolution: 'node',
		preserveConstEnums: 'true',
		stripInternal: 'true',
		suppressExcessPropertyErrors: 'true',
		suppressImplicitAnyIndexErrors: 'true',
		module: 'commonjs',
		exclude: '**/*+(e2e|test|spec|index|environment|data|example.component|code-block.component|app.component|app.po|module)*.ts',
		excludeExternals: 'true',
	});

async function _buildDocs () {
	try {
		const components = [
			'alert', 'drawer', 'drawers', 'filter', 'gauge', 'header', 'input',
			'loader', 'pager', 'pipes', 'progressbar', 'rating', 'search', 'select',
			'services', 'sidebar', 'steps', 'table', 'toast', 'utilities',
		];

		const compsDir = path.join(__dirname, '..', 'components');
		if(fs.existsSync(compsDir)) {
			rimraf.sync(compsDir);
		}
		fs.mkdirSync(compsDir);

		for(const component of components) {
			try {
				const compDir = path.join(__dirname, '..', 'node_modules', '@cisco-ngx' , `cui-${component}`, 'client', 'app', `cui-${component}`);
				await ncpp(
					compDir,
					compsDir
				);
			} catch (err) {
				console.warn(`cui-${component} missing in node_modules`);
			}
		}

		const buildDir = path.join(__dirname, '..', 'builds');
		const docsDir = path.join(__dirname, '..', 'docs');
		if(fs.existsSync(buildDir)) {
			rimraf.sync(buildDir);
		}
		if(fs.existsSync(docsDir)) {
			rimraf.sync(docsDir);
		}

		const files = fs.readdirSync(compsDir)
			.filter(file => file.match(/\.ts/i) && !file.match(/module.ts/i))
			.map(file => path.join(compsDir, file));
		project = typedoc.convert(files);
		typedoc.generateDocs(project, docsDir);

		rimraf.sync(compsDir);
	} catch (err) {
		throw new Err(err);
	}
}

_buildDocs();