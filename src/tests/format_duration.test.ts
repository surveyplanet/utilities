import { describe, it, expect } from 'vitest';
import { parseDuration } from '../index.js';

describe('parseDuration', () => {
	describe('default H:mm:ss format', () => {
		it('should format zero milliseconds', () => {
			expect(parseDuration(0)).toBe('0:00:00');
		});

		it('should format seconds only', () => {
			expect(parseDuration(45000)).toBe('0:00:45');
		});

		it('should format minutes and seconds', () => {
			expect(parseDuration(125000)).toBe('0:02:05');
		});

		it('should format hours, minutes, and seconds', () => {
			expect(parseDuration(5425000)).toBe('1:30:25');
		});

		it('should pad minutes and seconds to two digits', () => {
			expect(parseDuration(3661000)).toBe('1:01:01');
		});

		it('should not pad hours', () => {
			expect(parseDuration(36000000)).toBe('10:00:00');
		});

		it('should handle exact hour boundaries', () => {
			expect(parseDuration(3600000)).toBe('1:00:00');
		});

		it('should handle exact minute boundaries', () => {
			expect(parseDuration(60000)).toBe('0:01:00');
		});

		it('should handle large durations', () => {
			expect(parseDuration(360000000)).toBe('100:00:00');
		});
	});

	describe('humanize format', () => {
		it('should show 0s for zero milliseconds', () => {
			expect(parseDuration(0, { humanize: true })).toBe('0s');
		});

		it('should show seconds only', () => {
			expect(parseDuration(45000, { humanize: true })).toBe('45s');
		});

		it('should show minutes and seconds', () => {
			expect(parseDuration(125000, { humanize: true })).toBe('2m 5s');
		});

		it('should show hours, minutes, and seconds', () => {
			expect(parseDuration(5425000, { humanize: true })).toBe('1h 30m 25s');
		});

		it('should omit hours when zero', () => {
			const result = parseDuration(90000, { humanize: true });
			expect(result).toBe('1m 30s');
			expect(result).not.toContain('h');
		});

		it('should omit minutes when zero', () => {
			expect(parseDuration(7205000, { humanize: true })).toBe('2h 5s');
		});

		it('should omit seconds when zero but show hours and minutes', () => {
			expect(parseDuration(5400000, { humanize: true })).toBe('1h 30m');
		});

		it('should show only hours when minutes and seconds are zero', () => {
			expect(parseDuration(3600000, { humanize: true })).toBe('1h');
		});

		it('should show only minutes when hours and seconds are zero', () => {
			expect(parseDuration(60000, { humanize: true })).toBe('1m');
		});
	});

	describe('negative values', () => {
		it('should treat negative values as absolute in default format', () => {
			expect(parseDuration(-3600000)).toBe('1:00:00');
		});

		it('should treat negative values as absolute in humanize format', () => {
			expect(parseDuration(-5425000, { humanize: true })).toBe('1h 30m 25s');
		});
	});

	describe('sub-second values', () => {
		it('should round down sub-second values to 0:00:00', () => {
			expect(parseDuration(999)).toBe('0:00:00');
		});

		it('should round down sub-second values to 0s in humanize format', () => {
			expect(parseDuration(999, { humanize: true })).toBe('0s');
		});

		it('should floor partial seconds', () => {
			expect(parseDuration(1500)).toBe('0:00:01');
		});
	});
});
