// FILE: components/cart/cart.ts
// _______________________________________________

import { ProductType } from "../../types/types";
import './cart.css';

export function CartComponent(product?: ProductType): DocumentFragment {
	const groupedDomNodesFragment = new DocumentFragment();
	
	const paypalIcon = "/assets/images/paypal.png";
	const applePayIcon = "/assets/images/apple-pay.png";
	
	// Default product data
	const defaultProduct = {
		title: 'No items in your cart',
		price: 0.0,
		image: '/assets/images/white_amz_cart.png', // replace this with your own empty cart image
	};
	
	// Use the provided product data if available, otherwise use the default product data
	const productData = product || defaultProduct;
	
	const divElement = document.createElement('div');
	divElement.innerHTML = (`
    <div class="cart-container">
      <div class="cart-side cart-item">
        <img class="cart-image ${product ? '' : 'default-image'}" src="${ productData.image }" alt="${ productData.title }" />
        <div class="cart-title">${ productData.title }</div>
        <div class="cart-price">$${ productData.price.toFixed(2) }</div>
        <div class="pay-option">
          <button class="btn btn-icon">
            <img class="btn-icon" src="${ paypalIcon }" alt="PayPal" />
          </button>
        </div>
        <div class="pay-option">
          <button class="btn btn-icon">
            <img class="btn-icon" src="${ applePayIcon }" alt="Apple Pay" />
          </button>
        </div>
      </div>
      <div class="cart-side pay-form">
        <input class="cart-input" type="text" id="name" name="name" placeholder="Name" required />
        <label class="cart-input-label" for="name">Name</label>
        <input class="cart-input" type="email" id="email" name="email" placeholder="Email" required />
        <label class="cart-input-label" for="email">Email</label>
        <input class="cart-input" type="text" id="card" name="card" placeholder="💳    • • • •  • • • •  • • • •" required />
        <label class="cart-input-label" for="card">Credit Card</label>
        <button class="btn pay-now" type="submit">
          Pay Now
        </button>
        <button class="btn go-back">
          Go Back to Products
        </button>
      </div>
    </div>
  `);
	
	const goBackButton = divElement.querySelector('.go-back') as HTMLButtonElement;
	goBackButton.onclick = (event) => {
		event.stopPropagation();
		location.hash = `#products`;
	};
	
	while (divElement.firstChild) {
		groupedDomNodesFragment.appendChild(divElement.firstChild);
	}
	
	return groupedDomNodesFragment;
}
