// FILE: hooks/router/use-router.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage, ProductsPage } from "../pages";

export function useRouter(rootElement: HTMLElement) {
	const useRouteChange = async (): Promise<void> => { // make this function async
		// clear the root element content
		rootElement.innerHTML = '';
		
		const [routeName, productId] = location.hash.split('/');
		
		switch (routeName) {
			case '#home':
				rootElement.appendChild(HomePage());
				break;
			case '#about':
				rootElement.appendChild(await AboutPage(productId));
				break;
			case '#products': // New case for 'products'
				rootElement.appendChild(await ProductsPage());
				break;
			case '#cart':
				rootElement.appendChild(CartPage());
				break;
			default:
				location.hash = 'home';
		}
	};
	
	return {
		useRouteChange,
	};
}
