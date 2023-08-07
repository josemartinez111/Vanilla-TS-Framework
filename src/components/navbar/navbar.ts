// FILE: components/navbar/navbar.ts
// _______________________________________________

import './navbar.css';
import { useCreateHTML, useNavActiveTab } from '../../hooks';

export function NavbarComponent(): HTMLElement {
  const {
    markAsActive,
    removeActive,
    markHomeAsActive,
  } = useNavActiveTab();
  
  const navbarNavElement = document.createElement('nav');
  navbarNavElement.classList.add('navbar');
  
  const routes = ['home', 'about', 'products', 'cart'];
  
  const listItems = routes
    .map((route: string) => {
      const capitalizedRoute = `${ route[ 0 ].toUpperCase() }${ route.substring(1) }`;
      
      return (`
        <li class='nav-item'>
          <a id='${ route }' class='nav-link' href='#${ route }'>
            ${
        route === 'cart'
          ? `<img src='/assets/images/white_amz_cart.png' alt='Cart'>`
          : capitalizedRoute
      }
          </a>
        </li>
      `);
    })
    .join('');
  
  useCreateHTML(navbarNavElement, () => (`
    <div class='navbar-content'>
      <div class='unc'>Uncle Jose's T-Shirt</div>
      <div class='nav-links'>
        <ul class='nav-list'>${ listItems }</ul>
      </div>
    </div>
  `));
  
  // Mark the home link as active by default
  markHomeAsActive(navbarNavElement);
  
  // Using our custom hook to handle the
  // active tab logic when the route changes
  window.addEventListener('routechange', (event) => {
    const customEvent = event as CustomEvent;
    removeActive(navbarNavElement);
    markAsActive(navbarNavElement, customEvent?.detail);
  });
  
  return navbarNavElement;
}
