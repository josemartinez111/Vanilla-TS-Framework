// FILE: components/header/header.ts
// _______________________________________________

import { useCreateHTML } from '../../hooks';

export function HeaderComponent(): HTMLElement {
  const headerElement = document.createElement('header');
  
  useCreateHTML(headerElement, () => (`
      <h1 class='my-header'>
        Uncle Jose's T-Shirt Site
      </h1>
    `));
  
  return headerElement;
}