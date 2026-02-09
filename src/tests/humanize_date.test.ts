import { type ISODate } from '@surveyplanet/types';
import { test, expect, describe } from 'vitest';
import { humanizeDate } from '../index.js';

describe('humanizeDate', () => {
	const date = new Date(2024, 1, 15);

	test('should return date string with default settings', () => {
		expect(humanizeDate(date)).toBe('Feb 15, 2024');
	});

	test('should return date string from ISO date string', () => {
		expect(humanizeDate(date.toISOString() as ISODate)).toBe(
			'Feb 15, 2024'
		);
	});
	test('should return date string in arabic', () => {
		expect(humanizeDate(date, {}, 'ar-EG')).toBe('١٥‏/٢‏/٢٠٢٤'); // cspell: disable-line
	});

	test.skip('should return date string in long format (This should be fine in browser)', () => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			month: 'long',
		};
		expect(humanizeDate(date, options, 'en-GB')).toBe(
			'Thursday, 15 February 2024'
		);
	});
	test('should return date string from in short format', () => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		};
		expect(humanizeDate(date, options, 'en-US')).toBe('02/15/2024');
	});

	test('should return date string with time only', () => {
		expect(humanizeDate(date, { timeOnly: true }, 'en-US')).toBe(
			'12:00 AM'
		);
	});
	test('should return date string with full time', () => {
		expect(humanizeDate(date, { full: true }, 'en-US')).toBe(
			'Feb 15, 2024, 12:00 AM'
		);
	});
});
