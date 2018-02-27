import { ParseHrefPipe } from './parse-href.pipe.module';

describe('ParseHrefPipe', () => {
	it('create an instance', () => {
		const pipe = new ParseHrefPipe();
		expect(pipe).toBeTruthy();
	});

	it('should parse hrefs from a string', () => {
		const pipe = new ParseHrefPipe();
		const urlString = `<a href="http://google.com">Google</a>`;
		const result = pipe.transform(urlString, '_blank');
		expect(result).toEqual('<a target="_blank" href="http://google.com">Google</a>');
	});
});
