import { FromNowPipe } from './from-now.pipe.module';

describe('FromNowPipe', () => {
	it('create an instance', () => {
		const pipe = new FromNowPipe();
		expect(pipe).toBeTruthy();
	});

	it('should get the correct time from now', () => {
		const pipe = new FromNowPipe();
		const date = new Date().getTime() - 60000;
		expect(pipe.transform(date)).toEqual('a minute ago');
		expect(pipe.transform(date / 1000, true)).toEqual('a minute ago');
	});
});
