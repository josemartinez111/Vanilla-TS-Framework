// FILE: pages/products/products.ts
// _______________________________________________

import {
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
	ProductsComponent,
} from "../../components";

export async function ProductsPage(): Promise<DocumentFragment> {
	const groupedDomNodesFragment = new DocumentFragment();
	
	groupedDomNodesFragment.appendChild(NavbarComponent());
	groupedDomNodesFragment.appendChild(HeaderComponent());
	
	// Fetch men's clothing (Component is `async`)
	const mensClothingDataFromComponent = await ProductsComponent("men's clothing");
	groupedDomNodesFragment.appendChild(mensClothingDataFromComponent);
	
	// Fetch women's clothing (Component is `async`)
	const womensClothingDataFromComponent = await ProductsComponent("women's clothing");
	groupedDomNodesFragment.appendChild(womensClothingDataFromComponent);
	
	groupedDomNodesFragment.appendChild(FooterComponent());
	
	return groupedDomNodesFragment;
}
