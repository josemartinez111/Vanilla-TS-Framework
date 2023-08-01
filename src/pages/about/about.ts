// src/pages/about/about.ts
// _______________________________________________

import {
	AboutProductComponent,
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
} from "../../components";

export async function AboutPage(productId?: string): Promise<DocumentFragment> {
	const fragment = new DocumentFragment();
	
	fragment.appendChild(NavbarComponent());
	fragment.appendChild(HeaderComponent());
	
	const body = document.createElement('main');
	
	if (productId) {
		const aboutProduct = await AboutProductComponent(productId);
		body.appendChild(aboutProduct);
	}
	
	const aboutInfo = document.createElement('div');
	aboutInfo.innerHTML = productId ? '' : `
		<h1>About Uncle Jose's T-Shirt Site</h1>
		<p>Welcome to Uncle Jose's T-Shirt Site! Our story begins with a passion for unique,
		   handmade t-shirts. We believe in creating high-quality t-shirts that express individuality
		   and personal style. Each t-shirt is crafted with care and attention to detail. We're committed
		   to sustainable and ethical manufacturing practices, ensuring that our t-shirts not only look
		   good, but feel good to wear and are good for the environment. We're proud to be a small business
		   that values our customers and the communities we serve. Thank you for supporting Uncle Jose's T-Shirt Site!
		</p>
	`;
	body.appendChild(aboutInfo);
	
	fragment.appendChild(body);
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
