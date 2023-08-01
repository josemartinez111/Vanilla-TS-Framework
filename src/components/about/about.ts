// FILE: components/about/about.ts
// _______________________________________________

import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './about.css';

export async function AboutComponent(productId?: string): Promise<DocumentFragment> {
	const fragment = new DocumentFragment();
	const aboutInfo = document.createElement('div');
	
	if (productId) {
		const { getSingleProduct } = useFakeStoreApi();
		const product = await getSingleProduct(Number(productId));
		
		const productElement = document.createElement('div');
		productElement.classList.add('about-product');
		
		productElement.innerHTML = `
      <h1>${ product.title }</h1>
      <img src="${ product.image }" alt="${ product.title }" />
      <p class="description">${ product.description }</p>
      <p class="product-price">$${ product.price.toFixed(2) }</p>
      <button>Add to Cart</button>
    `;
		
		fragment.appendChild(productElement);
	}
	
	aboutInfo.innerHTML = productId ? '' : `
  <div class="about-info">
    <h1>About Uncle Jose's T-Shirt Site</h1>
    <p class="about-description">Welcome to Uncle Jose's T-Shirt Site! Our story begins with a passion for unique,
       handmade t-shirts. We believe in creating high-quality t-shirts that express individuality
       and personal style. Each t-shirt is crafted with care and attention to detail. We're committed
       to sustainable and ethical manufacturing practices, ensuring that our t-shirts not only look
       good, but feel good to wear and are good for the environment. We're proud to be a small business
       that values our customers and the communities we serve. Thank you for supporting Uncle Jose's T-Shirt Site!
    </p>
  </div>
`;
	
	fragment.appendChild(aboutInfo);
	return fragment;
}
