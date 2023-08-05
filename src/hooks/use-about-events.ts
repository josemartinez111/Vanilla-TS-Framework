// FILE: hooks/use-about-events.ts
// _______________________________________________

import { ProductType } from "../types/types";
import { useLocalStorage } from "../hooks/use-local-storage.ts";

type AboutEventHandlersType = {
	onProductContentClick: (divElement: HTMLDivElement, itemID: number) => void;
	onAddToCartClick: (divElement: HTMLDivElement, item: ProductType) => void;
	onGoBackClick: (divElement: HTMLDivElement) => void;
};

export function useAboutEvents(): AboutEventHandlersType {
	const { localeStorageSetItem } = useLocalStorage();
	
	const onProductContentClick = (divElement: HTMLDivElement, itemID: number) => {
		const productContent = divElement.querySelector('.product-content') as HTMLButtonElement;
		// sends the user to the `about` page when the product content is clicked
		productContent.onclick = () => {
			location.hash = `#about/${ itemID }`;
		};
	};
	
	const onAddToCartClick = (divElement: HTMLDivElement, item: ProductType) => {
		const addToCartButton = divElement.querySelector('.add-to-cart') as HTMLButtonElement;
		
		// Sends the user to the `cart` page when the `Add to Cart` button is clicked
		addToCartButton.onclick = (event: MouseEvent) => {
			// Prevents the event from bubbling up the DOM tree,
			// preventing any parent handlers from being notified of the event
			event.stopPropagation();
			
			// Adds the item to the cart
			localeStorageSetItem(item);
			// Changes the URL hash to navigate to the cart page with the added item
			location.hash = `#cart/${ item.id }`;
		};
	};
	
	
	const onGoBackClick = (divElement: HTMLDivElement) => {
		// Selects the 'Go Back' button within the given div element
		const goBackButton = divElement.querySelector('.go-back') as HTMLButtonElement;
		
		// Defines the action to be taken when the 'Go Back' button is clicked
		goBackButton.onclick = (event: MouseEvent) => {
			// Prevents the click event from bubbling up the DOM tree,
			// avoiding triggering any parent element's handlers of the same event
			event.stopPropagation();
			
			// Changes the URL hash to '#products', effectively
			// navigating back to the product's page
			location.hash = `#products`;
		};
	};
	
	
	return {
		onProductContentClick,
		onAddToCartClick,
		onGoBackClick,
	};
}
