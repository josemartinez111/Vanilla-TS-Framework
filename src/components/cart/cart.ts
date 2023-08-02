/* FILE: components/cart/cart.ts */
/* _______________________________________________ */

import { ProductType } from "../../types/types";
import './cart.css';

export function CartComponent(product: ProductType): DocumentFragment {
	const groupedDomNodesFragment = new DocumentFragment();
	
	const paypalIcon = "/assets/images/paypal.png";
	const applePayIcon = "/assets/images/apple-pay.png";
	
	const divElement = document.createElement('div');
	divElement.innerHTML = (`
		<div class="cart-container">
			<div class="cart-side cart-item">
				<img class="cart-image" src="${ product.image }" alt="${ product.title }" />
				<div class="cart-title">${ product.title }</div>
				<div class="cart-price">$${ product.price.toFixed(2) }</div>
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
				<label for="name">Name</label>
				<input type="text" id="name" name="name" placeholder="Name" required />
				<label for="email">Email</label>
				<input type="email" id="email" name="email" placeholder="Email" required />
				<label for="card">Credit Card</label>
				<input type="text" id="card" name="card" placeholder="💳    • • • •  • • • •  • • • •" required />
				<button class="btn pay-now" type="submit">
					Pay Now
				</button>
			</div>
		</div>
	`);
	
	while (divElement.firstChild) {
		groupedDomNodesFragment.appendChild(divElement.firstChild);
	}
	
	return groupedDomNodesFragment;
}
