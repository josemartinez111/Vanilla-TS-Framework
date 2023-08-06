# Uncle Jose's T-Shirt Shop

This project, masterminded by me `Jose Martinez`, serves as an `e-commerce` `Single Page Application`
`(SPA)`, meticulously crafted using pure TypeScript, HTML, and CSS. The repository branch
`dev/module6` particularly demonstrates the use of the `Document Object Model` `(DOM)` to dynamically
create `elements`, `fragments`, and `classes`, thereby simulating a `shopping cart` experience, as well
as showcasing a list of `clothing items`, an `about page`, and a `product's page`. This project 
shines a light on the fundamental web development concepts that are often abstracted away by 
libraries and frameworks, offering a unique perspective on the underlying mechanics of web development.
It also fetches from the `fake store API` to display a list of `products`.

<img width="750" alt="home-page" src="public/assets/images/readme-images/home-page.png">

## Key Features

- **Vanilla TypeScript**: The project uses TypeScript, a statically typed
  superset of JavaScript, to bring type-safety and improved developer
  tooling to the project. Working with Vanilla TypeScript, as opposed to a
  framework like React or Vue, provides a more fundamental understanding of
  JavaScript, the Document Object Model (DOM), and state management.

- **Custom Routing**: Unlike using a routing library as in most React or
  Vue applications, this project implements custom routing using the
  browser's `hashchange` event. This functionality allows for navigation
  between different views without a full page reload, providing an SPA like
  user experience.

##### Code Example - Custom Routing

```ts
// FILE: router/use-router.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage, ProductsPage } from "../pages";

type RouteChangeType = {
	useRouteChange: () => Promise<void>
}

/**
 * @useRouter
 * is a custom hook that handles routing within the application.
 * It provides a function to handle route changes based on the URL hash.
 * @param {HTMLElement} rootElement The root HTML element where the app is rendered.
 * @returns {RouteChangeType} An object containing a function to handle route changes.
 */
export function useRouter(rootElement: HTMLElement): RouteChangeType {
	/**
	 * @useRouteChange
	 * handles route changes based on the URL hash.
	 * It clears the root element and appends the new page based on the route name.
	 * If the route name is not recognized, it defaults to the home route.
	 * After changing the route, it dispatches a 'routechange' event with the new route name.
	 */
	const useRouteChange = async (): Promise<void> => {
		console.log("Initial URL hash:", location.hash);
		
		// Clear the root element
		rootElement.innerHTML = '';
		
		// Get the route name and product ID from the URL hash
		let [routeName, productId] = location.hash.split('/');
		// Remove the '#' from the route name
		routeName = routeName.replace('#', '');
		
		// Append the correct page to the root element based on the route name
		switch (routeName) {
			case 'home':
				console.log("Rendering HomePage");
				rootElement.appendChild(HomePage());
				break;
			case 'about':
				rootElement.appendChild(await AboutPage(productId));
				break;
			case 'products':
				rootElement.appendChild(await ProductsPage());
				break;
			case 'cart':
				rootElement.appendChild(await CartPage(productId));
				break;
			default:
				// Default to the home route if the route name is not recognized
				location.hash = 'home';
				routeName = 'home';
		}
		
		const routeChangeEvent = new CustomEvent('routechange', {
			detail: routeName,
		});
		
		// Dispatch a 'routechange' event with the new route name
		window.dispatchEvent(routeChangeEvent);
	};
	
	return { useRouteChange };
}
```

- **Reusable Components**: The project uses a component-based architecture,
  a concept central to most modern web development frameworks. Components
  such as header, footer, and navbar are reused across different pages to
  maintain consistency. Each component is implemented as a function that
  returns a DOM element, which can then be appended where necessary.

##### Code Example - Reusable Component

<img width="550" alt="home-page" src="public/assets/images/readme-images/cart-default.png"> <img width="550" alt="home-page" src="public/assets/images/readme-images/cart-item.png">

```ts
// FILE: components/cart/cart.ts
// _______________________________________________

import { CartItemComponent } from "./cart-item";
import { ProductType } from "../../types/types";
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
	divElement.classList.add("cart-container");
	
	// Create a div for the left side of the cart (items)
	const cartSideDiv = document.createElement('div');
	cartSideDiv.classList.add("cart-side");
	
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
	formDiv.classList.add("cart-side", "pay-form");
	
	// Set the innerHTML of the form div to the form HTML
	formDiv.innerHTML = (`
        <label class="cart-input-label" for="name">
            Name
            <input class="cart-input" type="text" id="name" name="name" placeholder="Name" required />
        </label>
        <label class="cart-input-label" for="email">
            Email
            <input class="cart-input" type="email" id="email" name="email" placeholder="Email" required />
        </label>
        <label class="cart-input-label" for="card">
            Credit Card
            <input class="cart-input cdc" type="text" id="card" name="card" placeholder="💳    • • • •  • • • •  • • • •" required />
        </label>
        <button class="btn pay-now add-to-cart-button" type="submit">
            Pay Now
        </button>
        <button class="btn go-back add-to-cart-button">
            Go Back to Products
        </button>
				<h1 class="text">Uncle Jose's T-Shirt</h1>
    
    `);
	
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
```

<img width="670" alt="home-page" src="public/assets/images/readme-images/products-page.png">

```ts
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
	const { fetchProductsByCategory } = useFakeStoreApi();
	
	// fetching the data from the API based on the category and limit of items
	const productData = await fetchProductsByCategory(category, limit);
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
      <button class="add-to-cart add-to-cart-button" data-id="${ product.id }">
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
```

##### Code Example - Custom Hooks

```ts
// FILE: hooks/use-cart-data.ts
// _______________________________________________

import { ProductType } from "../types/types";
import { useFakeStoreApi } from "../api/use-fake-store-api";

// Define the return type for the useCartData hook
export type CartDataType = {
  // Data for all products in the cart
  productData: ProductType[];
  // Function to handle the click event of the "Go Back" button
  bindGoBackButton: (divElement: HTMLDivElement) => void;
  // URL of the PayPal icon
  paypalIcon: string;
  // URL of the Apple Pay icon
  applePayIcon: string;
};

/**
 * @useCartData
 * is a custom hook that prepares the data for the cart component,
 * fetches product data for all items in the cart,
 * and provides a function to bind a click event to the "Go Back" button.
 * @returns {CartDataType} An object containing the product data for all items in the cart,
 * a function to bind the "Go Back" button, and the icons for payment options.
 */
export async function useCartData(): Promise<CartDataType> {
  // URLs for the payment icons
  const paypalIcon = "/assets/images/paypal.png";
  const applePayIcon = "/assets/images/apple-pay.png";

  // Fetch the items in the cart from localStorage
  const { fetchAllCartItems, fetchSingleProduct } = useFakeStoreApi();
  // Get the array of product IDs from localStorage
  const cartItems = await fetchAllCartItems();

  // Define a default product data
  const defaultProductData: ProductType = {
    title: 'No items in your cart',
    price: 0.0,
    image: '/assets/images/white_amz_cart.png',
    category: '',
    description: '',
  };

  // Initialize the product data with default value
  let productData: ProductType[] = [defaultProductData];

  // If there are items in the cart, fetch the product data for each item
  if (cartItems.length > 0) {
    productData = await Promise.all(
            cartItems.map((id: ProductType) => (
                    fetchSingleProduct(Number(id))
            )));
  }

  // Define the function to handle the click event of the "Go Back" button
  const bindGoBackButton = (cartItemElement: HTMLDivElement) => {
    const goBackButton = cartItemElement.querySelector('.go-back') as HTMLButtonElement;

    // Check if the button exists before trying to bind an event
    if (!goBackButton) {
      console.error('Could not bind event. Go Back button does not exist.');
    } else {
      goBackButton.onclick = (event: MouseEvent) => {
        // Prevents the event from propagating (stops the event from being captured and bubbling up)
        event.stopPropagation();
        // Changes the current URL to the product's page
        location.hash = `#products`;
      };
    }
  };

  return {
    productData,
    bindGoBackButton,
    paypalIcon,
    applePayIcon,
  };
}
```

- **API Integration**: This project integrates with the Fake Store API to
  fetch product data. This simulates the experience of fetching and
  displaying data from a real back-end service. Typically, a framework
  would provide hooks or other abstractions to handle this, but in this
  project it's handled manually with the fetch API.

##### Code Example - API Integration

```ts
// FILE: src/api/use-fake-store-api.ts
// _______________________________________________

import { ProductListType, ProductType } from "../types/types";

export function useFakeStoreApi() {
  const fetchAllProducts = async (): Promise<ProductListType> => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await (response.json()) as ProductListType;
    return products;
  };

  const fetchSingleProduct = async (id: number): Promise<ProductType> => {
    // Logging the ID of the product, we're about to fetch
    console.log("Fetching product with ID:", id);

    try {
      // Fetching the product from the API
      const response = await fetch(`https://fakestoreapi.com/products/${ id }`);
      // If the response is not OK (status is not 200-299), throw an error
      if (!response.ok) throw new Error(`HTTP error! status: ${ response.status }`);

      // Parsing the response as JSON
      const product = await (response.json()) as ProductType;
      // Logging the product that was fetched
      console.log("Fetched product:", product);

      // If the product is undefined or null, throw an error
      if (!product) throw new Error(`No product found with ID: ${ id }`);

      // Returning the product as ProductType
      return product as ProductType;
    } catch (error: unknown) {
      // If the error is an instance of Error, log it
      if (error instanceof Error) console.error('Error-fetching product:', error);
      // Re-throwing the error
      throw error;
    }
  };


  const fetchLimitedProducts = async (limit: number = 5): Promise<ProductListType> => {
    const response = await fetch(`https://fakestoreapi.com/products?limit=${ limit }`);
    const products = await (response.json()) as ProductListType;
    return products;
  };

  const fetchProductsByCategory = async (category: string, limit: number = 20): Promise<ProductListType> => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${ category }?limit=${ limit }`);
    const products = await response.json() as ProductListType;

    // Check if the number of products is less than the desired limit
    if (products.length < limit) {
      // Duplicate the existing products to fill up the remaining slots
      const additionalProductsNeeded = limit - products.length;
      const duplicatedProducts = Array.from({ length: additionalProductsNeeded }, (_, index) => {
        const sourceProductIndex = index % products.length;
        const clonedProduct = { ...products[ sourceProductIndex ] }; // Clone the product using the spread operator
        return clonedProduct;
      });

      // Append the duplicated products to the product's array
      products.push(...duplicatedProducts);
    }

    return products;
  };


  const fetchSortedProducts = async (order: 'asc' | 'desc'): Promise<ProductListType> => {
    const response = await fetch(`https://fakestoreapi.com/products?sort=${ order }`);
    const products = await (response.json()) as ProductListType;
    return products;
  };

  const fetchAllCategories = async (): Promise<Array<string>> => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const categories = await (response.json()) as Array<string>;
    return categories;
  };

  // LOCAL STORAGE API FUNCTIONS
  const fetchAllCartItems = async (): Promise<ProductListType> => {
    // Fetch the cartItems from localStorage
    const cartItems: string | null = localStorage.getItem('cartItems');

    // Parse the cartItems and return them
    return cartItems
            ? JSON.parse(cartItems)
            : [] as ProductListType;
  };

  return {
    fetchAllProducts,
    fetchSingleProduct,
    fetchLimitedProducts,
    fetchSortedProducts,
    fetchAllCategories,
    fetchProductsByCategory,
    fetchAllCartItems,
  };
}
```
<img width="550" alt="home-page" src="public/assets/images/readme-images/about-default.png"> <img width="550" alt="home-page" src="public/assets/images/readme-images/about-detail.png">
- **Modular Design**: The application is designed in a modular way, similar
  to the structure of projects developed with more complex frameworks. Each
  component, page, and hook is contained in its own module, allowing for
  better maintainability and scalability.

## Modular Design:

```elixir
.
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
│   ├── assets
│   │   ├── fonts
│   │   │   ├── Audiowide-Regular.ttf
│   │   │   ├── Goldman-Bold.ttf
│   │   │   ├── Goldman-Regular.ttf
│   │   │   └── Gotham-ssm-medium.otf
│   │   └── images
│   │       ├── apple-pay.png
│   │       ├── cart.png
│   │       ├── paypal.png
│   │       ├── shopping.jpg
│   │       └── white_amz_cart.png
│   └── vite.svg
├── src
│   ├── api
│   │   └── use-fake-store-api.ts
│   ├── components
│   │   ├── about
│   │   │   ├── about.css
│   │   │   └── about.ts
│   │   ├── cart
│   │   │   ├── cart.css
│   │   │   └── cart.ts
│   │   ├── footer
│   │   │   ├── footer.css
│   │   │   └── footer.ts
│   │   ├── header
│   │   │   └── header.ts
│   │   ├── home
│   │   │   ├── home.css
│   │   │   └── home.ts
│   │   ├── index.ts
│   │   ├── navbar
│   │   │   ├── navbar.css
│   │   │   └── navbar.ts
│   │   └── products
│   │       ├── products.css
│   │       └── products.ts
│   ├── hooks
│   │   ├── index.ts
│   │   ├── use-cart-data.ts
│   │   ├── use-nav-active-tab.ts
│   │   └── use-products-events.ts
│   ├── main.ts
│   ├── pages
│   │   ├── about
│   │   │   └── about.ts
│   │   ├── cart
│   │   │   └── cart.ts
│   │   ├── home
│   │   │   └── home.ts
│   │   ├── index.ts
│   │   └── products
│   │       └── products.ts
│   ├── router
│   │   └── use-router.ts
│   ├── style.css
│   ├── styles
│   │   └── main.css
│   ├── types
│   │   └── types.d.ts
│   └── vite-env.d.ts
└── tsconfig.json

24 directories, 45 files
```

- **State Management**: State management in this application is handled
  manually, without the use of a state management library. This gives a
  deep understanding of how state flows through the application, a
  fundamental concept in web development.

##### Code Example - State Management

```ts
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
```

```ts
// src/pages/about/about.ts
// _______________________________________________

import {
	AboutComponent,
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
} from "../../components";

export async function AboutPage(productId?: string): Promise<DocumentFragment> {
	const groupedDomNodesFragment = new DocumentFragment();
	
	groupedDomNodesFragment.appendChild(NavbarComponent());
	groupedDomNodesFragment.appendChild(HeaderComponent());
	
	const mainElement = document.createElement('main');
	const aboutProduct = await AboutComponent(productId);
	mainElement.appendChild(aboutProduct);
	
	groupedDomNodesFragment.appendChild(mainElement);
	groupedDomNodesFragment.appendChild(FooterComponent());
	
	return groupedDomNodesFragment;
}
```

## Project Structure

- `src`: Contains the TypeScript source code.
    - `api`: Contains the service to fetch data from the Fake Store API.
    - `components`: Contains reusable UI components.
    - `hooks`: Contains some custom hooks to abstract logic from
      components.
    - `pages`: Contains the different views of the application.
    - `router`: Contains the custom router hook.
    - `styles`: Contains the global CSS styles.
    - `types`: Contains the custom types help us throughout the app.
- `public`: Contains static assets such as images and fonts.

## Running the Project

You can run the project locally using the Vite development server. First,
install the dependencies using `npm install` `npm i`
or `pnpm install` `pnpm i`, then run:

```zsh
npm run dev
# OR
pnpm run dev
```
___
## You can find the deployed version here: 
### [LINK TO WEBSITE: Uncle Jose's T-Shirt Site](https://t-shirt-site.000webhostapp.com)

