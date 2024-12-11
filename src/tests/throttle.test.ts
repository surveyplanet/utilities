import { describe, it, expect, vi, beforeEach } from 'vitest';
import { throttle } from '../index';

describe('throttle', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it('should execute the function immediately on first call', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 1000);

		throttledFn();
		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should not execute more than once within the wait period', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 1000);

		throttledFn();
		throttledFn();
		throttledFn();

		expect(mockFn).toHaveBeenCalledTimes(1);
	});

	it('should execute with the latest arguments after wait period', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 1000);

		throttledFn('first');
		throttledFn('second');
		throttledFn('third');

		vi.advanceTimersByTime(1000);

		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenLastCalledWith('third');
	});

	it('should execute immediately after wait period has passed', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 1000);

		throttledFn('first');
		vi.advanceTimersByTime(1100);
		throttledFn('second');

		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenLastCalledWith('second');
	});

	it('should properly handle multiple arguments', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 1000);

		throttledFn(1, 'test', { key: 'value' });

		expect(mockFn).toHaveBeenCalledWith(1, 'test', { key: 'value' });
	});

	it('should cancel pending execution when called again within wait period', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 1000);

		throttledFn('first');
		vi.advanceTimersByTime(500);
		throttledFn('second');
		vi.advanceTimersByTime(400);
		throttledFn('third');
		vi.advanceTimersByTime(1000);

		expect(mockFn).toHaveBeenCalledTimes(2);
		expect(mockFn).toHaveBeenLastCalledWith('third');
	});

	it('should work with zero wait time', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn, 0);

		throttledFn();
		throttledFn();
		throttledFn();

		expect(mockFn).toHaveBeenCalledTimes(3);
	});

	it('should handle default wait time', () => {
		const mockFn = vi.fn();
		const throttledFn = throttle(mockFn);

		throttledFn();
		throttledFn();

		expect(mockFn).toHaveBeenCalledTimes(2);
	});
});
