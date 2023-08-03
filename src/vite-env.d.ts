// src/vite-env.d.ts
/// <reference types="vite/client" />

declare global {
	// noinspection JSUnusedGlobalSymbols
	interface WindowEventMap extends GlobalEventHandlersEventMap, WindowEventHandlersEventMap {
		/**
		 * The 'routechange' event is a custom event that we have defined in our application.
		 * When the route changes, this event is fired. We can listen to this event in our components
		 * and execute code when the route changes.
		 *
		 * The event detail contains the ID of the route that we changed to. We can use this ID to update
		 * the active link in the navigation bar, for example.
		 */
		routechange: CustomEvent;
	}
}
