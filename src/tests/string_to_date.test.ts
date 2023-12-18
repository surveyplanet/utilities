import { test, expect, describe } from 'vitest';
import stringToDate from '../string_to_date';

describe('stringToDate', () => {
	test('should return undefined if empty string', () => {
		expect(stringToDate('time', '')).toBe(undefined);
	});
	test('should return undefined if invalid time', () => {
		expect(stringToDate('time', '11:35')?.toISOString()).toBe(
			'1899-12-31T11:35:00.000Z'
		);
	});
	test('should return undefined if invalid date', () => {
		expect(stringToDate('date', '1977-04-29')?.toISOString()).toBe(
			'1977-04-29T00:00:00.000Z'
		);
	});
	test('should return undefined if invalid datetime-local', () => {
		expect(
			stringToDate('datetime-local', '2023-06-29T06:00:00')?.toISOString()
		).toBe('2023-06-29T06:00:00.000Z');
	});
	test('should return correct date for leap year', () => {
		expect(stringToDate('date', '2020-02-29')?.toISOString()).toBe(
			'2020-02-29T00:00:00.000Z'
		);
	});
});
