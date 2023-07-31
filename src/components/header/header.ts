// FILE: components/header/header.ts
// _______________________________________________

export function HeaderComponent(): HTMLElement {
	const header = document.createElement('header');
	header.innerHTML = `
		<h1>Uncle Jose's T-Shirt Site</h1>
	`;
	
	return header;
}