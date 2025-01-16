import type { APIContext } from "astro";
import { getBannerDomain } from "@BANNER/banner.configs";

export interface FooterResponse {
	footer: Footer[];
}

export interface Footer {
	affiliates?: Affiliate[];
	callouts?: Callout[];
	footerLinks?: FooterLink[];
	properties?: Property[];
	quickLinks?: QuickLink[];
	socialLinks?: SocialLink[];
}

export interface Affiliate {
	title: string;
	logo: string;
	url: string;
	alt: string;
	isNewWindow: boolean;
}

export interface Callout {
	title: string;
	desc: string;
	linkdesc: string;
	linkurl: string;
	isNewWindow: boolean;
}

export interface FooterLink {
	heading: string;
	links: Link[];
}

interface Link {
	desc: string;
	url: string;
	isNewWindow: boolean;
}

export interface Property {
	legal?: string;
	copyright?: string;
}

export interface QuickLink {
	label: string;
	url: string;
	image: string;
	isNewWindow: boolean;
}

export interface SocialLink {
	icon: string;
	url: string;
	alt: string;
	isNewWindow: boolean;
}

export async function GET(ctx: APIContext) {
	const bannerDomain = getBannerDomain(ctx);
	const locale = ctx.currentLocale || ctx.preferredLocale!;
	const lang = ctx.params.locale || locale;
	const route = `${bannerDomain}/api/content/${lang}/footer.details.json`;

	// console.time(`${route} ⏰`);

	const headers: HeadersInit = { "x-api-lang": locale };
	let resp;
	try {
		resp = await fetch(route, { headers }).then((r) => r.json());
	} catch (err) {
		console.error(`Error with route ${route}:`, err);
	}

	const footer = resp?.footer as Footer;
	// console.log("footer:", footer);

	if (!footer || !Array.isArray(footer)) {
		return new Response(null, {
			status: 404,
			statusText: "Not found",
		});
	}

	const data = footer.reduce((all, item) => {
		const [key, val] = Object.entries(item)[0];
		all[key as keyof Footer] = val;
		return all;
	}, {} as Footer);

	// console.timeEnd(`${route} ⏰`);

	return new Response(JSON.stringify(data), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			...(import.meta.env.DEV && { "x-banner-route": route }), // debugging
		},
	});
}
