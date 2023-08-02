// FILE: hooks/use-about-events.ts
// _______________________________________________

type AboutEventHandlersType = {
	onProductContentClick: (divElement: HTMLDivElement, itemID: number) => void;
	onAddToCartClick: (divElement: HTMLDivElement, itemID: number) => void;
	onGoBackClick: (divElement: HTMLDivElement) => void;
};

export function useAboutEvents(): AboutEventHandlersType {
	const onProductContentClick = (divElement: HTMLDivElement, itemID: number) => {
		const productContent = divElement.querySelector('.product-content') as HTMLButtonElement;
		// sends the user to the `about` page when the product content is clicked
		productContent.onclick = () => {
			location.hash = `#about/${ itemID }`;
		};
	};
	
	const onAddToCartClick = (divElement: HTMLDivElement, itemID: number) => {
		const addToCartButton = divElement.querySelector('.add-to-cart') as HTMLButtonElement;
		// sends the user to the `cart` page when the `Add to Cart` button is clicked
		addToCartButton.onclick = (event: MouseEvent) => {
			event.stopPropagation();
			location.hash = `#cart/${ itemID }`;
		};
	};
	
	const onGoBackClick = (divElement: HTMLDivElement) => {
		const goBackButton = divElement.querySelector('.go-back') as HTMLButtonElement;
		// sends the user back to the `products` page when the `Go Back` button is clicked
		goBackButton.onclick = (event: MouseEvent) => {
			event.stopPropagation();
			location.hash = `#products`;
		};
	};
	
	return {
		onProductContentClick,
		onAddToCartClick,
		onGoBackClick,
	};
}
