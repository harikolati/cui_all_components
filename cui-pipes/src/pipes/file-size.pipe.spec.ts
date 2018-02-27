import { FileSizePipe } from './file-size.pipe.module';

describe('FileSizePipe', () => {
	it('create an instance', () => {
		const pipe = new FileSizePipe();
		expect(pipe).toBeTruthy();
	});

	it('shold return the correct size', () => {
		const pipe = new FileSizePipe();
		expect(pipe.transform(3145728)).toEqual('3 MB');
	});
});
