import i18next from 'i18next';
import enSentara from '../locale/en-sentara.json';
import fr from '../locale/fr.json';

jest.unmock('i18next');
jest.spyOn(i18next, 'init');

describe('initLangConfig', () => {
	it('should use i18next.init with BRAND set to sentara', () => {
		require('../initLangConfig');
		expect(i18next.init).toHaveBeenCalledWith({
			compatibilityJSON: 'v3',
			debug: true,
			fallbackLng: ['en'],
			resources: { en: enSentara, fr: fr },
		});
	});
});
