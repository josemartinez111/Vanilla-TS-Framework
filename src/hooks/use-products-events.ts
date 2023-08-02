// FILE: hooks/use-product-events.ts
// _______________________________________________

/**
 * useProductEvents is a custom hook that assigns event handlers to the product content
 * and the 'Add to Cart' button in a product div element. When the product content is clicked,
 * it changes the hash to '#about/product.id', and when the 'Add to Cart' button is clicked,
 * it changes the hash to '#cart/product.id'.
 *
 * @param {HTMLDivElement} productDivElement - The div element of a product.
 * @param {number} productId - The id of a product.
 */
export function useProductEvents(productDivElement: HTMLDivElement, productId: number): void {
	const productContent = productDivElement.querySelector('.product-content') as HTMLButtonElement;
	productContent.onclick = () => {
		location.hash = `#about/${ productId }`;
	};
	
	const addToCartButton = productDivElement.querySelector('.add-to-cart') as HTMLButtonElement;
	addToCartButton.onclick = (event) => {
		event.stopPropagation();
		location.hash = `#cart/${ productId }`;
	};
}
