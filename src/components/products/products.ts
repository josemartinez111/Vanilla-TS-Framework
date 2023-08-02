// FILE: components/products/products.ts
// _______________________________________________

// FILE: components/products/products.ts
// _______________________________________________

import { useProductEvents } from "../../hooks";
import { ProductType } from "../../types/types";
import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './products.css';

export async function ProductsComponent(category: string, limit: number = 24): Promise<DocumentFragment> {
	const { onProductContentClick, onAddToCartButtonClick } = useProductEvents();
	const { getProductsInCategory } = useFakeStoreApi();
	
	// fetching the data from the API based on the category and limit of items
	const productData = await getProductsInCategory(category, limit);
	// creating a DocumentFragment to group the DOM nodes
	const groupedDomNodesFragment = new DocumentFragment();
	
	const productListDivElement = document.createElement('div');
	productListDivElement.classList.add('product-list');
	
	productData.forEach((product: ProductType) => {
		const productDivElement = document.createElement('div');
		productDivElement.classList.add('product-item');
		
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
		onProductContentClick(productDivElement, Number(product.id));
		onAddToCartButtonClick(productDivElement, Number(product.id));
		
		productListDivElement.appendChild(productDivElement);
	});
	
	groupedDomNodesFragment.appendChild(productListDivElement);
	return groupedDomNodesFragment;
}