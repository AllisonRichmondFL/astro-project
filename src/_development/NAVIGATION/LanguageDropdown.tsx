import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import HeaderDropdown from "./HeaderDropdown";
import { getLanguageName } from "@BANNER/locale.configs";

export default function LanguageDropdown({
	children,
	languages,
	locale,
}: React.PropsWithChildren<{ languages: Language[]; locale: string }>) {
	return (
		<HeaderDropdown trigger={children} className="p-2">
			{/* <DropdownMenu.Label /> */}
			{languages?.map((language) => (
				<DropdownMenu.Item key={language.lang} className="p-1.5 text-sm">
					<a
						href={`/${language.lang}/`}
						aria-selected={language.lang === locale}
						className="text-inherit aria-selected:underline hover:text-inherit"
					>
						{getLanguageName(language.locale)}
					</a>
				</DropdownMenu.Item>
			))}
		</HeaderDropdown>
	);
}
