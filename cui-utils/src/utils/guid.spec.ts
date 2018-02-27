import { Guid } from './guid';

describe('Guid Utility', () => {
	it('should generate a Guid', () => {
		expect(Guid.generate().length).toEqual(36);
	});
});
