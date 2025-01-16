import clsx from "clsx";

const DEFAULT_WIDTH = 100;

export function setImageDimensions(url: string, height = 200, width = height) {
	if (!url || typeof url !== "string") return "";
	try {
		const _height = height ?? width ?? DEFAULT_WIDTH;
		const _width = width ?? height ?? DEFAULT_WIDTH;

		const imgSrc = new URL(url);
		imgSrc.searchParams.set("hei", _height.toString());
		imgSrc.searchParams.set("wid", _width.toString());
		return imgSrc.toString();
	} catch (err) {
		console.error(err);
		return "";
	}
	// return `https://images.footlocker.com/is/image/EBFL2/${sku}?wid=${width}&hei=${height}`;
}

export default function ProductImage({ className, sku, src, height, width, ...rest }: Props) {
	const fileSrc = src || (sku && `https://images.footlocker.com/is/image/EBFL2/${sku}`)!;

	const imgSrc = setImageDimensions(fileSrc, height, width);
	if (!imgSrc) return null;

	return <img {...rest} className={clsx("block w-full h-auto", className)} src={imgSrc} />;
}

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
	alt: string;
	src?: string;
	sku?: string;
	height: number;
	width?: number | undefined;
}
