// FILE: components/about/about.ts
// _______________________________________________

import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './about.css';

export async function AboutComponent(productId?: string): Promise<DocumentFragment> {
	const groupedDomNodesFragment = new DocumentFragment();
	const aboutInfoDivElement = document.createElement('div');
	
	if (productId) {
		const { getSingleProduct } = useFakeStoreApi();
		const productData = await getSingleProduct(Number(productId));
		
		const productDivElement = document.createElement('div');
		productDivElement.classList.add('about-product');
		
		productDivElement.innerHTML = (`
      <h1>${ productData.title }</h1>
      <img src="${ productData.image }" alt="${ productData.title }" />
      <p class="description">${ productData.description }</p>
      <p class="product-price">$${ productData.price.toFixed(2) }</p>
      <button>Add to Cart</button>
    `);
		
		groupedDomNodesFragment.appendChild(productDivElement);
	}
	
	aboutInfoDivElement.innerHTML = productId ? '' : (`
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
`);
	
	groupedDomNodesFragment.appendChild(aboutInfoDivElement);
	return groupedDomNodesFragment;
}
