// FILE: pages/home/home.ts
// _______________________________________________

import {
  FooterComponent,
  HeaderComponent,
  NavbarComponent,
  HomeComponent,
} from '../../components';
import { useComponentList } from '../../hooks';

export async function HomePage(): Promise<DocumentFragment> {
  const groupedDomNodesFragment = new DocumentFragment();
  
  // Define the components you want to add in the desired order
  const componentOrder = {
    1: NavbarComponent,
    2: HeaderComponent,
    3: HomeComponent,
    4: FooterComponent,
  };
  
  await useComponentList({
    groupedFragment: groupedDomNodesFragment,
    componentOrder: componentOrder,
  });
  
  return groupedDomNodesFragment;
}
