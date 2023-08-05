// FILE: types/types.d.ts
// _______________________________________________

export type ProductType = {
	id?: number;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
}

export type ProductListType = Array<ProductType>;
// _______________________________________________