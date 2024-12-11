import { describe, test, expect, vi } from 'vitest';
import { debounce, delay } from '../index';

describe('debounce', () => {
	const waitFor = 100;

	test('should call the function after the specified delay with correct context', async () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, waitFor);
		const event = new Event('click');

		debouncedFn(event);
		expect(fn).not.toHaveBeenCalled();

		await delay(waitFor + 1);
		expect(fn).toHaveBeenCalled();
		expect(fn).toHaveBeenCalledWith(event);
	});

	test('should reset the delay if called again within the delay period', async () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, waitFor);

		debouncedFn();
		debouncedFn();
		expect(fn).not.toHaveBeenCalled();

		await delay(waitFor + 1);
		expect(fn).toHaveBeenCalledTimes(1);
	});

	test('should not reset the delay called again after the delay period', async () => {
		const fn = vi.fn();
		const debouncedFn = debounce(fn, waitFor);

		debouncedFn();
		await delay(waitFor + 1);

		debouncedFn();
		await delay(waitFor + 1);

		expect(fn).toHaveBeenCalledTimes(2);
	});
});
