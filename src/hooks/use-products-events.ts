// FILE: hooks/use-product-events.ts
// _______________________________________________

type ProductEventType = {
	onAddToCartButtonClick: (productDivElement: HTMLDivElement, productId: number) => void;
	onProductContentClick: (productDivElement: HTMLDivElement, productId: number) => void;
}

export function useProductEvents(): ProductEventType {
	const onProductContentClick = (productDivElement: HTMLDivElement, productId: number) => {
		const productContent = productDivElement.querySelector('.product-content') as HTMLButtonElement;
		
		productContent.onclick = () => {
			location.hash = `#about/${ productId }`;
		};
	};
	
	const onAddToCartButtonClick = (productDivElement: HTMLDivElement, productId: number) => {
		const addToCartButton = productDivElement.querySelector('.add-to-cart') as HTMLButtonElement;
		
		addToCartButton.onclick = (event: Event) => {
			event.stopPropagation();
			location.hash = `#cart/${ productId }`;
		};
	};
	
	return {
		onProductContentClick,
		onAddToCartButtonClick,
	};
}
