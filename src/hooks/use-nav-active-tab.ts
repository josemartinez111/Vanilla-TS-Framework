// FILE: hooks/use-nav-active-tab.ts
// _______________________________________________

/**
 * useNavActiveTab is a custom hook that handles the active tab logic for the navigation bar.
 * It listens to the 'routechange' event, and when this event is triggered, it updates the
 * active link in the navigation bar based on the route that was changed to. It also sets
 * the 'home' link as active by default.
 *
 * @param {HTMLElement} navbarNavElement - The navigation bar element.
 */
export function useNavActiveTab(navbarNavElement: HTMLElement): void {
	window.addEventListener('routechange', (event: CustomEvent) => {
		// Remove the 'active' class from the previous active link
		const previousActiveLink = navbarNavElement.querySelector('.nav-link.active');
		if (previousActiveLink) previousActiveLink.classList.remove('active');
		
		// Add the 'active' class to the new active link
		const newActiveLink = navbarNavElement.querySelector(`#${event.detail}`);
		if (newActiveLink) newActiveLink.classList.add('active');
	});
	
	// Mark the home link as active by default
	navbarNavElement.querySelector('#home').classList.add('active');
}
