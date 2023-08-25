import { test, expect, describe } from 'vitest';
import stringToDate from '../string_to_date';

describe('stringToDate', () => {
	test.only('should return undefined if empty string', () => {
		expect(stringToDate('time', '')).toBe(undefined);
	});
	test.only('should return undefined if invalid time', () => {
		expect(stringToDate('time', '11:35')?.toISOString()).toBe(
			'1970-01-01T11:35:00.000Z'
		);
	});
	test.only('should return undefined if invalid date', () => {
		expect(stringToDate('date', '1977-04-29')?.toISOString()).toBe(
			'1977-04-29T00:00:00.000Z'
		);
	});
	test('should return undefined if invalid datetime-local', () => {
		expect(
			stringToDate('datetime-local', '1977-03-29T06:00:00')?.toISOString()
		).toBe('1977-03-29T06:00:00.000Z');
	});
});
