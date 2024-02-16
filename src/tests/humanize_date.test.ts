import { ensureISODate, type ISODate } from '@surveyplanet/types';
import { test, expect, describe } from 'vitest';
import { humanizeDate } from '../index';

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
		expect(humanizeDate(date, 'ar-EG')).toBe('١٥ فبراير ٢٠٢٤'); // cspell: disable-line
	});
	test('should return date string from in long format', () => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			month: 'long',
		};
		expect(humanizeDate(date, 'en-GB', options)).toBe(
			'Thursday, 15 February 2024'
		);
	});
	test('should return date string from in short format', () => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		};
		expect(humanizeDate(date, 'en-US', options)).toBe('02/15/2024');
	});
});
