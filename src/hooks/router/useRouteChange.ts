// FILE: hooks/router/useRouteChange.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage } from "../../pages";

export function useRouteChange(rootElement: HTMLElement): void {
	// clear the root element content
	rootElement.innerHTML = '';
	
	/** URL: https://developer.mozilla.org/en-US/docs/web/api/location/hash
	 *  @Location.hash: string
	 *  The hash property of the Location interface returns a string containing
	 *  a '#' followed by the fragment identifier of the URL — the ID on the page
	 *  that the URL is trying to target. The fragment is not URL decoded . If the
	 *  URL does not have a fragment identifier, this property contains an empty string, "".
	 *  */
	switch (location.hash) {
		case `#home`:
			rootElement.appendChild(HomePage());
			break;
		case `#about`:
			rootElement.appendChild(AboutPage());
			break;
		case `#cart`:
			rootElement.appendChild(CartPage());
			break;
		default:
			// When the hash doesn't match any predefined route, redirect to home
			location.hash = 'home';
	}
}
