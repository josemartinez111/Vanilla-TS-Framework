// FILE: components/about/about.ts
// _______________________________________________

import { useAboutEvents } from "../../hooks";
import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './about.css';

export async function AboutComponent(productId?: string): Promise<DocumentFragment> {
	const {
		onProductContentClick,
		onAddToCartClick,
		onGoBackClick,
	} = useAboutEvents();
	
	const groupedDomNodesFragment = new DocumentFragment();
	const aboutInfoDivElement = document.createElement('div');
	
	if (productId) {
		const { fetchSingleProduct } = useFakeStoreApi();
		const productData = await fetchSingleProduct(Number(productId));
		
		const productDivElement = document.createElement('div');
		productDivElement.classList.add('about-product');
		
		productDivElement.innerHTML = (`
			<div class="product-content" data-id="${ productData.id }">
		    <h1>${ productData.title }</h1>
		    <img src="${ productData.image }" alt="${ productData.title }" />
		    <p class="description">${ productData.description }</p>
		    <p class="product-price">$${ productData.price.toFixed(2) }</p>
		    <div class="button-container">  <!-- New button container -->
		      <button class="btn1 about-button add-to-cart add-to-cart-button" data-id="${ productData.id }">
		       Add to Cart
		      </button>
		      <button class="btn2 about-button go-back add-to-cart-button">
		       Go Back to Products
		      </button>
		    </div>
      </div>
		`);
		
		
		onProductContentClick(productDivElement, Number(productData.id));
		onAddToCartClick(productDivElement, Number(productData.id));
		onGoBackClick(productDivElement);
		
		groupedDomNodesFragment.appendChild(productDivElement);
	}
	
	aboutInfoDivElement.innerHTML = productId ? '' : (`
		<div class="about-info">
			<h1>About Uncle Jose's T-Shirt Site</h1>
			<p class="about-description">
				Welcome to Uncle Jose's T-Shirt Site! Our story begins with a passion for unique,
				handmade t-shirts. We believe in creating high-quality t-shirts that express individuality
				and personal style. Each t-shirt is crafted with care and attention to detail. We're committed
				to sustainable and ethical manufacturing practices, ensuring that our t-shirts not only look
				good, but feel good to wear and are good for the environment. Thank you for supporting Uncle
				Jose's T-Shirt Site!
			</p>
		</div>
	`);
	
	groupedDomNodesFragment.appendChild(aboutInfoDivElement);
	return groupedDomNodesFragment;
}
