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
	
	const mainElement = document.createElement('main');
	const aboutProduct = await AboutComponent(productId);
	mainElement.appendChild(aboutProduct);
	
	fragment.appendChild(mainElement);
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
