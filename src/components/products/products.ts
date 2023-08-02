// FILE: components/products/products.ts
// _______________________________________________

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
		
		// sends the user to the `about` page when the product content is clicked
		const productContent = productDivElement.querySelector('.product-content') as HTMLButtonElement;
		productContent.onclick = () => {
			location.hash = `#about/${ product.id }`;
		};
		
		// sends the user to the `cart` page when the `Add to Cart` button is clicked
		const addToCartButton = productDivElement.querySelector('.add-to-cart') as HTMLButtonElement;
		addToCartButton.onclick = (event) => {
			event.stopPropagation();
			location.hash = `#cart/${ product.id }`;
		};
		
		productListDivElement.appendChild(productDivElement);
	});
	
	groupedDomNodesFragment.appendChild(productListDivElement);
	return groupedDomNodesFragment;
}
