import { Language } from './language';

describe('Language Utility', () => {
	it('should retrieve the preferred language', () => {
		expect(Language.getPreferred().length).toBeGreaterThan(0);
	});
});
