import { Mobile } from './mobile';

describe('Mobile Utility', () => {
	it('should retrieve whether the device is mobile', () => {
		expect(Mobile.isMobile()).toBeDefined();
	});
});
