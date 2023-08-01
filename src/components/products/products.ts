// FILE: components/products/products.ts
// _______________________________________________

import { ProductType } from "../../types/types";
import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './products.css';

export async function ProductsComponent(category: string, limit: number = 24): Promise<DocumentFragment> {
	const { getProductsInCategory } = useFakeStoreApi();
	const products = await getProductsInCategory(category, limit);
	
	const fragment = new DocumentFragment();
	
	const productList = document.createElement('div');
	productList.classList.add('product-list'); // Add the class directly to the markup
	
	products.forEach((product: ProductType) => {
		const productElement = document.createElement('div');
		productElement.classList.add('product-item'); // Add the class directly to the markup
		
		productElement.innerHTML = `
      <h2 class="product-title">${ product.title }</h2>
      <div class="product-image">
        <img src="${ product.image }" alt="${ product.title }" />
      </div>
      <p class="product-price">$${ product.price.toFixed(2) }</p>
      <button>Add to Cart</button>
    `;
		
		productElement.onclick = () => {
			location.hash = `#about/${ product.id }`;
		};
		
		productList.appendChild(productElement);
	});
	
	fragment.appendChild(productList);
	return fragment;
}
