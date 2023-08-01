// FILE: components/products/products.ts
// _______________________________________________

import { ProductType } from "../../types/types";
import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './products.css';

export async function ProductsComponent(category: string, limit: number = 24): Promise<DocumentFragment> {
	const { getProductsInCategory } = useFakeStoreApi();
	const productData = await getProductsInCategory(category, limit);
	
	const fragment = new DocumentFragment();
	
	const productListDivElement = document.createElement('div');
	productListDivElement.classList.add('product-list'); // Add the class directly to the markup
	
	productData.forEach((product: ProductType) => {
		const productDivElement = document.createElement('div');
		productDivElement.classList.add('product-item'); // Add the class directly to the markup
		
		productDivElement.innerHTML = `
      <h2 class="product-title">${ product.title }</h2>
      <div class="product-image">
        <img src="${ product.image }" alt="${ product.title }" />
      </div>
      <p class="product-price">$${ product.price.toFixed(2) }</p>
      <button>Add to Cart</button>
    `;
		
		// On product click, update URL hash to render
		// the corresponding about page & displays product info
		productDivElement.onclick = () => {
			location.hash = `#about/${ product.id }`;
		};
		
		productListDivElement.appendChild(productDivElement);
	});
	
	fragment.appendChild(productListDivElement);
	return fragment;
}
