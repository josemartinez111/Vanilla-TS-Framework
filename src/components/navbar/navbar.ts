// FILE: components/navbar/navbar.ts
// _______________________________________________

export function NavbarComponent(): HTMLElement {
	const navbar = document.createElement('nav');
	const routes = ['home', 'about', 'cart'];
	
	const listItems = routes
		.map((route: string) => {
			const capitalizedRoute = route.charAt(0).toUpperCase() + route.slice(1);
			return `<li><a href="#${ route }">${ capitalizedRoute }</a></li>`;
		})
		.join('');
	
	navbar.innerHTML = `<ul>${ listItems }</ul>`;
	
	return navbar;
}