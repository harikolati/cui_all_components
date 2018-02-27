import { I18nPipe, I18nService } from './i18n.pipe.module';

describe('I18nPipe', () => {
	const i18nService = new I18nService();
	i18nService.injectDictionary({ 'en-us': { _Test_: 'Test' } });

	it('create an instance', () => {
		const pipe = new I18nPipe();
		expect(pipe).toBeTruthy();
	});

	it('should convert string', () => {
		const pipe = new I18nPipe();
		expect(pipe.transform('_Test_')).toEqual('Test');
	});
});
