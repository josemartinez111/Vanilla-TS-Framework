// FILE: router/use-router.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage, ProductsPage } from "../pages";

type RouteChangeType = {
	useRouteChange: () => Promise<void>
}

/**
 * @useRouter
 * is a custom hook that handles routing within the application.
 * It provides a function to handle route changes based on the URL hash.
 * @param {HTMLElement} rootElement The root HTML element where the app is rendered.
 * @returns {RouteChangeType} An object containing a function to handle route changes.
 */
export function useRouter(rootElement: HTMLElement): RouteChangeType {
	/**
	 * @useRouteChange
	 * handles route changes based on the URL hash.
	 * It clears the root element and appends the new page based on the route name.
	 * If the route name is not recognized, it defaults to the home route.
	 * After changing the route, it dispatches a 'routechange' event with the new route name.
	 */
	const useRouteChange = async (): Promise<void> => {
		console.log("Initial URL hash:", location.hash);
		
		// Clear the root element
		rootElement.innerHTML = '';
		
		// Get the route name and product ID from the URL hash
		let [routeName, productId] = location.hash.split('/');
		// Remove the '#' from the route name
		routeName = routeName.replace('#', '');
		
		// Append the correct page to the root element based on the route name
		switch (routeName) {
			case 'home':
				console.log("Rendering HomePage");
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
				// Default to the home route if the route name is not recognized
				location.hash = 'home';
				routeName = 'home';
		}
		
		const routeChangeEvent = new CustomEvent('routechange', {
			detail: routeName,
		});
		
		// Dispatch a 'routechange' event with the new route name
		window.dispatchEvent(routeChangeEvent);
	};
	
	return { useRouteChange };
}
