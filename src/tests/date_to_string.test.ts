import { test, expect, describe } from 'vitest';
import { dateToString } from '../index';

describe('dateToString', () => {
	test('should return undefined when invalid date', () => {
		expect(dateToString('datetime-local', [''])).toBe(undefined);
		expect(dateToString('time', [''])).toBe(undefined);
		expect(dateToString('date', [''])).toBe(undefined);
	});
	test('should return correct date-time', () => {
		expect(
			dateToString('datetime-local', ['2000-04-27T13:02:00.000Z'])
		).toBe('2000-04-27T13:02:00');
	});
	test('should return correct date', () => {
		expect(dateToString('date', ['2000-04-27T13:02:00.000Z'])).toBe(
			'2000-04-27'
		);
	});
	test('should return correct time', () => {
		expect(dateToString('time', ['2000-04-27T13:02:00.000Z'])).toBe(
			'13:02:00'
		);
	});
});
