// FILE: hooks/use-cart-data.ts
// _______________________________________________

import { ProductType } from "../types/types";

export type CartDataType = {
	productData: ProductType;
	bindGoBackButton: (divElement: HTMLDivElement) => void;
	paypalIcon: string;
	applePayIcon: string;
};

/**
 * @useCartData
 * is a custom hook that prepares the data for the cart component,
 * and provides a function to bind a click event to the "Go Back" button.
 * @returns {CartDataType} An object containing the product data,
 * a function to bind the "Go Back" button, and the icons for payment options.
 */
export function useCartData(): CartDataType {
	const paypalIcon = "/assets/images/paypal.png";
	const applePayIcon = "/assets/images/apple-pay.png";
	
	const defaultProduct: ProductType = {
		title: 'No items in your cart',
		price: 0.0,
		image: '/assets/images/white_amz_cart.png',
		category: '',
		description: '',
	};
	
	const bindGoBackButton = (divElement: HTMLDivElement) => {
		const goBackButton = divElement.querySelector('.go-back') as HTMLButtonElement;
		goBackButton.onclick = (event) => {
			event.stopPropagation();
			location.hash = `#products`;
		};
	};
	
	return {
		productData: defaultProduct,
		bindGoBackButton,
		paypalIcon,
		applePayIcon,
	};
}
