import { describe, it, expect, vi } from 'vitest';
import { once } from '../index.js';

describe('once', () => {
	it('should call the function only once', () => {
		const mockFn = vi.fn(() => 'result');
		const onceFn = once(mockFn);

		// Call multiple times
		const result1 = onceFn();
		const result2 = onceFn();
		const result3 = onceFn();

		// Should only be called once
		expect(mockFn).toHaveBeenCalledTimes(1);

		// All results should be the same
		expect(result1).toBe('result');
		expect(result2).toBe('result');
		expect(result3).toBe('result');
	});

	it('should pass arguments correctly', () => {
		const mockFn = vi.fn((x: number, y: string) => `${x}-${y}`);
		const onceFn = once(mockFn);

		// First call with arguments
		const result1 = onceFn(1, 'test');

		// Second call with different arguments
		const result2 = onceFn(2, 'different');

		// Should only be called once with first set of arguments
		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(mockFn).toHaveBeenCalledWith(1, 'test');
		expect(mockFn).not.toHaveBeenCalledWith(2, 'different');

		// Both results should be from first call
		expect(result1).toBe('1-test');
		expect(result2).toBe('1-test');
	});

	it('should maintain the same reference', () => {
		const mockFn = vi.fn(() => ({ value: 'test' }));
		const onceFn = once(mockFn);

		const result1 = onceFn();
		const result2 = onceFn();

		// Should return same object reference
		expect(result1).toBe(result2);
	});

	it('should work with async functions', async () => {
		// eslint-disable-next-line @typescript-eslint/require-await
		const mockFn = vi.fn(async () => 'async result');
		const onceFn = once(mockFn);

		const promise1 = onceFn();
		const promise2 = onceFn();

		const [result1, result2] = await Promise.all([promise1, promise2]);

		expect(mockFn).toHaveBeenCalledTimes(1);
		expect(result1).toBe('async result');
		expect(result2).toBe('async result');
	});

	it('should preserve this context', () => {
		class TestClass {
			private value = 'initial';

			constructor() {
				this.getValue = once(this.getValue.bind(this));
			}

			getValue() {
				this.value = 'modified';
				return this.value;
			}
		}

		const instance = new TestClass();

		const result1 = instance.getValue();
		const result2 = instance.getValue();

		expect(result1).toBe('modified');
		expect(result2).toBe('modified');
	});
});
