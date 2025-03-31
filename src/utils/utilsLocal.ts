import en from '../../locales/en.json';

type LocalizedContent = {
	[key: string]: string | LocalizedContent;
};
// NOTE: Placeholder for translation function juste to keep messages in legacy
// noinspection JSUnusedGlobalSymbols
export function utilsLocal() {
	const messages: { [locale: string]: LocalizedContent } = { en };

	function getLocale(): string {
		return 'en';
	}

	function t(key: string, values?: Record<string, any>): string {
		const locale = getLocale();
		const translation = key
			.split('.')
			.reduce<LocalizedContent | string>((obj, k) => {
				if (obj && typeof obj === 'object') {
					return obj[k];
				}
				return obj;
			}, messages[locale] || messages['en']);

		if (!translation) return key;

		if (typeof translation === 'string') {
			return translation.replace(/\{(\w+)\}/g, (_, key: string) => {
				console.log('key', key);
				console.log('values', values);

				return typeof values === 'object' && values !== null
					? (Object.values(values)[0] as string)
					: JSON.stringify(values);
			});
		}
		if (typeof translation === 'object') {
			return Object.keys(translation)
				.map((k) => `${k}: ${translation[k]}`)
				.join(', ');
		}
		return translation;
	}

	return { t };
}
