/**
 * Type definition for the non-standard scrollIntoViewIfNeeded method
 */
interface ElementWithScrollIntoViewIfNeeded extends Element {
	scrollIntoViewIfNeeded(): void;
}

/**
 * Scrolls an element into view only if it's not already visible in the viewport.
 * Uses the native scrollIntoViewIfNeeded implementation if available, otherwise falls back
 * to a custom implementation. The fallback uses the standard scrollIntoViewIfNeeded method.
 *
 * @param element - The DOM element to scroll into view if needed
 * @param options - Optional ScrollIntoViewOptions object to customize the scrolling behavior
 *                  (only used in the fallback implementation)
 *
 * @example
 * ```typescript
 * // Basic usage
 * const element = document.querySelector('.my-element');
 * scrollIntoViewIfNeeded(element);
 *
 * // With custom options (for browsers using the fallback)
 * scrollIntoViewIfNeeded(element, { behavior: 'smooth', block: 'center' });
 * ```
 */
export function scrollIntoViewIfNeeded(
	element: Element,
	options: ScrollIntoViewOptions = { behavior: 'smooth' }
): void {
	// Safe type check for the native method
	// We need to check both if the element has the method and if it's a function
	const hasNativeMethod =
		typeof element !== 'undefined' &&
		'scrollIntoViewIfNeeded' in element &&
		typeof (element as ElementWithScrollIntoViewIfNeeded)
			.scrollIntoViewIfNeeded === 'function';

	if (hasNativeMethod) {
		// Call the native implementation with proper type cast
		(element as ElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded();
		return;
	}

	// Fallback implementation for browsers that don't support it
	const rect = element.getBoundingClientRect();
	const isVisible =
		rect.top >= 0 &&
		rect.bottom <= window.innerHeight &&
		rect.left >= 0 &&
		rect.right <= window.innerWidth;

	if (!isVisible) {
		element.scrollIntoView(options);
	}
}
