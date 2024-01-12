import { describe, expect, it } from 'vitest';
import { isDate } from '../index';

describe('isDate', () => {
	it('should confirm value is a date', () => {
		const value = new Date();
		const result = isDate(value);
		expect(result).toBeTruthy();
	});

	it('should confirm value is not a date', () => {
		let result = isDate(1);
		expect(result).toBeFalsy();

		result = isDate('noop');
		expect(result).toBeFalsy();

		result = isDate(new Date().toISOString());
		expect(result).toBeFalsy();

		result = isDate([1, 2, 3]);
		expect(result).toBeFalsy();

		result = isDate(null);
		expect(result).toBeFalsy();

		result = isDate(undefined);
		expect(result).toBeFalsy();
	});
});
