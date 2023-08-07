# Uncle Jose's T-Shirt Shop
___

## You can find the deployed version here:
### [LINK TO WEBSITE: Uncle Jose's T-Shirt Site](https://t-shirt-site.000webhostapp.com)
___

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

import { AboutPage, CartPage, HomePage, ProductsPage } from '../pages';

type RouteChangeType = {
  useRouteChange: () => Promise<void>;
};

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
    console.log('Initial URL hash:', location.hash);
    
    // Clear the root element
    rootElement.innerHTML = '';
    
    // Get the route name and product ID from the URL hash
    let [routeName, productId] = location.hash.split('/');
    // Remove the '#' from the route name
    routeName = routeName.replace('#', '');
    
    // Append the correct page to the root element based on the route name
    switch (routeName) {
      case 'home':
        console.log('Rendering HomePage');
        rootElement.appendChild(await HomePage());
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

```

<img width="670" alt="home-page" src="public/assets/images/readme-images/products-page.png">

```ts
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

import { ProductType } from '../types/types';
import { useFakeStoreApi } from '../api/use-fake-store-api';

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
  const paypalIcon = '/assets/images/paypal.png';
  const applePayIcon = '/assets/images/apple-pay.png';
  
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
The `useCreateHTML` hook provides a `utility` to insert `HTML` markup into a given `DOM element`. 
By passing a `DOM` element and a `callback function` that returns an `HTML string`, you can 
effortlessly inject markup into that `DOM element`.
```ts
// FILE: hooks/use-create-html.ts
// _______________________________________________

type CustomElement = HTMLDivElement | HTMLElement;

export function useCreateHTML(element: CustomElement, htmlTemplateCallback: () => string): void {
  element.innerHTML = htmlTemplateCallback();
}
```
```ts
// FILE: home/home.ts
// _______________________________________________

import './home.css';
import { useCreateHTML } from '../../hooks';

export function HomeComponent(): DocumentFragment {
  const groupedDomNodesFragment = new DocumentFragment();
  const imageSrc = '/assets/images/shopping.jpg';
  const mainElement = document.createElement('main');
  
  useCreateHTML(mainElement, () => (`
    <div class='home-container'>
      <div class='home-content'>
        <img class='home-image' src='${ imageSrc }' alt='Shopping'>
        <div class='home-text'>
          <h1>Welcome to Uncle Jose's T-Shirt Site!</h1>
          <p class='home-paragraph'>
            Discover our unique, handmade t-shirts & other
            products as well.<br>For the best in quality apparel for men & women,
            come see us! We would love to provide you quality service that only old
            Uncle Jose can provide.
            See you inside!
          </p>
        </div>
      </div>
    </div>
  `));
  
  groupedDomNodesFragment.appendChild(mainElement);
  return groupedDomNodesFragment;
}
```
The `useComponentList` hook assists in `appending` components to a `DocumentFragment` 
based on a `specified order`. By passing a `DocumentFragment` and an `object` representing 
the order of `components`, this hook ensures that components are added in the `desired sequence`.
```ts
// FILE: hooks/use-component-list.ts
// _______________________________________________

type ComponentListProps = {
  groupedFragment: DocumentFragment;
  componentOrder: { [order: number]: Function | (() => Promise<HTMLElement>) };
}

export async function useComponentList({ groupedFragment, componentOrder }: ComponentListProps): Promise<void> {
  const sortedKeys = Object.keys(componentOrder)
    .sort((orderA: string, orderB: string) => {
      return parseInt(orderA) - parseInt(orderB);
    });

  const handleAllPromises = () => async (key: string) => {
    const componentFnOrPromise = componentOrder[parseInt(key)];
    const result = componentFnOrPromise();
    return await result;
  };

  const components = await Promise.all(sortedKeys.map(handleAllPromises()));
  components.forEach((component: HTMLElement) => (
    groupedFragment.appendChild(component)
  ));
}
```
```ts
// FILE: pages/products/products.ts
// _______________________________________________

import {
  FooterComponent,
  HeaderComponent,
  NavbarComponent,
  ProductsComponent,
} from '../../components';
import { useComponentList } from '../../hooks';

export async function ProductsPage(): Promise<DocumentFragment> {
  const groupedDomNodesFragment = new DocumentFragment();
  
  const componentOrder = {
    1: NavbarComponent,
    2: HeaderComponent,
    3: async () => await ProductsComponent("men's clothing"),
    4: async () => await ProductsComponent("women's clothing"),
    5: FooterComponent,
  };
  
  await useComponentList({
    groupedFragment: groupedDomNodesFragment,
    componentOrder: componentOrder,
  });
  
  return groupedDomNodesFragment;
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
├── dist
│   ├── assets
│   │   ├── fonts
│   │   │   ├── Audiowide-Regular.ttf
│   │   │   ├── Goldman-Bold.ttf
│   │   │   ├── Goldman-Regular.ttf
│   │   │   └── Gotham-ssm-medium.otf
│   │   ├── images
│   │   │   ├── apple-pay.png
│   │   │   ├── cart.png
│   │   │   ├── paypal.png
│   │   │   ├── readme-images
│   │   │   ├── shopping.jpg
│   │   │   └── white_amz_cart.png
│   │   ├── index-61c3f83d.js
│   │   └── index-7515acb8.css
│   ├── index.html
│   └── vite.svg
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
│   │       ├── readme-images
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
│   │   │   ├── cart-item.ts
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
│   │   ├── use-about-events.ts
│   │   ├── use-cart-data.ts
│   │   ├── use-component-list.ts
│   │   ├── use-create-html.ts
│   │   ├── use-local-storage.ts
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
│   ├── store
│   │   └── cart-store.ts
│   ├── styles
│   │   └── main.css
│   ├── types
│   │   ├── local-storage.d.ts
│   │   └── types.d.ts
│   └── vite-env.d.ts
├── tsconfig.json
└── vite.config.ts

31 directories, 65 files
```

- **State Management**: State management in this application is handled
  manually, without the use of a state management library. This gives a
  deep understanding of how state flows through the application, a
  fundamental concept in web development.

##### Code Example - State Management

```ts
// FILE: components/about/about.ts
// _______________________________________________

import { useAboutEvents, useCreateHTML } from '../../hooks';
import { useFakeStoreApi } from '../../api/use-fake-store-api';
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
    
    // if item is selected => detailed about page
    useCreateHTML(productDivElement, () => (`
			<div class='product-content' data-id='${ productData.id }'>
		    <h1>${ productData.title }</h1>
		    <img src='${ productData.image }' alt='${ productData.title }' />
		    <p class='description'>${ productData.description }</p>
		    <p class='product-price'>$${ productData.price.toFixed(2) }</p>
		    <div class='button-container'>  <!-- New button container -->
		      <button class='btn1 about-button add-to-cart add-to-cart-button' data-id='${ productData.id }'>
		       Add to Cart
		      </button>
		      <button class='btn2 about-button go-back add-to-cart-button'>
		       Go Back to Products
		      </button>
		    </div>
      </div>
		`));
    
    
    onProductContentClick(productDivElement, Number(productData.id));
    onAddToCartClick(productDivElement, productData);
    onGoBackClick(productDivElement);
    
    groupedDomNodesFragment.appendChild(productDivElement);
  }
  
  // default about page
  useCreateHTML(aboutInfoDivElement, () => productId ? '' : (`
		<div class='about-info'>
			<h1>About Uncle Jose's T-Shirt Site</h1>
			<p class='about-description'>
				Welcome to Uncle Jose's T-Shirt Site! Our story begins with a passion for unique,
				handmade t-shirts. We believe in creating high-quality t-shirts that express individuality
				and personal style. Each t-shirt is crafted with care and attention to detail. We're committed
				to sustainable and ethical manufacturing practices, ensuring that our t-shirts not only look
				good, but feel good to wear and are good for the environment. Thank you for supporting Uncle
				Jose's T-Shirt Site!
			</p>
		</div>
	`));
  
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
} from '../../components';
import { useComponentList } from '../../hooks';

export async function AboutPage(productId?: string): Promise<DocumentFragment> {
  const groupedDomNodesFragment = new DocumentFragment();
  
  const handleAboutComponent = () => async () => {
    const mainElement = document.createElement('main');
    const aboutProduct = await AboutComponent(productId);
    
    mainElement.appendChild(aboutProduct);
    return mainElement;
  };
  
  // Define the components you want to add in the desired order
  const componentOrder = {
    1: NavbarComponent,
    2: HeaderComponent,
    3: handleAboutComponent(),
    4: FooterComponent,
  };
  
  await useComponentList({
    groupedFragment: groupedDomNodesFragment,
    componentOrder: componentOrder,
  });
  
  return groupedDomNodesFragment;
}
```

## Project Structure

- **src**: Contains the TypeScript source code.
  - **api**: Contains the service to fetch data from the Fake Store API.
  - **components**: Contains reusable UI components.
  - **hooks**: Contains some custom hooks to abstract logic from components.
  - **pages**: Contains the different views of the application.
  - **router**: Contains the custom router hook.
  - **styles**: Contains the global CSS styles.
  - **types**: Contains the custom types to help us throughout the app.
- **public**: Contains static assets such as images and fonts.

## Running the Project

You can run the project locally using the Vite development server. First,
install the dependencies using `npm install` `npm i`
or `pnpm install` `pnpm i`, then run:

```zsh
npm run dev
# OR
pnpm run dev
```
