import { setBannerFromAstro } from "@BANNER/banner.configs";
import { defineMiddleware, sequence } from "astro:middleware";

const bannerDetection = defineMiddleware(async (context, next) => {
	const banner = setBannerFromAstro(context);
	// console.log("🏁 bannerDetection:", banner.siteId);
	context.locals.banner = banner;
	return next();
});

const forceLocale = defineMiddleware(async (context, next) => {
	const locale = context.params.locale;
	const currentLocale = context.currentLocale ?? context.preferredLocale!;

	const { banner } = context.locals;
	const { pathname } = context.url;
	const extension = pathname.match(/\.[0-9a-z]+$/i)?.[0];
	const isPage = !extension || extension === "html";

	const foundLanguage = banner.languages.find((l) => l.lang === locale);

	// console.log("🌐", {
	// 	pathname,
	// 	extension,
	// 	isPage,
	// 	// locale,
	// 	currentLocale,
	// 	foundLanguage,
	// });

	if (isPage && !foundLanguage) {
		const redirectTo = `/${currentLocale}${pathname}`;
		console.log("🌐", { redirectTo });
		// return context.redirect("/404");
		return context.redirect(redirectTo);
	}
	return next();
});

const headerData = defineMiddleware(async (context, next) => {
	const { pathname } = context.url;
	const extension = pathname.match(/\.[0-9a-z]+$/i)?.[0];
	const isPage = !extension || extension === "html";
	// console.log("🐕 fetch headerData?", { pathname, extension, isPage });
	if (isPage) {
		// console.log("headerData middleware", {
		// 	// "accept-language": context.headers.get("accept-language"),
		// 	// "user-agent": context.headers.get("user-agent"),
		// 	// locals: context.locals, // integrations, eg netlify
		// 	params: context.params,
		// 	props: context.props,
		// 	href: context.url.href,
		// 	// request: context.request,
		// });
		try {
			const route = new URL("/header.json", context.url);
			// console.log("🐕 fetch headerData?", { pathname });
			const header = await fetch(route).then((r) => r.json());
			context.locals.header = header;
		} catch (err) {
			console.error(err);
		}
	}
	return next();
});

// const auth = defineMiddleware(async (context, next) => {
// 	console.log("auth request");
// 	const response = await next();
// 	console.log("context", {
// 		// request: context.request,
// 		// href: context.url.href,
// 		hostname: context.url.hostname,
// 		// url: context.url,
// 	});
// 	context.locals.title = "New title";
// 	console.log("auth response");
// 	return response;
// });

// const greeting = defineMiddleware(async (context, next) => {
// 	// console.log("👋 greeting", {
// 	// 	url: context.request.url,
// 	// 	params: context.params,
// 	// 	preferredLocale: context.preferredLocale,
// 	// 	preferredLocaleList: context.preferredLocaleList,
// 	// 	props: context.props,
// 	// });
// 	const response = await next();
// 	console.log("👋 greetings! response.body:", response.body);
// 	return response;
// });

// const sanitize = defineMiddleware(async (_context, next) => {
// 	console.group("sanitize request");
// 	const response = await next();
// 	const html = await response.text();
// 	const redactedHtml = html.replaceAll("PRIVATE INFO", "<strike>REDACTED</strike>");
// 	console.log("sanitize response");
// 	console.groupEnd();
// 	return new Response(redactedHtml, {
// 		status: 200,
// 		headers: response.headers,
// 	});
// });

// export const onRequest = sequence(validation, auth, sanitize);
// export const onRequest = sequence(bannerDetection);

export const onRequest = sequence(
	// greeting
	bannerDetection,
	forceLocale,
	headerData
);
