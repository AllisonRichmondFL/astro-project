import { type FormattedPdpModel } from "@PRODUCT/utils";
export { default as AddToCart } from "@PRODUCT/components/AddToCart";
export { PdpColorways } from "@PRODUCT/components/PdpColorways";
export { PdpFulfillment } from "@PRODUCT/components/PdpFulfillment";
export { PdpGallery } from "@PRODUCT/components/PdpGallery";
export { PdpSizes } from "@PRODUCT/components/PdpSizes";
export { ProductImage } from "@PRODUCT/components/ProductImage";
export { ProductPrice } from "@PRODUCT/components/ProductPrice";

export function PdpHeader({
	className,
	model,
}: {
	className: string;
	model: FormattedPdpModel;
}) {
	return (
		<header className={className}>
			<h1 className="text-2xl font-black">{model.name}</h1>
			<p className="text-sm mb-1">{model.gender}</p>
			<p className="text-sm">
				<a
					href={`/category/brands/${model.brand}`}
					className="text-inherit underline"
				>
					Explore {model.brand}
				</a>
			</p>
		</header>
	);
}
