// FILE: components/footer/footer.ts
// _______________________________________________

import './footer.css';

export function FooterComponent(): HTMLElement {
	const githubLogoUrl = "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
	const githubRepoURL = "https://github.com/josemartinez111/Vanilla-TS-Framework";
	
	const div = document.createElement('div');
	div.classList.add("footer");
	
	div.innerHTML = `
    <footer class="footer-content">
      <p>© 2023 <b>Uncle Jose's T-Shirt Site</b> |
        <a href="${ githubRepoURL }" class="footer-link" target="_blank">
          <img src="${ githubLogoUrl }" alt="GitHub" class="github">
          GitHub Repository
        </a>
      </p>
    </footer>
  `;
	
	return div;
}
