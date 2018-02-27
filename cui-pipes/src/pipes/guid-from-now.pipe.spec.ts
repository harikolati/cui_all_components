import { GuidFromNowPipe } from './guid-from-now.pipe.module';

describe('GuidFromNowPipe', () => {
	it('create an instance', () => {
		const pipe = new GuidFromNowPipe();
		expect(pipe).toBeTruthy();
	});

	it('parse the time from now from a MongoDB Guid', () => {
		const pipe = new GuidFromNowPipe();
		const guid = '58d16112a4c061010042fa32';
		expect(pipe.transform(guid)).toBeTruthy();
	});
});
