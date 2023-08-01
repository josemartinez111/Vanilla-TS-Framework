// src/pages/cart/cart.ts
// _______________________________________________

import { FooterComponent, HeaderComponent, NavbarComponent } from "../../components";

export function CartPage(): DocumentFragment {
	const fragment = new DocumentFragment();
	
	fragment.appendChild(NavbarComponent());
	fragment.appendChild(HeaderComponent());
	
	const body = document.createElement('main');
	
	body.innerHTML = `
    <h1>Your Cart</h1>
    <p>Review the items in your cart and proceed to checkout.</p>
  `;
	
	fragment.appendChild(body);
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
