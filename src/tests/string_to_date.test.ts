import { test, expect, describe } from 'vitest';
import stringToDate from '../string_to_date';

describe('stringToDate', () => {
	test('should return undefined if empty string', () => {
		expect(stringToDate('time', '')).toBe(undefined);
	});

	test('should return undefined if invalid time', () => {
		expect(stringToDate('time', '')?.toISOString()).toBe(undefined);
	});

	test('should return undefined if invalid date', () => {
		expect(stringToDate('date', '')?.toISOString()).toBe(undefined);
	});

	test('should return time', () => {
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
			stringToDate('datetime-local', '1977-03-29T06:00:00')?.toISOString()
		).toBe('1977-03-29T06:00:00.000Z');
	});
});

describe('stringToDate', () => {
	test.only('should return date for every new date', () => {
		const maxDate = new Date();
		const minDate = new Date();

		minDate.setHours(minDate.getHours() - 24);

		console.log(maxDate, minDate);

		for (let ms = minDate.getTime(); ms < maxDate.getTime(); ms += 60000) {
			const date = new Date(ms);
			const year = date.getFullYear();
			const month = date.getMonth();
			const day = date.getDate();
			const hour = date.getHours();
			const minute = date.getMinutes();
			const second = date.getSeconds();
			const milliseconds = date.getMilliseconds();
			const formatted = `${year}-${
				month + 1
			}-${day}T${hour}:${minute}:${second}.${milliseconds}Z`;
			console.log('formatted', formatted);

			const res = stringToDate(
				'datetime-local',
				formatted
			)?.toISOString();
			console.log('res', res);
			console.log('date', date.toISOString());

			expect(date.toISOString()).toBe(res);
		}
	});
});
