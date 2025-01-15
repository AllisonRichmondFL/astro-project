import { setBannerFromAstro } from "@BANNER/banner.configs";
import { defineMiddleware, sequence } from "astro:middleware";

const bannerDetection = defineMiddleware(async (context, next) => {
	const banner = setBannerFromAstro(context);
	console.log("🏁 bannerDetection:", banner.siteId);
	return next();
});

// const validation = defineMiddleware(async (context, next) => {
// 	console.log("validation request");
// 	const response = await next();

// 	console.log("middleware", {
// 		// cookies: headers.get('cookies'),
// 		// "accept-language": headers.get("accept-language"),
// 		// "user-agent": headers.get("user-agent"),
// 		// currentLocale: context.currentLocale,
// 		// locals: context.locals, // integrations, eg netlify
// 		// params: context.params,
// 		// props: context.props,
// 		// preferredLocale: context.preferredLocale,
// 		// preferredLocaleList: context.preferredLocaleList,
// 		// redirect: context.redirect, // func
// 		// request: context.request,
// 		// rewrite: context.rewrite, // func
// 		// site: context.site,
// 		// url: context.url,
// 	});
// 	console.log("validation response");
// 	return response;
// });

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
	bannerDetection
);
