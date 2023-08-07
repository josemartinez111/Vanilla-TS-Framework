// FILE: components/CartItem.ts
// _______________________________________________

import { useCreateHTML } from '../../hooks';
import { ProductType } from '../../types/types';
import { useLocalStorage } from '../../hooks/use-local-storage';
import './cart.css';

export type CartItemProps = {
  item: ProductType;
  paypalIcon: string;
  applePayIcon: string;
  renderCart: () => void;
}

export function CartItemComponent({
  item,
  paypalIcon,
  applePayIcon,
  renderCart,
}: CartItemProps): HTMLDivElement {
  const { localeStorageRemoveItem } = useLocalStorage();
  
  // Create a new div element and set its innerHTML to the cart item's HTML
  const cartItemElement = document.createElement('div');
  cartItemElement.classList.add('cart-item');
  
  useCreateHTML(cartItemElement, () => (`
        <img class='cart-image' src='${ item.image }' alt='${ item.title }' />
        <div class='cart-title'>${ item.title }</div>
        <div class='cart-price'>$${ item.price.toFixed(2) }</div>
        <div class='pay-option'>
            <button class='btn btn-icon add-to-cart-button'>
                <img class='btn-icon' src='${ paypalIcon }' alt='PayPal' />
            </button>
        </div>
        <div class='pay-option'>
            <button class='btn btn-icon add-to-cart-button'>
                <img class='btn-icon' src='${ applePayIcon }' alt='Apple Pay' />
            </button>
        </div>
        <button class='btn remove-item remove-from-cart-button'>
					Remove
				</button>
    `));
  // Handle click event for the 'Remove' button
  const removeButton = cartItemElement.querySelector('.remove-item');
  removeButton?.addEventListener('click', async () => {
    localeStorageRemoveItem(item.id || 0);
    // Call the passed function to re-render the cart UI
    renderCart();
  });
  
  return cartItemElement;
}
