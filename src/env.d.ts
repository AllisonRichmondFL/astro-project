/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="./_foundation/BANNER/banner.configs.d.ts" />

interface ImportMetaEnv {
	readonly PUBLIC_BANNER: string;
	readonly PUBLIC_REMOTE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		title: string;
		banner: Banner;
	}
}
