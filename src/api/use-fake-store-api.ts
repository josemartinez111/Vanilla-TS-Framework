// FILE: src/api/use-fake-store-api.ts
// _______________________________________________

import { ProductListType, ProductType } from "../types/types";

export function useFakeStoreApi() {
	const fetchAllProducts = async (): Promise<ProductListType> => {
		const response = await fetch('https://fakestoreapi.com/products');
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const fetchSingleProduct = async (id: number): Promise<ProductType> => {
		// Logging the ID of the product, we're about to fetch
		console.log("Fetching product with ID:", id);
		
		try {
			// Fetching the product from the API
			const response = await fetch(`https://fakestoreapi.com/products/${ id }`);
			// If the response is not OK (status is not 200-299), throw an error
			if (!response.ok) throw new Error(`HTTP error! status: ${ response.status }`);
			
			// Parsing the response as JSON
			const product = await (response.json()) as ProductType;
			// Logging the product that was fetched
			console.log("Fetched product:", product);
			
			// If the product is undefined or null, throw an error
			if (!product) throw new Error(`No product found with ID: ${ id }`);
			
			// Returning the product as ProductType
			return product as ProductType;
		} catch (error: unknown) {
			// If the error is an instance of Error, log it
			if (error instanceof Error) console.error('Error-fetching product:', error);
			// Re-throwing the error
			throw error;
		}
	};
	
	
	const fetchLimitedProducts = async (limit: number = 5): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?limit=${ limit }`);
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const fetchProductsByCategory = async (category: string, limit: number = 20): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products/category/${ category }?limit=${ limit }`);
		const products = await response.json() as ProductListType;
		
		// Check if the number of products is less than the desired limit
		if (products.length < limit) {
			// Duplicate the existing products to fill up the remaining slots
			const additionalProductsNeeded = limit - products.length;
			const duplicatedProducts = Array.from({ length: additionalProductsNeeded }, (_, index) => {
				const sourceProductIndex = index % products.length;
				const clonedProduct = { ...products[ sourceProductIndex ] }; // Clone the product using the spread operator
				return clonedProduct;
			});
			
			// Append the duplicated products to the product's array
			products.push(...duplicatedProducts);
		}
		
		return products;
	};
	
	
	const fetchSortedProducts = async (order: 'asc' | 'desc'): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?sort=${ order }`);
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const fetchAllCategories = async (): Promise<Array<string>> => {
		const response = await fetch('https://fakestoreapi.com/products/categories');
		const categories = await (response.json()) as Array<string>;
		return categories;
	};
	
	// LOCAL STORAGE API FUNCTIONS
	const fetchAllCartItems = async (): Promise<ProductListType> => {
		// Fetch the cartItems from localStorage
		const cartItems: string | null = localStorage.getItem('cartItems');
		
		// Parse the cartItems and return them
		return cartItems
			? JSON.parse(cartItems)
			: [] as ProductListType;
	};
	
	return {
		fetchAllProducts,
		fetchSingleProduct,
		fetchLimitedProducts,
		fetchSortedProducts,
		fetchAllCategories,
		fetchProductsByCategory,
		fetchAllCartItems,
	};
}

