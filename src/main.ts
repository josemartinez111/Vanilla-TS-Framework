// FILE: src/main.ts
// _______________________________________________

import './styles/main.css';
import { useRoute } from "./hooks/router/use-route";

// Select the root element where the app will be rendered
const app = document.querySelector<HTMLDivElement>('#app')!;

// Use the custom hook useRoute
const { useRouteChange } = useRoute(app);

/**
 * @hashchange
 * The hashchange event is fired when the fragment identifier of
 * the URL has changed (the part of the URL beginning with and
 * following the # symbol)
 * */
// Listen for URL changes and handle them
window.addEventListener('hashchange', useRouteChange);
// Handle & display the initial URL
useRouteChange();
