// FILE: hooks/use-cart-data.ts
// _______________________________________________

import { ProductType } from "../types/types";
import { useFakeStoreApi } from "../api/use-fake-store-api";

// Define the return type for the useCartData hook
export type CartDataType = {
	// Data for all products in the cart
	productData: ProductType[];
	// Function to handle the click event of the "Go Back" button
	bindGoBackButton: (divElement: HTMLDivElement) => void;
	// URL of the PayPal icon
	paypalIcon: string;
	// URL of the Apple Pay icon
	applePayIcon: string;
};

/**
 * @useCartData
 * is a custom hook that prepares the data for the cart component,
 * fetches product data for all items in the cart,
 * and provides a function to bind a click event to the "Go Back" button.
 * @returns {CartDataType} An object containing the product data for all items in the cart,
 * a function to bind the "Go Back" button, and the icons for payment options.
 */
export async function useCartData(): Promise<CartDataType> {
	// URLs for the payment icons
	const paypalIcon = "/assets/images/paypal.png";
	const applePayIcon = "/assets/images/apple-pay.png";
	
	// Fetch the items in the cart from localStorage
	const { fetchAllCartItems, fetchSingleProduct } = useFakeStoreApi();
	// Get the array of product IDs from localStorage
	const cartItems = await fetchAllCartItems();
	
	// Define a default product data
	const defaultProductData: ProductType = {
		title: 'No items in your cart',
		price: 0.0,
		image: '/assets/images/white_amz_cart.png',
		category: '',
		description: '',
	};
	
	// Initialize the product data with default value
	let productData: ProductType[] = [defaultProductData];
	
	// If there are items in the cart, fetch the product data for each item
	if (cartItems.length > 0) {
		productData = await Promise.all(
			cartItems.map((id: ProductType) => (
				fetchSingleProduct(Number(id))
			)));
	}
	
	// Define the function to handle the click event of the "Go Back" button
	const bindGoBackButton = (cartItemElement: HTMLDivElement) => {
		const goBackButton = cartItemElement.querySelector('.go-back') as HTMLButtonElement;
		
		// Check if the button exists before trying to bind an event
		if (!goBackButton) {
			console.error('Could not bind event. Go Back button does not exist.');
		} else {
			goBackButton.onclick = (event: MouseEvent) => {
				// Prevents the event from propagating (stops the event from being captured and bubbling up)
				event.stopPropagation();
				// Changes the current URL to the product's page
				location.hash = `#products`;
			};
		}
	};
	
	return {
		productData,
		bindGoBackButton,
		paypalIcon,
		applePayIcon,
	};
}
