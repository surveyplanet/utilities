import { describe, test, expect, vi } from 'vitest';
import { debounce } from '../debounce';

describe('debounce', () => {
	test('should call the function after the specified delay', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn);
		const event = new Event('click');

		debouncedFn(event);
		expect(fn).not.toHaveBeenCalled();

		setTimeout(() => {
			expect(fn).toHaveBeenCalled();
		}, 150);
	});

	test('should reset the delay if called again within the delay period', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn);
		const event = new Event('click');

		debouncedFn(event);
		debouncedFn(event);
		expect(fn).not.toHaveBeenCalled();

		setTimeout(() => {
			expect(fn).toHaveBeenCalledTimes(1);
		}, 150);
	});

	test('should call the function with the correct context', () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn);
		const event = new Event('click');

		debouncedFn(event);

		setTimeout(() => {
			expect(fn).toHaveBeenCalledWith(event);
		}, 150);
	});
});
