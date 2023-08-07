// FILE: hooks/use-component-list.ts
// _______________________________________________

type ComponentListProps = {
  groupedFragment: DocumentFragment;
  componentOrder: { [order: number]: Function | (() => Promise<HTMLElement>) };
}

/**
 * Appends components to a given DocumentFragment based on the provided order.
 * @param {DocumentFragment} groupedFragment - The fragment to which components should be appended.
 * @param componentOrder - An object where the key represents the order/position
 *                         and the value is the component function or a promise of a component function.
 */
export async function useComponentList({ groupedFragment, componentOrder }: ComponentListProps): Promise<void> {
  const sortedKeys = Object.keys(componentOrder)
    .sort((orderA: string, orderB: string) => {
      return parseInt(orderA) - parseInt(orderB);
    });
  
  const handleAllPromises = () => async (key: string) => {
    const componentFnOrPromise = componentOrder[ parseInt(key) ];
    const result = componentFnOrPromise();
    return await result;
  };
  
  const components = await Promise.all(sortedKeys.map(handleAllPromises()));
  
  components.forEach((component: HTMLElement) => (
    groupedFragment.appendChild(component)
  ));
}
