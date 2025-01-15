export default function MiniCartOpen() {
	function onClick() {
		window.dispatchEvent(new CustomEvent("MiniCart:toggle"));
	}
	return (
		<button type="button" onClick={onClick} className="bg-slate-700 rounded py-1 px-2 mb-3">
			remote open MiniCart
		</button>
	);
}
