import { HtmlToTextPipe } from './html-to-text.pipe.module';

describe('HtmlToTextPipe', () => {
	it('create an instance', () => {
		const pipe = new HtmlToTextPipe();
		expect(pipe).toBeTruthy();
	});

	it('should remove html', () => {
		const pipe = new HtmlToTextPipe();
		const input = '<h1>Testing</h1>';
		expect(pipe.transform(input)).toEqual('Testing');
	});
});
