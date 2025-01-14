import { getBannerDomain, getBannerFromAstro } from "@BANNER/banner.configs";
import { objectToParams } from "@utils/search";
import type { APIRoute } from "astro";

export const GET: APIRoute = async (ctx) => {
	const { searchParams } = ctx.url;
	const banner = getBannerFromAstro(ctx);

	const useConstructorSearch = true; // false; //
	const version = searchParams.get("version") || (useConstructorSearch ? "v3" : "v2");

	const params = objectToParams({
		currentPage: searchParams.get("currentPage") || 0,
		query: searchParams.get("query"),
		pageSize: searchParams.get("pageSize") || 48,
		pageType: searchParams.get("pageType") || "browse",
		sort: searchParams.get("sort") || "relevance",
	});
	// const searchRoute = `${getBannerDomain(ctx)}/zgw/search-core/products/${version}/search?${params}`;
	// const searchRoute = `https://services.product.uat.int.footlocker.com/search-core/products/${version}/search?${params}`;
	const searchRoute = `${ctx.url.origin}/search-core/products/${version}/search?${params}`;
	console.log("/search.json ➡", searchRoute);

	// const locale = ctx.currentLocale || "en-US";
	const locale = "en-US";
	const headers: HeadersInit = {
		"x-api-lang": locale,
		"Accept-Language": banner.languages[0].acceptLanguage,
		"x-flgw-siteId": banner.siteId,
	};
	console.log("/search.json ➡ headers:", headers);

	const response = await fetch(searchRoute, { headers });
	const resp = await response.json();

	console.log(
		"/search.json response:",
		// Object.keys(resp),
		{
			errors: resp?.errors,
			keywordRedirectUrl: resp?.keywordRedirectUrl,
			freeTextSearch: resp?.freeTextSearch,
			currentQuery: resp?.currentQuery,
			queryID: resp?.queryID,
			// metaData: resp?.metaData,
		}
	);
	return new Response(JSON.stringify(resp), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
};
