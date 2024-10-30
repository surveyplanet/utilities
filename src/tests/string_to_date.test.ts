import { test, expect, describe } from 'vitest';
import { stringToDate } from '../index';

describe('stringToDate', () => {
	test('should return undefined when time is invalid', () => {
		expect(stringToDate('', 'time')).not.toBeDefined();
		expect(stringToDate('noop', 'time')).not.toBeDefined();
		expect(
			stringToDate(123 as unknown as string, 'time')
		).not.toBeDefined();
		expect(stringToDate([123] as unknown as string, 'time')).toBe(
			undefined
		);
		expect(stringToDate(123456789 as unknown as string, 'time')).toBe(
			undefined
		);
		expect(
			stringToDate(true as unknown as string, 'time')
		).not.toBeDefined();
		expect(
			stringToDate(null as unknown as string, 'time')
		).not.toBeDefined();
		expect(stringToDate('24:00', 'time')).not.toBeDefined();
		expect(stringToDate('12:60', 'time')).not.toBeDefined();
	});

	test('should return undefined when date is invalid', () => {
		expect(stringToDate('', 'date')).not.toBeDefined();
		expect(stringToDate('noop', 'date')).not.toBeDefined();
		expect(
			stringToDate(123 as unknown as string, 'date')
		).not.toBeDefined();
		expect(stringToDate([123] as unknown as string, 'date')).toBe(
			undefined
		);

		expect(stringToDate(123456789 as unknown as string, 'date')).toBe(
			undefined
		);
		expect(
			stringToDate(true as unknown as string, 'date')
		).not.toBeDefined();
		expect(
			stringToDate(null as unknown as string, 'date')
		).not.toBeDefined();
		expect(stringToDate('2022-13-01', 'date')).not.toBeDefined();
		expect(stringToDate('2022-01-32', 'date')).not.toBeDefined();
	});

	test('should return undefined when datetime is invalid', () => {
		expect(stringToDate('', 'datetime-local')).not.toBeDefined();
		expect(stringToDate('noop', 'datetime-local')).not.toBeDefined();
		expect(stringToDate(123 as unknown as string, 'datetime-local')).toBe(
			undefined
		);
		expect(stringToDate([123] as unknown as string, 'datetime-local')).toBe(
			undefined
		);

		expect(
			stringToDate(123456789 as unknown as string, 'datetime-local')
		).not.toBeDefined();
		expect(stringToDate(true as unknown as string, 'datetime-local')).toBe(
			undefined
		);

		expect(stringToDate(null as unknown as string, 'datetime-local')).toBe(
			undefined
		);
		expect(stringToDate('2022-13-01', 'datetime-local')).not.toBeDefined();
		expect(stringToDate('2022-01-32', 'datetime-local')).not.toBeDefined();
		expect(stringToDate('2022-01-01T25:00:00', 'datetime-local')).toBe(
			undefined
		);
		expect(stringToDate('2022-01-01T12:63:00', 'datetime-local')).toBe(
			undefined
		);
	});

	test('should return undefined if invalid time', () => {
		expect(stringToDate('11:35', 'time')?.toISOString()).toBe(
			'1899-12-31T11:35:00.000Z'
		);
	});
	test('should return undefined if invalid date', () => {
		expect(stringToDate('1977-04-29', 'date')?.toISOString()).toBe(
			'1977-04-29T00:00:00.000Z'
		);
	});
	test('should return undefined if invalid datetime-local', () => {
		expect(
			stringToDate('2023-06-29T06:00:00', 'datetime-local')?.toISOString()
		).toBe('2023-06-29T06:00:00.000Z');
	});
	test('should return correct date for leap year', () => {
		expect(stringToDate('2020-02-29', 'date')?.toISOString()).toBe(
			'2020-02-29T00:00:00.000Z'
		);
	});
});
