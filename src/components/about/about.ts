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
			<div class="product-content" data-id="${ productData.id }">
				<h1>${ productData.title }</h1>
				<img src="${ productData.image }" alt="${ productData.title }" />
				<p class="description">${ productData.description }</p>
				<p class="product-price">$${ productData.price.toFixed(2) }</p>
				<button class="add-to-cart" data-id="${ productData.id }">Add to Cart</button>
				<button class="go-back">Go Back to Products</button>
			</div>
		`);
		
		const productContent = productDivElement.querySelector('.product-content') as HTMLButtonElement;
		// sends the user to the `about` page when the product content is clicked
		productContent.onclick = () => {
			location.hash = `#about/${ productData.id }`;
		};
		
		const addToCartButton = productDivElement.querySelector('.add-to-cart') as HTMLButtonElement;
		// sends the user to the `cart` page when the `Add to Cart` button is clicked
		addToCartButton.onclick = (event) => {
			event.stopPropagation();
			location.hash = `#cart/${ productData.id }`;
		};
		
		const goBackButton = productDivElement.querySelector('.go-back') as HTMLButtonElement;
		// sends the user back to the `products` page when the `Go Back` button is clicked
		goBackButton.onclick = (event) => {
			event.stopPropagation();
			location.hash = `#products`;
		};
		
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
