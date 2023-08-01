// FILE: components/products/products.ts
// _______________________________________________

import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './products.css';

export async function ProductsComponent(category: string, limit: number = 10): Promise<DocumentFragment> {
	const { getProductsInCategory } = useFakeStoreApi();
	const products = await getProductsInCategory(category, limit);
	
	const fragment = new DocumentFragment();
	
	const productList = document.createElement('div');
	productList.classList.add('product-list'); // Add the class directly to the markup
	
	products.forEach(product => {
		const productElement = document.createElement('div');
		productElement.classList.add('product-item'); // Add the class directly to the markup
		
		productElement.innerHTML = `
      <h2 class="product-title">${ product.title }</h2>
      <div class="product-image">
        <img src="${ product.image }" alt="${ product.title }" />
      </div>
      <p class="product-description">${ product.description }</p>
      <p class="product-price">${ product.price }</p>
    `;
		
		productList.appendChild(productElement);
	});
	
	fragment.appendChild(productList);
	return fragment;
}
