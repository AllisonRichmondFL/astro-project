import { defineConfig } from "astro/config";
import node from '@astrojs/node';
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const REMOTE_ENV = process.env.REMOTE_ENV || "uat"; // "prd";
console.log("👉", { REMOTE_ENV });

// https://astro.build/config
export default defineConfig({
	adapter: node({
		mode: "standalone",
	}),
	i18n: {
		defaultLocale: "en",
		// locales: [ "en-US", "en-GB", "en-CA", "fr-CA", "fr-FR", "de-DE", "it-IT", "ko-KR" ],
		locales: [
			{
				path: "en",
				codes: ["en", "en-US", "en-CA", "en-GB"],
			},
			{
				path: "de",
				codes: ["de", "de-DE"],
			},
			{
				path: "fr",
				codes: ["fr", "fr-CA", "fr-FR"],
			},
			{
				path: "it",
				codes: ["it", "it-IT"],
			},
			// {
			// 	path: "ko",
			// 	codes: ["ko", "ko-KR"],
			// },
		],
		fallback: {
			de: "en",
			fr: "en",
			it: "en",
			// ko: "en",
		},
		// routing: "manual", // use with https://docs.astro.build/en/guides/internationalization/#middleware-function
		routing: {
			redirectToDefaultLocale: true,
			prefixDefaultLocale: false,
			fallbackType: "redirect",
		},
	},
	integrations: [
		partytown(),
		react(),
		tailwind({
			// Example: Disable injecting a basic `base.css` import on every page.
			// Useful if you need to define and/or import your own custom `base.css`.
			// applyBaseStyles: false,
		}),
	],
	output: "server",
	server: { headers: {}, open: "/" },
	vite: {
		server: {
			proxy: {
				"/search-core": {
					target: `https://services.product.${REMOTE_ENV}.int.footlocker.com/`,
					changeOrigin: true,
					secure: false,
				},
				// "/product-core": {
				// 	target: `https://services.product.${REMOTE_ENV}.int.footlocker.com/`,
				// 	changeOrigin: true,
				// 	secure: false,
				// },
				"/zgw": {
					target: `https://www.uat2.origin.footlocker.com/`,
					changeOrigin: true,
					secure: false,
				},
			},
		},
	},
	domains: {
		"de": "https://www.footlocker.de",
		"fr": "https://www.footlocker.fr",
		"fr-CA": "https://www.footlocker.ca/fr/",
		"fr-FR": "https://www.footlocker.fr",
	},
});
