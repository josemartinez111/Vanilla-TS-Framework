// src/pages/about/about.ts
// _______________________________________________

import {
	AboutComponent,
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
} from "../../components";

export async function AboutPage(productId?: string): Promise<DocumentFragment> {
	const fragment = new DocumentFragment();
	
	fragment.appendChild(NavbarComponent());
	fragment.appendChild(HeaderComponent());
	
	const body = document.createElement('main');
	const aboutProduct = await AboutComponent(productId);
	body.appendChild(aboutProduct);
	
	fragment.appendChild(body);
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
