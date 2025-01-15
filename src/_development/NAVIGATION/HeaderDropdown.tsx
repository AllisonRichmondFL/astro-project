import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import DropdownTrigger from "./DropdownTrigger";
import { twMerge } from "tailwind-merge";

export default function HeaderDropdown({
	children,
	className,
	trigger,
}: React.PropsWithChildren<{ className?: string; trigger: React.ReactNode }>) {
	return (
		<DropdownMenu.Root>
			<DropdownTrigger>{trigger}</DropdownTrigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					align="end"
					className={twMerge(
						"flex flex-col py-2 px-3 text-black bg-white border border-neutral-200 shadow-lg mt-1",
						className
					)}
				>
					{children}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
