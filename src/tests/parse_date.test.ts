import { describe, it, expect } from 'vitest';
import { type FormatType, parseDate } from '../index.js';

const TEST_DATE = '2025-06-15T14:30:00Z';

describe('parseDate', () => {
	describe('default behavior', () => {
		it('should format a date string with the default dateTime format', () => {
			const result = parseDate(TEST_DATE);
			expect(result).toBe('Sunday, June 15, 2025 at 2:30 PM');
		});

		it('should accept a Date object', () => {
			const result = parseDate(new Date(TEST_DATE));
			expect(result).toBe('Sunday, June 15, 2025 at 2:30 PM');
		});

		it('should accept a numeric timestamp', () => {
			const timestamp = new Date(TEST_DATE).getTime();
			const result = parseDate(timestamp);
			expect(result).toBe('Sunday, June 15, 2025 at 2:30 PM');
		});

		it('should default to UTC when no timezone is provided', () => {
			const result = parseDate(TEST_DATE);
			expect(result).toContain('2:30 PM');
		});

		it('should fall back to dateTime when an invalid format is provided', () => {
			const result = parseDate(TEST_DATE, {
				format: 'invalid' as unknown as FormatType,
			});
			expect(result).toBe('Sunday, June 15, 2025 at 2:30 PM');
		});
	});

	describe('format option', () => {
		it('should format as date only', () => {
			const result = parseDate(TEST_DATE, { format: 'date' });
			expect(result).toBe('June 15, 2025');
		});

		it('should format as time only', () => {
			const result = parseDate(TEST_DATE, { format: 'time' });
			expect(result).toBe('2:30 PM');
		});

		it('should format as dateTime explicitly', () => {
			const result = parseDate(TEST_DATE, { format: 'dateTime' });
			expect(result).toBe('Sunday, June 15, 2025 at 2:30 PM');
		});
	});

	describe('timezone option', () => {
		it('should apply a custom timezone', () => {
			const result = parseDate(TEST_DATE, {
				timezone: 'America/New_York',
			});
			expect(result).toContain('10:30 AM');
		});

		it('should handle a Pacific timezone', () => {
			const result = parseDate(TEST_DATE, {
				timezone: 'America/Los_Angeles',
			});
			expect(result).toContain('7:30 AM');
		});
	});

	describe('compact option', () => {
		it('should remove the weekday and shorten the month for dateTime', () => {
			const result = parseDate(TEST_DATE, { compact: true });
			expect(result).not.toContain('Sunday');
			expect(result).toContain('Jun');
			expect(result).not.toContain('June');
		});

		it('should remove the weekday and shorten the month for date format', () => {
			const result = parseDate(TEST_DATE, {
				format: 'date',
				compact: true,
			});
			expect(result).toBe('Jun 15, 2025');
		});

		it('should not shorten the month when format is time', () => {
			const result = parseDate(TEST_DATE, {
				format: 'time',
				compact: true,
			});
			expect(result).toBe('2:30 PM');
		});
	});

	describe('short option', () => {
		it('should use numeric date parts and 24-hour time for dateTime', () => {
			const result = parseDate(TEST_DATE, { short: true });
			expect(result).not.toContain('Sunday');
			expect(result).toContain('6/15/2025');
			expect(result).toContain('14:30');
		});

		it('should use numeric date parts for date format', () => {
			const result = parseDate(TEST_DATE, {
				format: 'date',
				short: true,
			});
			expect(result).toBe('6/15/2025');
		});

		it('should use 24-hour time for time format', () => {
			const result = parseDate(TEST_DATE, {
				format: 'time',
				short: true,
			});
			expect(result).toBe('14:30');
		});
	});

	describe('includeTimeZone option', () => {
		it('should append the time zone abbreviation', () => {
			const result = parseDate(TEST_DATE, { includeTimeZone: true });
			expect(result).toContain('UTC');
		});

		it('should show the correct abbreviation for a named timezone', () => {
			const result = parseDate(TEST_DATE, {
				timezone: 'America/New_York',
				includeTimeZone: true,
			});
			expect(result).toMatch(/EDT|EST/);
		});
	});

	describe('combined options', () => {
		it('should apply compact and includeTimeZone together', () => {
			const result = parseDate(TEST_DATE, {
				compact: true,
				includeTimeZone: true,
			});
			expect(result).not.toContain('Sunday');
			expect(result).toContain('Jun');
			expect(result).toContain('UTC');
		});

		it('should apply short and includeTimeZone together', () => {
			const result = parseDate(TEST_DATE, {
				short: true,
				includeTimeZone: true,
			});
			expect(result).toContain('14:30');
			expect(result).toContain('UTC');
		});

		it('should apply short with a custom timezone', () => {
			const result = parseDate(TEST_DATE, {
				short: true,
				timezone: 'America/New_York',
			});
			expect(result).toContain('10:30');
		});

		it('should let short override compact when both are set', () => {
			const result = parseDate(TEST_DATE, { compact: true, short: true });
			expect(result).not.toContain('Sunday');
			expect(result).toContain('14:30');
		});
	});

	describe('whitespace normalization', () => {
		it('should replace non-breaking spaces with regular spaces', () => {
			const result = parseDate(TEST_DATE);
			expect(result).not.toMatch(/\u00a0/);
			expect(result).not.toMatch(/\u202f/);
		});
	});
});
