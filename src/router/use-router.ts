// FILE: hooks/router/use-route.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage, ProductsPage } from "../pages";

export function useRoute(rootElement: HTMLElement) {
	const useRouteChange = async (): Promise<void> => { // make this function async
		// clear the root element content
		rootElement.innerHTML = '';
		
		switch (location.hash) {
			case '#home':
				rootElement.appendChild(HomePage());
				break;
			case '#about':
				rootElement.appendChild(AboutPage());
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
