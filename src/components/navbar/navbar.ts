// FILE: components/navbar/navbar.ts
// _______________________________________________

/**
 * @NavbarComponent function.
 * This function generates a navigation bar (navbar) component.
 * It creates a list of links (routes) for the application's different views
 * (Home, About, Cart).
 * @returns {HTMLElement} The navbar component as an HTML element.
 */
export function NavbarComponent(): HTMLElement {
	// Create a new 'nav' element
	const navbar = document.createElement('nav');
	
	// Define the list of routes for the application
	const routes = ['home', 'about', 'cart'];
	// Generate list items with links for each
	// route, capitalizing the visible text.
	const listItems = routes
		.map((route: string) => {
			// Capitalizes the first letter and leaves the rest of the string as is.
			const capitalizedRoute = `${ route[ 0 ].toUpperCase() }${ route.substring(1) }`;
			return `<li><a href="#${ route }">${ capitalizedRoute }</a></li>`;
		})
		.join('');
	
	// Set the inner HTML of the navbar to an 'ul'
	// element containing the list items.
	navbar.innerHTML = `<ul>${ listItems }</ul>`;
	return navbar;
}
