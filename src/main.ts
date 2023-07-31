// FILE: src/main.ts
// _______________________________________________

import './styles/main.css';
import { useRouteChange } from "./hooks/router/useRouteChange.ts";

// Select the root element where the app will be rendered
const app = document.querySelector<HTMLDivElement>('#app')!;

// Defining a `helper` function to handle URL changes
function handleURLChange() {
	useRouteChange(app);
}

// Listen for URL changes and handle them
window.addEventListener('hashchange', handleURLChange);
// Handle & display the initial URL
handleURLChange();
