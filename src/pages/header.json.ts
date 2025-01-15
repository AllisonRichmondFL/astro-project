import type { APIContext } from "astro";
import { getBannerDomain } from "@BANNER/banner.configs";

export interface HeaderResponse {
	header: Header[];
}

export interface Header {
	headerSection?: HeaderSection[];
	headerLinks?: HeaderLink[];
}

export interface HeaderLink {
	name: string;
	linkPath: string;
}

export interface HeaderSection {
	name: string;
	categories: Category[];
	linkPath?: string;
}

export interface Category {
	name: string;
	hidden: boolean;
	expandByDefault?: boolean;
	type: "icons" | "list" | "promoLinks";
	links: Link[];
	"sub-categories": unknown[];
	style?: string;
	linkPath?: string;
}

export interface Link {
	shopAll?: boolean;
	text?: string;
	url: string;
	icon?: Icon;
	image?: string;
}

export interface Icon {
	name: string;
	url: string;
}

export interface Results {
	components: unknown[];
	links: HeaderLink[];
	sections: HeaderSection[];
}

export async function GET(ctx: APIContext) {
	const bannerDomain = getBannerDomain(ctx);
	const locale = ctx.currentLocale || ctx.preferredLocale!;
	const lang = ctx.params.locale || locale;
	const route = `${bannerDomain}/api/content/${lang}/header.details.json`;

	console.time(route);

	const headers: HeadersInit = { "x-api-lang": locale };
	let resp;
	try {
		resp = await fetch(route, { headers }).then((r) => r.json());
	} catch (err) {
		console.error(`Error with route ${route}:`, err);
	}

	const header = resp?.header as Header;
	// console.log("resp.header:", header);

	if (!header || !Array.isArray(header)) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	let data = header;

	const initial = {
		components: [] as unknown[],
		links: [] as HeaderLink[],
		sections: [] as HeaderSection[],
	} as Results;

	data = header.reduce((all, item, i) => {
		if (item.zone) {
			all.components.push(item);
			return all;
		}
		if ("headerLinks" in item) {
			all.links.push(...item.headerLinks);
		} else if ("headerSection" in item) {
			all.sections.push(...item.headerSection);
		}
		return all;
	}, initial);

	console.timeEnd(route);

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
		},
	});
}
