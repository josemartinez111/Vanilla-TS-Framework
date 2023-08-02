// FILE: hooks/router/use-router.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage, ProductsPage } from "../pages";

type RouteChangeType = {
	useRouteChange: () => Promise<void>
}

export function useRouter(rootElement: HTMLElement): RouteChangeType {
	// make this function async
	const useRouteChange = async (): Promise<void> => {
		// clear the root element content
		rootElement.innerHTML = '';
		// used for when selecting a product & then it opens in the about page
		const [routeName, productId] = location.hash.split('/');
		
		switch (routeName) {
			case '#home':
				rootElement.appendChild(HomePage());
				break;
			case '#about':
				rootElement.appendChild(await AboutPage(productId));
				break;
			case '#products':
				rootElement.appendChild(await ProductsPage());
				break;
			case '#cart':
				rootElement.appendChild(await CartPage(productId));
				break;
			default:
				location.hash = 'home';
		}
	};
	
	return {
		useRouteChange,
	};
}