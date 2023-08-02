// FILE: components/products/products.ts
// _______________________________________________

import { useProductEvents } from "../../hooks";
import { ProductType } from "../../types/types";
import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './products.css';

export async function ProductsComponent(category: string, limit: number = 24): Promise<DocumentFragment> {
	const { getProductsInCategory } = useFakeStoreApi();
	const productData = await getProductsInCategory(category, limit);
	
	const groupedDomNodesFragment = new DocumentFragment();
	
	const productListDivElement = document.createElement('div');
	productListDivElement.classList.add('product-list'); // Add the class directly to the markup
	
	productData.forEach((product: ProductType) => {
		const productDivElement = document.createElement('div');
		productDivElement.classList.add('product-item'); // Add the class directly to the markup
		
		productDivElement.innerHTML = (`
			<div class="product-content" data-id="${ product.id }">
				<h2 class="product-title">${ product.title }</h2>
				<div class="product-image">
					<img src="${ product.image }" alt="${ product.title }" />
				</div>
				<p class="product-price">$${ product.price.toFixed(2) }</p>
			</div>
			<button class="add-to-cart" data-id="${ product.id }">
				Add to Cart
			</button>
		`);
		
		// Using our custom hook to handle the product events
		// (clicking the product content and the 'Add to Cart' button)
		useProductEvents(productDivElement, product.id);
		productListDivElement.appendChild(productDivElement);
	});
	
	groupedDomNodesFragment.appendChild(productListDivElement);
	return groupedDomNodesFragment;
}