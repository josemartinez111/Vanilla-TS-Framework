// FILE: hooks/use-create-html.ts
// _______________________________________________

type CustomElement = HTMLDivElement | HTMLElement;

/**
 * Appends HTML markup to the provided DOM element.
 *
 * @param {CustomElement} element - The DOM element to which the markup should be appended.
 * @param {Function} htmlTemplateCallback - A callback function that returns the desired HTML markup as a string.
 *
 * Usage:
 * useCreateHTML(divElement, () => `
 *   <div>Some markup here...</div>
 * `);
 */
export function useCreateHTML(element: CustomElement, htmlTemplateCallback: () => string): void {
  element.innerHTML = htmlTemplateCallback();
}
