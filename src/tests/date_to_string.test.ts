import { test, expect, describe } from 'vitest';
import { dateToString } from '../index';

describe('dateToString', () => {
	const date = new Date(2000, 3, 27, 13, 30, 1, 0);

	test('should return undefined when date is invalid', () => {
		expect(dateToString('', 'datetime-local')).toBe(undefined);
		expect(dateToString('noop', 'datetime-local')).toBe(undefined);
		expect(dateToString(123 as unknown as string, 'datetime-local')).toBe(
			undefined
		);
		expect(dateToString([123] as unknown as string, 'datetime-local')).toBe(
			undefined
		);

		expect(dateToString(123456789 as unknown as string, 'date')).toBe(
			undefined
		);
		expect(dateToString(true as unknown as string, 'date')).toBe(undefined);
		expect(
			dateToString({ date: '2022-01-01' } as unknown as string, 'date')
		).toBe(undefined);
		expect(dateToString(null as unknown as string, 'date')).toBe(undefined);
		expect(dateToString('2022-13-01', 'date')).toBe(undefined);
		expect(dateToString('2022-01-32', 'date')).toBe(undefined);
		expect(dateToString('2022-01-01T25:00:00', 'date')).toBe(undefined);
		expect(dateToString('2022-01-01T00:00:00+25:00', 'date')).toBe(
			undefined
		);
		expect(dateToString('2022-01-01T00:00:00.000Z+00:00', 'date')).toBe(
			undefined
		);
		// expect(dateToString('01/01/2022', 'date')).toBe(undefined);
		// expect(dateToString('99999-01-01', 'date')).toBe(undefined);
		// expect(dateToString('2022-01', 'date')).toBe(undefined);
	});

	test('should return correct date-time', () => {
		const res = '2000-04-27T13:30:01';
		expect(dateToString(date, 'datetime-local')).toBe(res);
		expect(dateToString(date)).toBe(res);
		expect(dateToString(date.toISOString(), 'datetime-local')).toBe(res);
	});

	test('should return correct date', () => {
		const res = '2000-04-27';
		expect(dateToString(date, 'date')).toBe(res);
		expect(dateToString(date.toISOString(), 'date')).toBe(res);
	});

	test('should return correct time', () => {
		const res = '13:30:01';
		expect(dateToString(date, 'time')).toBe(res);
		expect(dateToString(date.toISOString(), 'time')).toBe(res);
	});
});
