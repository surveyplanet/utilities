import { test, expect, describe, vi } from 'vitest';
import { throttle } from '../throttle';

describe('throttle', () => {
	test('should call the function immediately and then throttle subsequent calls', () => {
		const fn = vi.fn();
		const throttledFn = throttle(fn);

		// Call the throttled function multiple times
		throttledFn(new Event('click'));
		throttledFn(new Event('click'));
		throttledFn(new Event('click'));

		// Only the first call should be executed immediately
		expect(fn).toHaveBeenCalledTimes(1);

		// Wait for the throttle period to pass
		setTimeout(() => {
			// Call the throttled function again after the throttle period
			throttledFn(new Event('click'));
			expect(fn).toHaveBeenCalledTimes(2);
		}, 300);
	});
});
