import React, { type PropsWithChildren } from "react";
import * as Popover from "@radix-ui/react-popover";

export default function MiniCartTrigger({
	children,
	modal,
	open,
}: PropsWithChildren<{ modal?: boolean; open?: boolean }>) {
	const [isOpen, setOpen] = React.useState(!!open);

	function onOpenChange(_open: boolean) {
		// console.log("onOpenChange", { isOpen: _open });
		setOpen(_open);
	}

	function handleToggle() {
		setOpen(!isOpen);
	}
	function onHover() {
		// setTimeout(() => {
		// 	setOpen(true);
		// }, 1200);
	}

	React.useEffect(() => {
		window.addEventListener("MiniCart:toggle", handleToggle);
		return () => {
			window.removeEventListener("MiniCart:toggle", handleToggle);
		};
	}, []);

	return (
		<div onMouseEnter={onHover}>
			{children}

			<Popover.Root modal={modal} open={isOpen} onOpenChange={onOpenChange}>
				<Popover.Trigger></Popover.Trigger>
				<Popover.Anchor />
				<Popover.Portal>
					<Popover.Content className="flex flex-col gap text-black bg-white border border-neutral-200 shadow-lg mr-2">
						<div className="flex gap-4 justify-between items-center p-2 border-b border-b-neutral-500/20">
							<p className="text-sm">Added Nike Club Pullover Hoodie to cart</p>

							<Popover.Close className="">❌</Popover.Close>
						</div>
						<div className="p-2">
							<p className="text-sm">Added Nike Club Pullover Hoodie to cart</p>
							<p>Size: S</p>
							<p>$65.00</p>
						</div>
					</Popover.Content>
				</Popover.Portal>
			</Popover.Root>
		</div>
	);
}
