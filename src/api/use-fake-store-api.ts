// FILE: src/api/use-fake-store-api.ts
// _______________________________________________

import { ProductListType, ProductType } from "../types/types";

export function useFakeStoreApi() {
	const getAllProducts = async (): Promise<ProductListType> => {
		const response = await fetch('https://fakestoreapi.com/products');
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const getSingleProduct = async (id: number): Promise<ProductType> => {
		const response = await fetch(`https://fakestoreapi.com/products/${ id }`);
		const product = await (response.json()) as ProductType;
		return product;
	};
	
	const getLimitedProducts = async (limit: number = 5): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?limit=${ limit }`);
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const getProductsInCategory = async (category: string, limit: number = 20): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`);
		const products = await response.json() as ProductListType;
		
		// Check if the number of products is less than the desired limit
		if (products.length < limit) {
			// Duplicate the existing products to fill up the remaining slots
			const additionalProductsNeeded = limit - products.length;
			const duplicatedProducts = Array.from({ length: additionalProductsNeeded }, (_, index) => {
				const sourceProductIndex = index % products.length;
				const clonedProduct = { ...products[sourceProductIndex] }; // Clone the product using the spread operator
				return clonedProduct;
			});
			
			// Append the duplicated products to the product's array
			products.push(...duplicatedProducts);
		}
		
		return products;
	};
	
	
	const getSortedProducts = async (order: 'asc' | 'desc'): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?sort=${ order }`);
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const getAllCategories = async (): Promise<Array<string>> => {
		const response = await fetch('https://fakestoreapi.com/products/categories');
		const categories = await (response.json()) as Array<string>;
		return categories;
	};
	
	return {
		getAllProducts,
		getSingleProduct,
		getLimitedProducts,
		getSortedProducts,
		getAllCategories,
		getProductsInCategory,
	};
}

