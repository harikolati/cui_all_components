import { InputLengthPipe } from './input-length.pipe.module';

describe('InputLengthPipe', () => {
	it('create an instance', () => {
		const pipe = new InputLengthPipe();
		expect(pipe).toBeTruthy();
	});

	it('should return a counter of the input length over the max', () => {
		const inputLength = new InputLengthPipe();
		const maxLen = 10;
		const input = 'AAAAAAAAAAAA';
		expect(inputLength.transform(input, maxLen)).toEqual('12 / 10');
	});

	it('should return a counter of the input length under the max', () => {
		const inputLength = new InputLengthPipe();
		const maxLen = 10;
		const input = 'AAAAAA';
		expect(inputLength.transform(input, maxLen)).toEqual('6 / 10');
	});

	it('should return a counter of the input length equal to the max', () => {
		const inputLength = new InputLengthPipe();
		const maxLen = 10;
		const input = 'AAAAAAAAAA';
		expect(inputLength.transform(input, maxLen)).toEqual('10 / 10');
	});

	it('should return a counter of the input length 0 over the max', () => {
		const inputLength = new InputLengthPipe();
		const maxLen = 10;
		const input = '';
		expect(inputLength.transform(input, maxLen)).toEqual('0 / 10');
	});
});
