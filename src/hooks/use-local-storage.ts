// FILE: hooks/use-local-storage.ts
// _______________________________________________

import { LocalStorageReturnType } from "../types/local-storage";
import { ProductType } from "../types/types";

/**
 * @useLocalStorage
 * is a custom hook that interacts with the localStorage API.
 * It provides functions to get, set, and remove items from the localStorage.
 * @returns {LocalStorageReturnType} An object containing functions to interact with the localStorage.
 */
export function useLocalStorage(): LocalStorageReturnType {
	const localeStorageGetItem = (): Array<ProductType> => {
		const storedValue: string | null = localStorage.getItem('cart');
		
		// Parse the stored value if it exists, otherwise return an empty array
		const result = storedValue
			? JSON.parse(storedValue)
			: [] as Array<ProductType>;
		
		return result;
	};
	
	const localeStorageSetItem = (value: ProductType): void => {
		const currentItems = localeStorageGetItem();
		
		// Add the new value to the current items and update localStorage
		currentItems.push(value);
		localStorage.setItem('cart', JSON.stringify(currentItems));
	};
	
	// Function to remove an item from 'cart' in localStorage
	const localeStorageRemoveItem = (id: number): void => {
		let currentItems = localeStorageGetItem();
		
		// Filter out the item with the given ID
		currentItems = currentItems.filter(item => item.id !== id);
		
		// Update localStorage with the filtered array
		localStorage.setItem('cart', JSON.stringify(currentItems));
	};
	
	
	return {
		localeStorageGetItem,
		localeStorageSetItem,
		localeStorageRemoveItem,
	};
}
