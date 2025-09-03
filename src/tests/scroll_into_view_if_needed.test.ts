// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { scrollIntoViewIfNeeded } from '../scroll_into_view_if_needed';

// Define interface for testing purposes
interface ElementWithScrollIntoViewIfNeeded extends Element {
	scrollIntoViewIfNeeded: () => void;
}

describe('scrollIntoViewIfNeeded', () => {
	let element: Element;
	const getBoundingClientRectMock = vi.fn();
	const scrollIntoViewMock = vi.fn();
	const scrollIntoViewIfNeededMock = vi.fn();
	let hasNativeImplementation = false;

	beforeEach(() => {
		element = document.createElement('div');

		getBoundingClientRectMock.mockReset();
		element.getBoundingClientRect = getBoundingClientRectMock;

		scrollIntoViewMock.mockReset();
		element.scrollIntoView = scrollIntoViewMock;

		scrollIntoViewIfNeededMock.mockReset();
		// Remove the scrollIntoViewIfNeeded method from the element if it was added
		if (hasNativeImplementation) {
			const el = element as ElementWithScrollIntoViewIfNeeded;
			// Use property assignment to undefined instead of delete
			el.scrollIntoViewIfNeeded = undefined as unknown as () => void;
			hasNativeImplementation = false;
		}

		// Setup window dimensions
		Object.defineProperty(window, 'innerHeight', {
			value: 768,
			writable: true,
		});
		Object.defineProperty(window, 'innerWidth', {
			value: 1024,
			writable: true,
		});
	});
	//ai generated
	afterEach(() => {
		// Ensure the test environment is clean
		if (hasNativeImplementation) {
			const el = element as ElementWithScrollIntoViewIfNeeded;
			el.scrollIntoViewIfNeeded = undefined as unknown as () => void;
			hasNativeImplementation = false;
		}
	});

	it('should use native implementation if available', () => {
		// Add the method to the element itself (not to the prototype)
		hasNativeImplementation = true;
		(element as ElementWithScrollIntoViewIfNeeded).scrollIntoViewIfNeeded =
			scrollIntoViewIfNeededMock;

		scrollIntoViewIfNeeded(element);

		// Should use native implementation
		expect(scrollIntoViewIfNeededMock).toHaveBeenCalledTimes(1);
		// Should not call the fallback
		expect(getBoundingClientRectMock).not.toHaveBeenCalled();
		expect(scrollIntoViewMock).not.toHaveBeenCalled();
	});

	it('should not scroll if element is already visible in viewport (fallback)', () => {
		// Mock an element that is fully visible in the viewport
		getBoundingClientRectMock.mockReturnValue({
			top: 100,
			bottom: 200,
			left: 100,
			right: 200,
		} as DOMRect);

		scrollIntoViewIfNeeded(element);

		// Expect scrollIntoView not to be called
		expect(scrollIntoViewMock).not.toHaveBeenCalled();
	});

	it('should scroll if element is not visible in viewport (fallback)', () => {
		// Mock an element that is outside the viewport
		getBoundingClientRectMock.mockReturnValue({
			top: -100,
			bottom: 50,
			left: 100,
			right: 200,
		} as DOMRect);

		scrollIntoViewIfNeeded(element);

		// Expect scrollIntoView to be called with default options
		expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
	});

	it('should scroll with custom options if provided (fallback)', () => {
		// Mock an element that is outside the viewport
		getBoundingClientRectMock.mockReturnValue({
			top: 800,
			bottom: 900,
			left: 100,
			right: 200,
		} as DOMRect);

		const customOptions = {
			behavior: 'auto',
			block: 'center',
		} as ScrollIntoViewOptions;
		scrollIntoViewIfNeeded(element, customOptions);

		// Expect scrollIntoView to be called with custom options
		expect(scrollIntoViewMock).toHaveBeenCalledWith(customOptions);
	});
});
