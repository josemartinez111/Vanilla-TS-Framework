// FILE: pages/cart/cart.ts
// _______________________________________________

import {
	CartComponent,
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
} from "../../components";
import { useFakeStoreApi } from "../../api/use-fake-store-api";
import { useComponentList } from '../../hooks';

export async function CartPage(productId?: string): Promise<DocumentFragment> {
	const groupedDomNodesFragment = new DocumentFragment();
	
	const handleCartComponent = () => async () => {
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
		return mainElement;
	};
	
	// Define the components you want to add in the desired order
	const componentOrder = {
		1: NavbarComponent,
		2: HeaderComponent,
		3: handleCartComponent(),
		4: FooterComponent
	};
	
	await useComponentList({
		groupedFragment: groupedDomNodesFragment,
		componentOrder: componentOrder,
	});
	
	return groupedDomNodesFragment;
}
