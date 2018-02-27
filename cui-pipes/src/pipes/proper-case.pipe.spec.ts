import { ProperCasePipe } from './proper-case.pipe.module';

describe('ProperCasePipe', () => {
	it('create an instance', () => {
		const pipe = new ProperCasePipe();
		expect(pipe).toBeTruthy();
	});

	it('should parse urls from a string', () => {
		const pipe = new ProperCasePipe();
		expect(pipe.transform('tesT')).toEqual('Test');
	});
});
