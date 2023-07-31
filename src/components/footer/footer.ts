// FILE: components/footer/footer.ts
// _______________________________________________

export function FooterComponent(): HTMLElement {
	const footer = document.createElement('footer');
	footer.innerHTML = `
		<p>© 2023 <b>Uncle Jose's T-Shirt Site</b></p>
	`;
	
	return footer;
}