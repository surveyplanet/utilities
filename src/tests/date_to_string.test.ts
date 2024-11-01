import { test, expect, describe } from 'vitest';
import { dateToString } from '../index';

describe('dateToString', () => {
	const year = 2024;
	const month = 3;
	const day = 27;
	const hours = 13;
	const minutes = 30;
	const seconds = 1;
	const milliseconds = 0;
	const date = new Date(
		year,
		month,
		day,
		hours,
		minutes,
		seconds,
		milliseconds
	);

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
		const result = `${year}-${(month + 1).toFixed(0).padStart(2, '0')}-${day
			.toFixed(0)
			.padStart(2, '0')}T${hours.toFixed(0).padStart(2, '0')}:${minutes
			.toFixed(0)
			.padStart(2, '0')}`;
		expect(dateToString(date)).toBe(result);
		expect(dateToString(date.toISOString(), 'datetime-local')).toBe(result);
	});

	test('should return correct date', () => {
		const result = `${year}-${(month + 1).toFixed(0).padStart(2, '0')}-${day
			.toFixed(0)
			.padStart(2, '0')}`;
		expect(dateToString(date, 'date')).toBe(result);
		expect(dateToString(date.toISOString(), 'date')).toBe(result);
	});

	test('should return correct time', () => {
		const result = `${hours.toFixed(0).padStart(2, '0')}:${minutes
			.toFixed(0)
			.padStart(2, '0')}`;

		expect(dateToString(date, 'time')).toBe(result);
		expect(dateToString(date.toISOString(), 'time')).toBe(result);
	});
});
