import { getGeoConfigs } from "@BANNER/locale.configs";
import type { APIContext, AstroGlobal } from "astro";

/**
 * Banner Detection Scenarios
 * ==========================
 * DATA:
 * server request => host => domain
 * window location => host => domain
 */

export const banners = {
	CS: {
		bannerType: "CS" as BannerBrandId,
		siteId: "CS",
		host: "champssports.com",
		name: "Champs Sports",
		...getGeoConfigs("US"),
	},
	FL: {
		bannerType: "FL" as BannerBrandId,
		siteId: "FL",
		host: "footlocker.com",
		name: "Foot Locker",
		...getGeoConfigs("US"),
	},
	FLCA: {
		bannerType: "FL" as BannerBrandId,
		siteId: "FLCA",
		host: "footlocker.ca",
		name: "Foot Locker Canada",
		...getGeoConfigs("CA"),
	},
	KFL: {
		bannerType: "KFL" as BannerBrandId,
		siteId: "KFL",
		host: "kidsfootlocker.com",
		name: "Kids Foot Locker",
		...getGeoConfigs("US"),
	},
	// EMEA //
	FLLU: {
		bannerType: "FL" as BannerBrandId,
		siteId: "FLLU",
		host: "footlocker.lu",
		name: "Foot Locker Luxembourg",
		...getGeoConfigs("LU"),
	},
	// APAC //
	FLAU: {
		bannerType: "FL" as BannerBrandId,
		siteId: "FLAU",
		host: "footlocker.com.au",
		name: "Foot Locker Australia",
		...getGeoConfigs("AU"),
	},
};

export const BANNER_DEFAULT = "FL";
export const SITE_ID_COOKIE = "siteId";

export function getBannerFromId(id: string | undefined): Banner {
	return banners[id as keyof typeof banners] || banners[BANNER_DEFAULT];
}

export function getValidHostname(url: URL) {
	const banner = Object.values(banners).find((b) => b.host === url.hostname);
	return banner?.host;
}

export function getBannerHost({ cookies, url }: APIContext) {
	const hostname = getValidHostname(url);
	if (hostname) return hostname;

	const cookie = cookies?.get(SITE_ID_COOKIE)?.value;
	const id = cookie || import.meta.env.PUBLIC_BANNER;
	return getBannerFromId(id)?.host;
}

export function getBannerDomain(ctx: APIContext) {
	const remote = import.meta.env.PUBLIC_REMOTE || "uat2";
	const subdomains = import.meta.env.PROD ? "" : `${remote}.origin.`;

	const host = getBannerHost(ctx);
	return `https://www.${subdomains}${host}`;
}

export function getBannerConfigFromHost(hostname: string) {
	const obj = Object.values(banners).find((b) => b.host === hostname);
	return obj || banners[BANNER_DEFAULT];
}

export function getBannerFromHost(hostname: string) {
	const obj = Object.values(banners).find((b) => b.host === hostname);
	return obj?.siteId || BANNER_DEFAULT;
}
/**
 * 1) get siteId from search params, eg `?siteId=FLCA`; derive banner object
 * 2) get stored banner object cookie & parse
 * 3) get banner object from stored siteId cookie; derive banner object
 */
export function getBannerFromAstro({ cookies, url }: Pick<AstroGlobal, "cookies" | "url">) {
	const searchParam = url.searchParams.get(SITE_ID_COOKIE);
	const idCookie = cookies.get(SITE_ID_COOKIE)?.value;

	const banner = getBannerFromId(searchParam || idCookie);
	return banner;
}

export function setBannerFromAstro({
	cookies,
	isPrerendered,
	url,
}: Pick<AstroGlobal, "cookies" | "isPrerendered" | "url">) {
	const param = url.searchParams.get(SITE_ID_COOKIE);

	const cookie = isPrerendered ? undefined : cookies.get(SITE_ID_COOKIE)?.value;

	// console.log("🏁 setBannerFromAstro", { param, isPrerendered, cookie, url });

	let siteId = param || cookie || BANNER_DEFAULT;
	// console.log("🏁 setBannerFromAstro", Astro.request.method, { siteId });

	if (!isPrerendered) {
		cookies.set(SITE_ID_COOKIE, siteId, { path: "/" });
	}

	const banner = getBannerFromId(siteId);
	return banner;
}
