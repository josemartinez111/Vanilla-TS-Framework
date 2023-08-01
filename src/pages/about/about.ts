// src/pages/about/about.ts
// _______________________________________________

import { FooterComponent, HeaderComponent, NavbarComponent } from "../../components";

export function AboutPage(): DocumentFragment {
	const fragment = new DocumentFragment();
	
	fragment.appendChild(NavbarComponent());
	fragment.appendChild(HeaderComponent());
	
	const body = document.createElement('main');
	
	body.innerHTML = `
    <h1>About Uncle Jose's T-Shirt Site</h1>
    <p>Learn about our story and our unique, handmade t-shirts.</p>
  `;
	
	fragment.appendChild(body);
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
