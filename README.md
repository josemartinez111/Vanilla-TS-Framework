# Uncle Jose's T-Shirt Shop

This project, developed by Jose Martinez, is an e-commerce Single Page Application (SPA) built from scratch using Vanilla Typescript, HTML, and CSS. It showcases a list of t-shirts, an about page, a products page, and simulates a shopping cart experience. The SPA is built without the use of frameworks like React or Vue, which provides an opportunity to grasp the underlying web development concepts that these frameworks abstract away.

## Key Features

- **Vanilla TypeScript**: The project uses TypeScript, a statically typed superset of JavaScript, to bring type-safety and improved developer tooling to the project. Working with Vanilla TypeScript, as opposed to a framework like React or Vue, provides a more fundamental understanding of JavaScript, the Document Object Model (DOM), and state management.

- **Custom Routing**: Unlike using a routing library as in most React or Vue applications, this project implements custom routing using the browser's `hashchange` event. This functionality allows for navigation between different views without a full page reload, providing a SPA-like user experience.

##### Code Example - Custom Routing
```ts
// FILE: hooks/router/use-router.ts
// _______________________________________________

import { AboutPage, CartPage, HomePage, ProductsPage } from "../pages";

export function useRouter(rootElement: HTMLElement) {
	const useRouteChange = async (): Promise<void> => { // make this function async
		// clear the root element content
		rootElement.innerHTML = '';
		
		const [routeName, productId] = location.hash.split('/');
		
		switch (routeName) {
			case '#home':
				rootElement.appendChild(HomePage());
				break;
			case '#about':
				rootElement.appendChild(await AboutPage(productId));
				break;
			case '#products': // New case for 'products'
				rootElement.appendChild(await ProductsPage());
				break;
			case '#cart':
				rootElement.appendChild(CartPage());
				break;
			default:
				location.hash = 'home';
		}
	};
	
	return {
		useRouteChange,
	};
}

```

- **Reusable Components**: The project uses a component-based architecture, a concept central to most modern web development frameworks. Components such as header, footer, and navbar are reused across different pages to maintain consistency. Each component is implemented as a function that returns a DOM element, which can then be appended where necessary.

##### Code Example - Reusable Component
```ts
// FILE: components/products/products.ts
// _______________________________________________

import { ProductType } from "../../types/types";
import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './products.css';

export async function ProductsComponent(category: string, limit: number = 24): Promise<DocumentFragment> {
	const { getProductsInCategory } = useFakeStoreApi();
	const products = await getProductsInCategory(category, limit);
	
	const fragment = new DocumentFragment();
	
	const productList = document.createElement('div');
	productList.classList.add('product-list'); // Add the class directly to the markup
	
	products.forEach((product: ProductType) => {
		const productElement = document.createElement('div');
		productElement.classList.add('product-item'); // Add the class directly to the markup
		
		productElement.innerHTML = `
      <h2 class="product-title">${ product.title }</h2>
      <div class="product-image">
        <img src="${ product.image }" alt="${ product.title }" />
      </div>
      <p class="product-price">$${ product.price.toFixed(2) }</p>
      <button>Add to Cart</button>
    `;
		
		productElement.onclick = () => {
			location.hash = `#about/${ product.id }`;
		};
		
		productList.appendChild(productElement);
	});
	
	fragment.appendChild(productList);
	return fragment;
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
} from "../../components";

export async function ProductsPage(): Promise<DocumentFragment> {
	const fragment = new DocumentFragment();
	
	fragment.appendChild(NavbarComponent());
	fragment.appendChild(HeaderComponent());
	
	// Fetch men's clothing
	const mensClothing = await ProductsComponent("men's clothing");
	fragment.appendChild(mensClothing);
	
	// Fetch women's clothing
	const womensClothing = await ProductsComponent("women's clothing");
	fragment.appendChild(womensClothing);
	
	fragment.appendChild(FooterComponent());
	
	return fragment;
}
```

- **API Integration**: This project integrates with the Fake Store API to fetch product data. This simulates the experience of fetching and displaying data from a real back-end service. Typically, a framework would provide hooks or other abstractions to handle this, but in this project it's handled manually with the fetch API.

##### Code Example - API Integration
```ts
// FILE: src/api/use-fake-store-api.ts
// _______________________________________________

import { ProductListType, ProductType } from "../types/types";

export function useFakeStoreApi() {
	const getAllProducts = async (): Promise<ProductListType> => {
		const response = await fetch('https://fakestoreapi.com/products');
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const getSingleProduct = async (id: number): Promise<ProductType> => {
		const response = await fetch(`https://fakestoreapi.com/products/${ id }`);
		const product = await (response.json()) as ProductType;
		return product;
	};
	
	const getLimitedProducts = async (limit: number = 5): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?limit=${ limit }`);
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const getProductsInCategory = async (category: string, limit: number = 20): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=${limit}`);
		const products = await response.json() as ProductListType;
		
		// Check if the number of products is less than the desired limit
		if (products.length < limit) {
			// Duplicate the existing products to fill up the remaining slots
			const additionalProductsNeeded = limit - products.length;
			const duplicatedProducts = Array.from({ length: additionalProductsNeeded }, (_, index) => {
				const sourceProductIndex = index % products.length;
				const clonedProduct = { ...products[sourceProductIndex] }; // Clone the product using the spread operator
				return clonedProduct;
			});
			
			// Append the duplicated products to the product's array
			products.push(...duplicatedProducts);
		}
		
		return products;
	};
	
	
	const getSortedProducts = async (order: 'asc' | 'desc'): Promise<ProductListType> => {
		const response = await fetch(`https://fakestoreapi.com/products?sort=${ order }`);
		const products = await (response.json()) as ProductListType;
		return products;
	};
	
	const getAllCategories = async (): Promise<Array<string>> => {
		const response = await fetch('https://fakestoreapi.com/products/categories');
		const categories = await (response.json()) as Array<string>;
		return categories;
	};
	
	return {
		getAllProducts,
		getSingleProduct,
		getLimitedProducts,
		getSortedProducts,
		getAllCategories,
		getProductsInCategory,
	};
}
```

- **Modular Design**: The application is designed in a modular way, similar to the structure of projects developed with more complex frameworks. Each component, page, and hook is contained in its own module, allowing for better maintainability and scalability.

##### Code Example - Modular Design
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
│   │   │   └── Gotham-ssm-medium.otf
│   │   └── images
│   │       ├── cart.png
│   │       └── white_amz_cart.png
│   └── vite.svg
├── src
│   ├── api
│   │   └── use-fake-store-api.ts
│   ├── components
│   │   ├── about
│   │   │   ├── about.css
│   │   │   └── about.ts
│   │   ├── footer
│   │   │   ├── footer.css
│   │   │   └── footer.ts
│   │   ├── header
│   │   │   └── header.ts
│   │   ├── index.ts
│   │   ├── navbar
│   │   │   ├── navbar.css
│   │   │   └── navbar.ts
│   │   └── products
│   │       ├── products.css
│   │       └── products.ts
│   ├── hooks
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

22 directories, 32 files
```

- **State Management**: State management in this application is handled manually, without the use of a state management library. This gives a deep understanding of how state flows through the application, a fundamental concept in web development.

##### Code Example - State Management
```ts
// FILE: components/about/about.ts
// _______________________________________________

import { useFakeStoreApi } from "../../api/use-fake-store-api";
import './about.css';

export async function AboutComponent(productId?: string): Promise<DocumentFragment> {
	const fragment = new DocumentFragment();
	const aboutInfo = document.createElement('div');
	
	if (productId) {
		const { getSingleProduct } = useFakeStoreApi();
		const product = await getSingleProduct(Number(productId));
		
		const productElement = document.createElement('div');
		productElement.classList.add('about-product');
		
		productElement.innerHTML = `
      <h1>${ product.title }</h1>
      <img src="${ product.image }" alt="${ product.title }" />
      <p class="description">${ product.description }</p>
      <p class="product-price">$${ product.price.toFixed(2) }</p>
      <button>Add to Cart</button>
    `;
		
		fragment.appendChild(productElement);
	}
	
	aboutInfo.innerHTML = productId ? '' : `
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
`;
	
	fragment.appendChild(aboutInfo);
	return fragment;
}
```
## Project Structure

- `src`: Contains the TypeScript source code.
  - `components`: Contains reusable UI components.
  - `pages`: Contains the different views of the application.
  - `router`: Contains the custom router hook.
  - `api`: Contains the service to fetch data from the Fake Store API.
  - `styles`: Contains the global CSS styles.
- `public`: Contains static assets such as images and fonts.

## Running the Project

You can run the project locally using the Vite development server. First, install the dependencies using `npm install` or `pnpm install`, then run:

```zsh
npm run dev
# OR
pnpm run dev
