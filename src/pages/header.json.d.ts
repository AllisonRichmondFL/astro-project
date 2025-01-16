declare interface HeaderResponse {
	header: Header[];
}

declare interface Header {
	headerSection?: HeaderSection[];
	headerLinks?: HeaderLink[];
}

declare interface HeaderLink {
	name: string;
	linkPath: string;
}

declare interface HeaderSection {
	name: string;
	categories: Category[];
	linkPath?: string;
}

declare interface Category {
	name: string;
	hidden: boolean;
	expandByDefault?: boolean;
	type: "icons" | "list" | "promoLinks";
	links: Link[];
	"sub-categories": unknown[];
	style?: string;
	linkPath?: string;
}

declare interface Link {
	shopAll?: boolean;
	text?: string;
	url: string;
	icon?: Icon;
	image?: string;
}

declare interface Icon {
	name: string;
	url: string;
}

declare interface SearchResults {
	components: unknown[];
	links: HeaderLink[];
	sections: HeaderSection[];
}
