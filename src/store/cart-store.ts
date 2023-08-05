// FILE: store/cart-store.ts
// _______________________________________________

import { ProductType } from "../types/types";

export type CartStoreReturnType = {
	getCartStore: () => Array<ProductType>;
	removeFromCartStore: (id: number) => void;
	addToCartStore: (item: ProductType) => void
}

export function useCartStore(): CartStoreReturnType {
	
	let cartItems: Array<ProductType> = [];
	
	// Load the initial state of the cart from localStorage
	const storedValue: string | null = localStorage.getItem('cart');
	
	if (storedValue) cartItems = JSON.parse(storedValue);
	
	const saveCartToLocalStorage = (): void => {
		localStorage.setItem('cart', JSON.stringify(cartItems));
	};
	
	const addToCartStore = (item: ProductType): void => {
		cartItems.push(item);
		saveCartToLocalStorage();
	};
	
	const removeFromCartStore = (id: number): void => {
		cartItems = cartItems.filter(item => item.id !== id);
		saveCartToLocalStorage();
	};
	
	const getCartStore = (): Array<ProductType> => cartItems;
	
	
	return {
		addToCartStore,
		removeFromCartStore,
		getCartStore,
	};
}
