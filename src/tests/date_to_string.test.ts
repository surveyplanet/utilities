import { type ISODate, ensureISODate } from '@surveyplanet/types';
import { test, expect, describe } from 'vitest';
import dateToString from '../date_to_string';

describe('dateToString', () => {
	test('should return correct time, date or date-time string', () => {
		expect(
			dateToString('datetime-local', ['2000-04-27T13:02:00.000Z'])
		).toBe('2000-04-27T13:02:00');
		expect(dateToString('time', ['1977-04-12T11:21Z'])).toBe('11:21:00');
		expect(dateToString('date', ['1977-04-12T11:21Z'])).toBe('1977-04-12');

		// expect(dateToString('datetime-local', '')).toBe('');
		// expect(dateToString('time', '')).toBe('');
		// expect(dateToString('date', '')).toBe('');
	});
});
