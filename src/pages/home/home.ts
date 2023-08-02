// FILE: pages/home/home.ts
// _______________________________________________

import { FooterComponent, HeaderComponent, NavbarComponent, HomeComponent } from "../../components";

export function HomePage(): DocumentFragment {
	const groupedDomNodesFragment = new DocumentFragment();
	
	groupedDomNodesFragment.appendChild(NavbarComponent());
	groupedDomNodesFragment.appendChild(HeaderComponent());
	groupedDomNodesFragment.appendChild(HomeComponent());
	groupedDomNodesFragment.appendChild(FooterComponent());
	
	return groupedDomNodesFragment;
}
