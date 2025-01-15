declare interface Banner {
	countryIso: CountryCode;
	isMultiLang: boolean;
	languages: Language[];
	locales: Locale[];
	region: Region;
	bannerType: BannerBrandId;
	siteId: string;
	host: string;
	name: string;
}

declare type BannerBrandId = "CS" | "FL" | "KFL";

declare type BannerSiteId = "CS" | "CSCA" | "FL" | "KFL" | `${"FL"}${CountryCode}`;

declare interface Language {
	lang: LanguageKey;
	locale: Locale;
	acceptLanguage: string;
}

declare type CountryCode =
	// | "AT" // Austria
	| "AU" // Australia
	| "BE" // Belgium
	| "CA" // Canada
	// | "CZ" // Czech Republic
	| "DE" // Germany (Deutschland)
	// | "DK" // Denmark
	| "ES" // Spain (España)
	| "FR" // France
	// | "GR" // Greece
	// | "HK" // Hong Kong
	// | "HU" // Hungary
	// | "IE" // Ireland
	| "IT" // Italy
	| "JP" // Japan
	| "KR" // Korea
	| "LU" // Luxembourg
	// | "MO" // Macau
	// | "MY" // Malaysia
	| "NL" // Netherlands
	// | "NO" // Norway
	// | "NZ" // New Zealand
	// | "PL" // Poland
	// | "PT" // Portugal
	// | "SE" // Sweden
	// | "SG" // Singapore
	| "TW" // Taiwan
	| "UK" // United Kingdom
	| "US"; // United States

declare type Region = "NA" | "EMEA" | "APAC";

declare type LanguageKey = "de" | "en" | "es" | "fr" | "it" | "ja" | "ko" | "nl" | "zh";
// declare type Locale = `${LanguageKey}-${CountryCode}`;
declare type Locale =
	| "de-DE"
	| "en-CA"
	| "en-GB"
	| "es-ES"
	| "en-US"
	| "fr-CA"
	| "fr-FR"
	| "it-IT"
	| "ja-JP"
	| "ko-KR"
	| "nl-NL"
	| "zh-TW";
