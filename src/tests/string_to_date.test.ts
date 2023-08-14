import { test, expect, describe } from 'vitest';
import stringToDate from '../string_to_date';

describe('stringToDate', () => {
	test('should return undefined if empty string', () => {
		expect(stringToDate('time', '')).toBe(undefined);
	});
	test('should return undefined if invalid time', () => {
		expect(stringToDate('time', '11:35')).toBe('1899-12-30T11:35:00.000Z');
	});
	test('should return undefined if invalid date', () => {
		expect(stringToDate('date', '1977-04-29')).toBe(undefined);
	});
	test('should return undefined if invalid datetime-local', () => {
		expect(stringToDate('datetime-local', '1977-03-29T06:00:00')).toBe(
			Date.parse('1977-03-29T06:00:00')
		);
	});
});
