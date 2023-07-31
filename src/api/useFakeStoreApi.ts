// FILE: src/api/useFakeStoreApi.ts
// _______________________________________________

import { ProductListType, ProductType } from "../types/types";

export function useFakeStoreApi() {
	const getAllProducts = async (): Promise<ProductListType> => {
		const response = await fetch('https://fakestoreapi.com/products');
		const products = await response.json();
		return products;
	};
	
	const getSingleProduct = async (id: number): Promise<ProductType> => {
		const response = await fetch(`https://fakestoreapi.com/products/${ id }`);
		const product = await response.json();
		return product;
	};
	
	const getLimitedProducts = async (limit: number): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?limit=${ limit }`);
		const products = await response.json();
		return products;
	};
	
	const getSortedProducts = async (order: 'asc' | 'desc'): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?sort=${ order }`);
		const products = await response.json();
		return products;
	};
	
	const getAllCategories = async (): Promise<Array<string>> => {
		const response = await fetch('https://fakestoreapi.com/products/categories');
		const categories = await (response.json()) as Array<string>;
		return categories;
	};
	
	const getProductsInCategory = async (category: string): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products/category/${ category }`);
		const products = await response.json();
		return products;
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

