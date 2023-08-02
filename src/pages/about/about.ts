// src/pages/about/about.ts
// _______________________________________________

import {
	AboutComponent,
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
} from "../../components";

export async function AboutPage(productId?: string): Promise<DocumentFragment> {
	const groupedDomNodesFragment = new DocumentFragment();
	
	groupedDomNodesFragment.appendChild(NavbarComponent());
	groupedDomNodesFragment.appendChild(HeaderComponent());
	
	const mainElement = document.createElement('main');
	const aboutProduct = await AboutComponent(productId);
	mainElement.appendChild(aboutProduct);
	
	groupedDomNodesFragment.appendChild(mainElement);
	groupedDomNodesFragment.appendChild(FooterComponent());
	
	return groupedDomNodesFragment;
}
