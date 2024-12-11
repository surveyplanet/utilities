/**
 * Delays execution and resets the delay timer each time the function is called:
 * It waits until calls have "settled down" before executing
 * If you keep calling it, it keeps delaying until you stop
 * Best for: search inputs, window resize handlers, save drafts
 * @param func
 * @param waitFor
 * @see https://css-tricks.com/debouncing-throttling-explained-examples
 * @returns
 */

export const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
	func: F,
	waitFor = 0
) => {
	let timeout: NodeJS.Timeout;

	return (...args: Parameters<F>) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), waitFor);
	};
};
