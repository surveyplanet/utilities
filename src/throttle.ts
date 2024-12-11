/**
 * Limits the function to being called at most once per specified time period:
 * It will execute immediately, then enforce a cool down period
 * Additional calls during the cool down are ignored
 * Best for: scroll handlers, game controls, API rate limiting
 * @param func
 * @param waitFor
 * @see https://css-tricks.com/debouncing-throttling-explained-examples
 * @returns function
 */

export const throttle = <F extends (...args: Parameters<F>) => ReturnType<F>>(
	func: F,
	waitFor = 0
) => {
	let lastExecuted = 0;
	let timeout: NodeJS.Timeout | null = null;

	return (...args: Parameters<F>) => {
		const now = Date.now();
		const timeSinceLastExecution = now - lastExecuted;

		// If we're still within the wait period
		if (timeSinceLastExecution < waitFor) {
			// Clear any existing timeout
			if (timeout) {
				clearTimeout(timeout);
			}

			// Schedule the execution for when the wait period ends
			timeout = setTimeout(() => {
				lastExecuted = Date.now();
				func(...args);
			}, waitFor - timeSinceLastExecution);

			return;
		}

		// If we're outside the wait period, execute immediately
		lastExecuted = now;
		func(...args);
	};
};
