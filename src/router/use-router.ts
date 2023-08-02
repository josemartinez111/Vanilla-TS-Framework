// FILE: hooks/router/use-router.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage, ProductsPage } from "../pages";

type RouteChangeType = {
	useRouteChange: () => Promise<void>
}

export function useRouter(rootElement: HTMLElement): RouteChangeType {
	const useRouteChange = async (): Promise<void> => {
		rootElement.innerHTML = '';
		
		let [routeName, productId] = location.hash.split('/');
		// remove the '#' from routeName
		routeName = routeName.replace('#', '');
		
		switch (routeName) {
			case 'home':
				rootElement.appendChild(HomePage());
				break;
			case 'about':
				rootElement.appendChild(await AboutPage(productId));
				break;
			case 'products':
				rootElement.appendChild(await ProductsPage());
				break;
			case 'cart':
				rootElement.appendChild(await CartPage(productId));
				break;
			default:
				location.hash = 'home';
				routeName = 'home';
		}
		
		// Dispatch a custom event with the new route name
		window.dispatchEvent(new CustomEvent('routechange', { detail: routeName }));
	};
	
	return {
		useRouteChange,
	};
}
