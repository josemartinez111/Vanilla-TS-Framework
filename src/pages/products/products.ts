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
	
	// Fetch men's clothing
	const mensClothing = await ProductsComponent("men's clothing");
	fragment.appendChild(mensClothing);
	
	// Fetch women's clothing
	const womensClothing = await ProductsComponent("women's clothing");
	fragment.appendChild(womensClothing);
	
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
