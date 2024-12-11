import { describe, test, expect, vi } from 'vitest';
import { once } from '../once';

describe('once', () => {
	test('should call the function only once', () => {
		const fn = vi.fn();
		const onceFn = once(fn);
		const event = new Event('click');

		onceFn(event);
		expect(fn).toHaveBeenCalledTimes(1);

		onceFn(event);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test('should call the function with the correct arguments', () => {
		const fn = vi.fn();
		const onceFn = once(fn);
		const event = new Event('click');

		onceFn(event);
		expect(fn).toHaveBeenCalledWith(event);
	});
});
