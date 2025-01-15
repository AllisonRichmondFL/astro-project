const COUNTRY_DEFAULT: CountryCode = "US";

export const LANG: Record<Locale, Language> = {
	"de-DE": {
		lang: "de",
		locale: "de-DE",
		acceptLanguage: "de-DE,de;q=0.8",
	},
	"en-CA": {
		lang: "en",
		locale: "en-CA",
		acceptLanguage: "en-CA,en;q=0.9",
	},
	"en-GB": {
		lang: "en",
		locale: "en-GB",
		acceptLanguage: "en-GB,en;q=0.9",
	},
	"en-US": {
		lang: "en",
		locale: "en-US",
		acceptLanguage: "en-US,en;q=0.5",
	},
	"es-ES": {
		lang: "es",
		locale: "es-ES",
		acceptLanguage: "es-ES,en;q=0.8",
	},
	"fr-CA": {
		lang: "fr",
		locale: "fr-CA",
		acceptLanguage: "fr-CA,en;q=0.8",
	},
	"fr-FR": {
		lang: "fr",
		locale: "fr-FR",
		acceptLanguage: "fr-FR,en;q=0.8",
	},
	"it-IT": {
		lang: "it",
		locale: "it-IT",
		acceptLanguage: "it-IT,en;q=0.8",
	},
	"ja-JP": {
		lang: "ja",
		locale: "ja-JP",
		acceptLanguage: "ja-JP,en;q=0.9",
	},
	"ko-KR": {
		lang: "ko",
		locale: "ko-KR",
		acceptLanguage: "ko-KR,en;q=0.9",
	},
	"nl-NL": {
		lang: "nl",
		locale: "nl-NL",
		acceptLanguage: "nl-NL,en;q=0.9",
	},
	"zh-TW": {
		lang: "zh",
		locale: "zh-TW",
		acceptLanguage: "zh-TW,en;q=0.9",
	},
};

function configure(countryIso: CountryCode, region: Region, locales: Locale[]) {
	return {
		countryIso,
		isMultiLang: locales.length > 1,
		languages: locales.map((locale) => LANG[locale]),
		locales,
		region,
	};
}

const GEO = {
	// AT: // Austria
	AU: configure("AU", "APAC", ["en-GB"]), // Australia
	BE: configure("BE", "EMEA", ["en-GB", "fr-FR", "nl-NL"]), // Belgium
	CA: configure("CA", "NA", ["en-CA", "fr-CA"]), // Canada
	// CZ: // Czech Republic
	DE: configure("DE", "EMEA", ["en-GB", "de-DE"]), // Germany (Deutschland)
	// DK: // Denmark
	ES: configure("ES", "EMEA", ["en-GB", "es-ES"]), // Spain (España)
	FR: configure("FR", "EMEA", ["en-GB", "fr-FR"]), // France
	// GR: // Greece
	// HK: // Hong Kong
	// HU: // Hungary
	// IE: // Ireland
	IT: configure("IT", "EMEA", ["en-GB", "it-IT"]), // Italy
	JP: configure("JP", "APAC", ["en-GB", "ja-JP"]), // Japan
	KR: configure("KR", "APAC", ["en-GB", "ko-KR"]), // Korea
	LU: configure("LU", "EMEA", ["en-GB", "fr-FR", "de-DE"]), // Luxembourg
	// MO: // Macau
	// MY: // Malaysia
	NL: configure("NL", "EMEA", ["en-GB", "nl-NL"]), // Netherlands
	// NO: // Norway
	// NZ: // New Zealand
	// PL: // Poland
	// PT: // Portugal
	// SE: // Sweden
	// SG: // Singapore
	TW: configure("TW", "APAC", ["en-GB", "zh-TW"]), // Taiwan
	UK: configure("UK", "EMEA", ["en-GB"]), // United Kingdom
	US: configure("US", "NA", ["en-US"]), // United States
};

/**
 * create a list of all unique locales
 */
export const allLocales = Object.keys(LANG) as Locale[];
// console.log("🏁🏴‍☠️🏳️‍🌈 SET allLocales:", allLocales.length, allLocales);

/**
 * create a list of all unique langs
 */
export const allLangs = [...new Set(allLocales.map((locale) => locale.split("-")[0] as LanguageKey, []))];
// console.log("🏁🏴‍☠️🏳️‍🌈 SET allLangs:", allLangs.length, allLangs);

// UTLS ///////////////////////////////////////////////////

export function getCountryNameFromLocale(locale: Locale) {
	const { lang, country } = getLangCountryFromLocale(locale);
	const name = new Intl.DisplayNames([lang], { type: "region" }).of(country);
	// console.log("🌐 getCountryNameFromLocale:", { country, lang, name });
	return name || "";
}

export function getCountryNameFromIsocode(countryIso: CountryCode) {
	const { locales } = getGeoConfigs(countryIso);
	const name = new Intl.DisplayNames(locales, { type: "region" }).of(countryIso);
	// console.log("🌐 getCountryNameFromIsocode:", { country, locales, name });
	return name || "";
}

export function countryNameFromIso(countryIso: CountryCode) {
	const name = getCountryNameFromIsocode(countryIso);
	return name || countryIso;
}

export function getLanguageName(locale: Locale) {
	const { lang } = getLangCountryFromLocale(locale);
	const name = new Intl.DisplayNames([locale], { type: "language" }).of(lang);
	// console.log("🌐 getLanguageName:", { lang, locale, name });
	return name || lang;
}

export function getLangCountryFromLocale(locale: Locale) {
	const [lang, country] = locale.split("-") as [LanguageKey, CountryCode];
	return { lang, country };
}

export function getGeoConfigs(countryIso: CountryCode) {
	return (countryIso && GEO[countryIso]) || GEO[COUNTRY_DEFAULT];
}
