// FILE: pages/home/home.ts
// _______________________________________________

import { FooterComponent, HeaderComponent, NavbarComponent } from "../../components";

export function HomePage(): DocumentFragment {
	const fragment = new DocumentFragment();
	
	fragment.appendChild(NavbarComponent());
	fragment.appendChild(HeaderComponent());
	
	const body = document.createElement('main');
	
	body.innerHTML = `
		<h1>Welcome to Uncle Jose's T-Shirt Site!</h1>
    <p>Discover our unique, handmade t-shirts.</p>
	`;
	
	fragment.appendChild(body);
	fragment.appendChild(FooterComponent());
	
	return fragment;
}