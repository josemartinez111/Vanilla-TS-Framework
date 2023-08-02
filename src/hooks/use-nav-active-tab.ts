// FILE: hooks/use-nav-active-tab.ts
// _______________________________________________

type ActiveTabTypes = {
	removeActive: (navElement: HTMLElement) => void;
	markAsActive: (navElement: HTMLElement, id: string) => void;
	markHomeAsActive: (navElement: HTMLElement) => void;
};

export function useNavActiveTab(): ActiveTabTypes {
	const markAsActive = (navElement: HTMLElement, itemID: string): void => {
		const newActiveLink = navElement.querySelector(`#${ itemID }`);
		if (newActiveLink) newActiveLink.classList.add('active');
	};
	
	const removeActive = (navElement: HTMLElement): void => {
		const previousActiveLink = navElement.querySelector('.nav-link.active');
		if (previousActiveLink) previousActiveLink.classList.remove('active');
	};
	
	const markHomeAsActive = (navElement: HTMLElement): void => {
		navElement.querySelector('#home').classList.add('active');
	};
	
	return {
		markAsActive,
		removeActive,
		markHomeAsActive,
	};
}
