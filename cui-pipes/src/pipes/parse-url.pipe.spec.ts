import { ParseUrlPipe } from './parse-url.pipe.module';

describe('ParseUrlPipe', () => {
	it('create an instance', () => {
		const pipe = new ParseUrlPipe();
		expect(pipe).toBeTruthy();
	});

	it('should parse urls from a string', () => {
		const pipe = new ParseUrlPipe();
		const urlString = `http://google.com`;
		const result = pipe.transform(urlString, '_blank', true);
		expect(result).toEqual('<a target="_blank" href="http://google.com">google.com</a>');
	});
});
