// FILE: components/about/about.ts
// _______________________________________________

import { useFakeStoreApi } from "../../api/use-fake-store-api";

export async function AboutProductComponent(productId: string): Promise<DocumentFragment> {
	const { getSingleProduct } = useFakeStoreApi();
	const product = await getSingleProduct(Number(productId));
	
	const fragment = new DocumentFragment();
	
	const productElement = document.createElement('div');
	productElement.innerHTML = `
      <h1>${ product.title }</h1>
      <img src="${ product.image }" alt="${ product.title }" />
      <p>${ product.description }</p>
      <p>Price: $${ product.price.toFixed(2) }</p>
    `;
	
	fragment.appendChild(productElement);
	return fragment;
}


