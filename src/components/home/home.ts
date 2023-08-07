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
