import { I18n } from './i18n';

describe('I18n Utility', () => {
	const dictionary = [
		{ key: '_TESTBasic_', value: 'Basic' },
		{ key: '_TESTReplaceSingle_', value: 'Replace single {0}' },
		{ key: '_TESTReplaceMultiple_', value: 'Replace multiple {0} - {1}' },
	];

	it('should return empty strings for nonexistent keys', () => {
		I18n.injectDictionary(dictionary);
		expect(I18n.get('_YabbaDabbaDoo_')).toEqual('');
	});

	it('should inject new dictionary items', () => {
		I18n.injectDictionary(dictionary);
		expect(I18n.get('_TESTBasic_')).toEqual('Basic');
		expect(I18n.get('_TESTReplaceSingle_', 'test')).toEqual('Replace single test');
		expect(I18n.get('_TESTReplaceSingle_', 0)).toEqual('Replace single 0');
		expect(I18n.get('_TESTReplaceSingle_', { name: 'test' }))
			.toEqual('Replace single {"name":"test"}');
		expect(I18n.get('_TESTReplaceMultiple_', [3, 5])).toEqual('Replace multiple 3 - 5');
	});

	it('should rebuild the dictionary', () => {
		I18n.buildDictionary('es-ES', dictionary);
		I18n.injectDictionary(dictionary);
		expect(I18n.get('_TESTBasic_')).toEqual('Basic');
		expect(I18n.get('_TESTReplaceSingle_', 'test')).toEqual('Replace single test');
		expect(I18n.get('_TESTReplaceSingle_', 0)).toEqual('Replace single 0');
		expect(I18n.get('_TESTReplaceSingle_', { name: 'test' }))
			.toEqual('Replace single {"name":"test"}');
		expect(I18n.get('_TESTReplaceMultiple_', [3, 5])).toEqual('Replace multiple 3 - 5');
	});
});
