// FILE: pages/cart/cart.ts
// _______________________________________________

import {
	CartComponent,
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
} from "../../components";
import { useFakeStoreApi } from "../../api/use-fake-store-api";

export async function CartPage(productId?: string): Promise<DocumentFragment> {
	const groupedDomNodesFragment = new DocumentFragment();
	
	groupedDomNodesFragment.appendChild(NavbarComponent());
	groupedDomNodesFragment.appendChild(HeaderComponent());
	
	const mainElement = document.createElement('main');
	let productData;
	
	// If a productId was provided, fetch the product and display it in the cart
	if (productId) {
		const { fetchSingleProduct } = useFakeStoreApi();
		productData = await fetchSingleProduct(Number(productId));
	}
	
	// Await the asynchronous result of CartComponent
	const cartComponent = await CartComponent(productData);
	mainElement.appendChild(cartComponent);
	
	groupedDomNodesFragment.appendChild(mainElement);
	groupedDomNodesFragment.appendChild(FooterComponent());
	
	return groupedDomNodesFragment;
}
