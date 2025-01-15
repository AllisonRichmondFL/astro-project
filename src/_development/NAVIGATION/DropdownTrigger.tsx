import clsx from "clsx";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function DropdownTrigger({ children, open }: React.PropsWithChildren<{ open?: boolean }>) {
	return (
		<DropdownMenu.Trigger className="flex gap-1.5 items-center py-1 px-1.5 text-sm rounded text-inherit hover:bg-neutral-100 hover:no-underline aria-expanded:bg-neutral-100">
			{children}{" "}
			<svg
				className={clsx("transition-transform duration-300", { "rotate-180": open })}
				width="11"
				height="11"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d="M11.98 18.45L0 6.46l1.41-1.4L12 15.61 22.59 5l1.42 1.41-12.03 12.04z" />
			</svg>
		</DropdownMenu.Trigger>
	);
}
