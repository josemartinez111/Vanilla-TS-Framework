// FILE: components/navbar/navbar.ts
// _______________________________________________

import './navbar.css';

export function NavbarComponent(): HTMLElement {
	const navbarNavElement = document.createElement('nav');
	navbarNavElement.classList.add("navbar");
	
	const routes = ['home', 'about', 'products', 'cart'];
	
	const listItems = routes
		.map((route: string) => {
			const capitalizedRoute = `${ route[0].toUpperCase() }${ route.substring(1) }`;
			return (`
        <li class="nav-item">
          <a class="nav-link" href="#${ route }">
            ${
							route === 'cart'
								? `<img src="/assets/images/white_amz_cart.png" alt="Cart">`
								: capitalizedRoute
			       }
          </a>
        </li>
      `);
		})
		.join('');
	
	navbarNavElement.innerHTML = `
    <div class="nav-links">
      <ul class="nav-list">${ listItems }</ul>
    </div>
  `;
	
	return navbarNavElement;
}

