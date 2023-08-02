// FILE: components/cart/cart.ts
// _______________________________________________

import { ProductType } from "../../types/types";
import { useCartData } from '../../hooks/use-cart-data';
import './cart.css';

export function CartComponent(product?: ProductType): DocumentFragment {
	const {
		productData: defaultProductData,
		bindGoBackButton,
		paypalIcon,
		applePayIcon,
	} = useCartData();
	
	const productData = product || defaultProductData;
	
	const divElement = document.createElement('div');
	divElement.innerHTML = (`
    <div class="cart-container">
      <div class="cart-side cart-item">
        <img class="cart-image ${ product
		? ''
		: 'default-image' }" src="${ productData.image }" alt="${ productData.title }" />
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
	
	bindGoBackButton(divElement);
	
	const groupedDomNodesFragment = document.createDocumentFragment();
	while (divElement.firstChild) {
		groupedDomNodesFragment.appendChild(divElement.firstChild);
	}
	
	return groupedDomNodesFragment;
}
