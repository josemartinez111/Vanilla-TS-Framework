// FILE: pages/products/products.ts
// _______________________________________________

import {
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
	ProductsComponent,
} from "../../components";
import { useComponentList } from '../../hooks';

export async function ProductsPage(): Promise<DocumentFragment> {
	const groupedDomNodesFragment = new DocumentFragment();
	
	// Define the components you want to add in the desired order
	const componentOrder = {
		1: NavbarComponent,
		2: HeaderComponent,
		3: async () => await ProductsComponent("men's clothing"), // Fetch men's clothing
		4: async () => await ProductsComponent("women's clothing"), // Fetch women's clothing
		5: FooterComponent
	};
	
	await useComponentList({
		groupedFragment: groupedDomNodesFragment,
		componentOrder: componentOrder,
	});
	
	return groupedDomNodesFragment;
}
