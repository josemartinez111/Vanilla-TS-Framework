// FILE: pages/products/products.ts
// _______________________________________________

import {
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
	ProductsComponent,
} from "../../components";

export async function ProductsPage(): Promise<DocumentFragment> {
	const fragment = new DocumentFragment();
	
	fragment.appendChild(NavbarComponent());
	fragment.appendChild(HeaderComponent());
	
	// Fetch men's clothing (Component is `async`)
	const mensClothingDataFromComponent = await ProductsComponent("men's clothing");
	fragment.appendChild(mensClothingDataFromComponent);
	
	// Fetch women's clothing (Component is `async`)
	const womensClothingDataFromComponent = await ProductsComponent("women's clothing");
	fragment.appendChild(womensClothingDataFromComponent);
	
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
