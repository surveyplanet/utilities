// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { test, expect, describe } from 'vitest';
import { stringToDate } from '../index';

describe('stringToDate', () => {
	function toISOFormat(localeString: string): string {
		const date = new Date(localeString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
	}

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
		expect(
			toISOFormat(stringToDate('11:35', 'time')!.toLocaleString())
		).toBe('1899-12-31T11:35:00.000');
	});
	test('should return undefined if invalid date', () => {
		expect(
			toISOFormat(stringToDate('1977-04-29', 'date')!.toLocaleString())
		).toBe('1977-04-29T00:00:00.000');
	});
	test('should return undefined if invalid datetime-local', () => {
		expect(
			toISOFormat(
				stringToDate(
					'2023-06-29T06:00:00',
					'datetime-local'
				)!.toLocaleString()
			)
		).toBe('2023-06-29T06:00:00.000');
	});
	test('should return correct date for leap year', () => {
		expect(
			toISOFormat(stringToDate('2020-02-29', 'date')?.toLocaleString())
		).toBe('2020-02-29T00:00:00.000');
	});
});
