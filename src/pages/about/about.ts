// src/pages/about/about.ts
// _______________________________________________

import {
	AboutComponent,
	FooterComponent,
	HeaderComponent,
	NavbarComponent,
} from "../../components";
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
		4: FooterComponent
	};
	
	await useComponentList({
		groupedFragment: groupedDomNodesFragment,
		componentOrder: componentOrder,
	});
	
	return groupedDomNodesFragment;
}
