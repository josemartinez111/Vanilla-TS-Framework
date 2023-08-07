// FILE: components/cart/cart.ts
// _______________________________________________

import { useCreateHTML } from '../../hooks';
import { CartItemComponent } from './cart-item';
import { ProductType } from '../../types/types';
import { useCartData } from '../../hooks/use-cart-data';
import './cart.css';

export async function CartComponent(product?: ProductType): Promise<DocumentFragment> {
  const {
    productData: defaultProductData,
    bindGoBackButton,
    paypalIcon,
    applePayIcon,
  } = await useCartData();
  
  let cartProducts: Array<ProductType> = [];
  
  // If there is no product in the cart, set the
  // cart products to the default product data
  if (!product) cartProducts = defaultProductData; else {
    cartProducts.push(product);
  }
  
  // Create a new div element to hold all the cart items
  const divElement = document.createElement('div');
  divElement.classList.add('cart-container');
  
  // Create a div for the left side of the cart (items)
  const cartSideDiv = document.createElement('div');
  cartSideDiv.classList.add('cart-side');
  
  const renderCart = async () => {
    // Logic to re-render the cart goes here
    cartSideDiv.innerHTML = '';
    
    // if there is a product in the cart, render it
    // by appending it to the cart-side div element
    cartProducts.forEach((item: ProductType) => {
      cartSideDiv.appendChild(
        CartItemComponent({
          item,
          paypalIcon,
          applePayIcon,
          renderCart,
        }));
    });
  };
  
  // Render the cart
  await renderCart();
  
  // Append the cart-side div to the main div element
  divElement.appendChild(cartSideDiv);
  
  // Create the right side div (the form)
  const formDiv = document.createElement('div');
  // Add the cart-side and pay-form classes to the form div
  formDiv.classList.add('cart-side', 'pay-form');
  
  // Set the innerHTML of the form div to the form HTML
  useCreateHTML(formDiv, () => (`
        <label class='cart-input-label' for='name'>
            Name
            <input class='cart-input' type='text' id='name' name='name' placeholder='Name' required />
        </label>
        <label class='cart-input-label' for='email'>
            Email
            <input class='cart-input' type='email' id='email' name='email' placeholder='Email' required />
        </label>
        <label class='cart-input-label' for='card'>
            Credit Card
            <input class='cart-input cdc' type='text' id='card' name='card' placeholder='💳    • • • •  • • • •  • • • •' required />
        </label>
        <button class='btn pay-now add-to-cart-button' type='submit'>
            Pay Now
        </button>
        <button class='btn go-back add-to-cart-button'>
            Go Back to Products
        </button>
				<h1 class='text'>Uncle Jose's T-Shirt</h1>
    
    `));
  
  // Append the form div to the main div element
  divElement.appendChild(formDiv);
  
  // Bind the click event to the "Go Back" button
  bindGoBackButton(divElement);
  
  // Create a document fragment and append the div element to it
  const groupedDomNodesFragment = document.createDocumentFragment();
  // Append the div element to the document fragment
  groupedDomNodesFragment.appendChild(divElement);
  
  return groupedDomNodesFragment;
}
