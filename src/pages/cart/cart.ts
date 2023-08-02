// src/pages/cart/cart.ts
// _______________________________________________

import { FooterComponent, HeaderComponent, NavbarComponent } from "../../components";

export function CartPage(): DocumentFragment {
	const groupedDomNodesFragment = new DocumentFragment();
	
	groupedDomNodesFragment.appendChild(NavbarComponent());
	groupedDomNodesFragment.appendChild(HeaderComponent());
	
	const mainElement = document.createElement('main');
	
	mainElement.innerHTML = `
    <h1>Your Cart</h1>
    <p>Review the items in your cart and proceed to checkout.</p>
  `;
	
	groupedDomNodesFragment.appendChild(mainElement);
	groupedDomNodesFragment.appendChild(FooterComponent());
	
	return groupedDomNodesFragment;
}
